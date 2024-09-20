"use server";
import prisma from "@/lib/prisma";
import {
  Barrio,
  EstadoCivil,
  Familia,
  Parentesco,
  People,
  Sexos,
  TipoMembresia,
} from "@/interfaces";

export const getListPersonas = async (
  search: string = ""
): Promise<People[]> => {
  try {
    const rows = (await prisma.$queryRaw`
      select *, concat(nombres, ' ', apellidos) as full_name
      from personas
      where translate(nombres,'áéíóúÁÉÍÓÚäëïöüÄËÏÖÜ','aeiouAEIOUaeiouAEIOU') ILIKE '%' || translate(${search}, 'áéíóúÁÉÍÓÚäëïöüÄËÏÖÜ','aeiouAEIOUaeiouAEIOU') || '%' 
      or translate(apellidos,'áéíóúÁÉÍÓÚäëïöüÄËÏÖÜ','aeiouAEIOUaeiouAEIOU') ILIKE '%' || translate(${search}, 'áéíóúÁÉÍÓÚäëïöüÄËÏÖÜ','aeiouAEIOUaeiouAEIOU') || '%' 
      or translate(telefono,'-','') ILIKE '%' || translate(${search}, '-','') || '%' 
      or cedula ILIKE '%' || ${search} || '%' limit 30`) as People[];

    return rows;
  } catch (error) {
    throw new Error("No se pueden cargar el listado de personas");
  }
};

export const getListFamilias = async (
  search: string = ""
): Promise<Familia[]> => {
  try {
    const rows = (await prisma.$queryRaw`
      select *
      from familias
      where translate(name,'áéíóúÁÉÍÓÚäëïöüÄËÏÖÜ','aeiouAEIOUaeiouAEIOU') ILIKE '%' || translate(${search}, 'áéíóúÁÉÍÓÚäëïöüÄËÏÖÜ','aeiouAEIOUaeiouAEIOU') || '%' 
      limit 30`) as Familia[];

    return rows;
  } catch (error) {
    throw new Error("No se pueden cargar el listado de familias");
  }
};

export const getListSexos = async (): Promise<Sexos[]> => {
  try {
    const items = await prisma.sexo.findMany();
    return items;
  } catch (error) {
    throw new Error("No se pueden cargar el listado de sexos");
  }
};

export const getListParentesco = async (): Promise<Parentesco[]> => {
  try {
    const items = await prisma.parentesco.findMany();

    return items;
  } catch (error) {
    throw new Error("No se pueden cargar el listado de parentesco");
  }
};

export const getListTipoMembresia = async (): Promise<TipoMembresia[]> => {
  try {
    const items = await prisma.tipoMembresia.findMany();
    return items;
  } catch (error) {
    throw new Error("No se pueden cargar el listado de sexos");
  }
};

export const getListEstadoCivil = async (): Promise<EstadoCivil[]> => {
  try {
    const items = await prisma.estadoCivil.findMany();
    return items;
  } catch (error) {
    throw new Error("no se pudo cargar el listado de estado civil");
  }
};

export const getListBarrios = async (): Promise<Barrio[]> => {
  try {
    const items = await prisma.barrio.findMany({
      include: {
        municipio: {
          include: {
            departamento: {
              include: {
                pais: true,
              },
            },
          },
        },
        zonaGeografica: true,
      },
    });
    return items;
  } catch (error) {
    throw new Error("no se pudo cargar el listado barrios");
  }
};
