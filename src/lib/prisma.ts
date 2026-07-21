import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = () => {
  return new PrismaClient();
};

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>;

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientSingleton | undefined;
};

// 1. Exportamos el cliente base.
// Usarás este cliente para tablas globales (Municipio, Auth, Roles, etc.)
export const prisma = globalForPrisma.prisma ?? prismaClientSingleton();

// Para no romper tu código actual, mantenemos el export default,
// aunque te recomiendo ir migrando a usar la exportación nombrada arriba.
export default prisma;

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

// --- 2. LÓGICA MULTITENANT ---

// Define aquí las tablas que tienen la columna "iglesia_id" y deben ser filtradas
const TENANT_MODELS = [
  "Baja",
  "Evento",
  "Familia",
  "Membresia",
  "Persona",
  "User",
  // 'TransaccionContable', // Agrega las que vayas creando
  // 'Ministerio'
];

export function getTenantPrisma(iglesia_id: string) {
  return prisma.$extends({
    query: {
      $allModels: {
        async $allOperations({ model, operation, args, query }) {
          // Si el modelo no es multitenant, se ejecuta normal
          if (!TENANT_MODELS.includes(model)) {
            return query(args);
          }

          // 1. Resolvemos el error de TypeScript casteando a 'any'.
          // Ya validamos qué operación es con los 'if', así que es seguro.
          const a = args as any;

          // 2. Operaciones de lectura y escritura masiva (estas soportan filtros dinámicos)
          if (
            [
              "findFirst",
              "findMany",
              "count",
              "updateMany",
              "deleteMany",
            ].includes(operation)
          ) {
            a.where = { ...a.where, iglesia_id };
            return query(a);
          }

          // 3. Operaciones por ID único (findUnique, update, delete)
          if (["findUnique", "update", "delete"].includes(operation)) {
            // Prisma no permite inyectar campos no-únicos en estas operaciones.
            // Solución: Buscamos primero si el registro existe y pertenece a esta iglesia.
            const record = await (prisma as any)[model].findFirst({
              where: { ...a.where, iglesia_id },
            });

            if (!record) {
              throw new Error(
                `Acceso denegado o registro no encontrado en ${model}`
              );
            }

            // Si el registro sí pertenece a la iglesia, ejecutamos la consulta original intacta.
            return query(args);
          }

          // 4. Operaciones de creación
          if (operation === "create") {
            a.data = { ...a.data, iglesia_id };
            return query(a);
          }

          if (operation === "createMany") {
            if (Array.isArray(a.data)) {
              a.data = a.data.map((d: any) => ({ ...d, iglesia_id }));
            } else {
              a.data = { ...a.data, iglesia_id };
            }
            return query(a);
          }

          // Fallback
          return query(args);
        },
      },
    },
  });
}
