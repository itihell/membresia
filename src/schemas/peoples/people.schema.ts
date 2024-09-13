import { literal, z } from "zod";

export const PeopleSchema = z.object({
  nombres: z
    .string({ message: "Debe escribir el nombre de la persona" })
    .min(3)
    .max(60),
  apellidos: z
    .string({ message: "Debe escribir los apellidos de la persona" })
    .min(3)
    .max(60),
  cedula: z
    .string({ message: "Debe escribir el número de documento de la persona" })
    .min(8)
    .max(20)
    .nullable()
    .optional()
    .transform((v) => v ?? "")
    .or(literal("")),
  fecha_nacimiento: z.date().nullable().optional(),
  fecha_fe: z
    .date({ message: "Debe seleccionar fecha de su FE" })
    .nullable()
    .optional(),
  fecha_bautizo: z
    .date({ message: "Debe seleccionar fecha de su Bautismo" })
    .nullable()
    .optional(),
  sexo_id: z.number({ message: "Debe seleccionar un sexo" }),
  estado_civil_id: z.number({ message: "Debe seleccionar el estado civil" }),
  barrio_id: z.number({ message: "Debe seleccionar el barrio" }),
  direccion: z
    .string({ message: "Debe escribir la dirección de la persona" })
    .min(3)
    .max(250),
  telefono: z
    .string({ message: "Debe escribir el número de teléfono" })
    .max(10, { message: "El maximo de caracteres es de 10" })
    .nullable()
    .optional()
    .or(z.literal(""))
    .transform((v) => v ?? ""),
  email: z
    .string({ message: "Debe escribir el correo electrónico" })
    .email({ message: "Dirección de correo electrónico no válida" })
    .nullable()
    .optional()
    .or(z.literal(""))
    .transform((v) => v ?? ""),
});
