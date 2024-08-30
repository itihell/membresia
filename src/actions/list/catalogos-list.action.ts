"use server";
import prisma from "@/lib/prisma";
import { Barrio, EstadoCivil, Sexos } from "@/interfaces";

export const getListSexos = async (): Promise<Sexos[]> => {
  try {
    const items = await prisma.sexo.findMany();
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
