"use server";

import prisma from "@/lib/prisma";

import { Membresia } from "@/interfaces";
import { auth } from "@/auth.config";

export const getMembresiaById = async (id: string): Promise<Membresia> => {
  try {
    const membresia = await prisma.membresia.findUnique({
      where: {
        id: id,
      },
      include: {
        persona: true,
        tipoMembresia: true,
        iglesia: true,
        user: true,
      },
    });

    return membresia as Membresia;
  } catch (error) {
    throw new Error("No se pudo cargar la membresia");
  }
};

export const getMembresias = async (): Promise<Membresia[]> => {
  try {
    const membresias = await prisma.membresia.findMany({
      include: {
        persona: true,
        tipoMembresia: true,
        iglesia: true,
        user: true,
      },
      orderBy: {
        created_at: "desc",
      },
    });

    return membresias as Membresia[];
  } catch (error) {
    throw new Error("No se pudo cargar las membresias");
  }
};

export const createMembresia = async (data: Membresia): Promise<Membresia> => {
  try {
    const session = await auth();

    const membresia = await prisma.membresia.create({
      data: {
        persona_id: data.persona_id,
        fecha: data.fecha,
        tipo_id: data.tipo_id,
        activo: data.activo,
        user_id: session?.user?.id as string,
        iglesia_id: session?.user?.iglesia_id as string,
      },
    });

    return membresia;
  } catch (error) {
    console.error({ error });

    throw new Error("No se pudo crear la membresia");
  }
};

export const updateMembresia = async (
  id: string,
  data: Membresia
): Promise<Membresia> => {
  try {
    const session = await auth();

    const membresia = await prisma.membresia.update({
      where: {
        id: id,
      },
      data: {
        persona_id: data.persona_id,
        fecha: data.fecha,
        tipo_id: data.tipo_id,
        activo: data.activo,
        user_id: session?.user?.id as string,
        iglesia_id: session?.user?.iglesia_id as string,
      },
    });

    return membresia;
  } catch (error) {
    console.error({ error });

    throw new Error("No se pudo crear la membresia");
  }
};
