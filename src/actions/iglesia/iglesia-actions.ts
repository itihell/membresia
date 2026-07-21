"use server";

import prisma from "@/lib/prisma";
import type { IglesiaType } from "@/schemas";
import { revalidatePath } from "next/cache";

export const getIglesias = async () => {
  try {
    const iglesias = await prisma.iglesia.findMany({
      orderBy: {
        name: "asc",
      },
    });
    return iglesias;
  } catch (error) {
    console.error({ error });
    throw new Error("No se pudo cargar el listado de iglesias");
  }
};

export const getIglesiaById = async (id: string) => {
  try {
    const iglesia = await prisma.iglesia.findUnique({
      where: {
        id,
      },
    });
    return iglesia;
  } catch (error) {
    console.error({ error });
    throw new Error("No se pudo cargar la iglesia");
  }
};

export const saveIglesia = async (data: IglesiaType) => {
  try {
    const iglesia = await prisma.iglesia.create({
      data: {
        name: data.name,
        email: data.email,
        direccion: data.direccion,
        telefonos: data.telefonos,
      },
    });

    revalidatePath("/iglesias");
    return iglesia;
  } catch (error) {
    console.error({ error });
    throw new Error("No se pudo guardar la iglesia");
  }
};

export const updateIglesia = async (id: string, data: IglesiaType) => {
  try {
    const iglesia = await prisma.iglesia.update({
      where: {
        id,
      },
      data: {
        name: data.name,
        email: data.email,
        direccion: data.direccion,
        telefonos: data.telefonos,
      },
    });

    revalidatePath("/iglesias");
    return iglesia;
  } catch (error) {
    console.error({ error });
    throw new Error("No se pudo actualizar la iglesia");
  }
};

export const deleteIglesia = async (id: string) => {
  try {
    await prisma.iglesia.delete({
      where: {
        id,
      },
    });

    revalidatePath("/iglesias");
    return true;
  } catch (error) {
    console.error({ error });
    throw new Error("No se pudo eliminar la iglesia");
  }
};
