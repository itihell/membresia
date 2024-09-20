"use server";
import { auth } from "@/auth.config";
import { ErrorApp, Familia } from "@/interfaces";
import prisma from "@/lib/prisma";

export const getFamilias = async (): Promise<Familia[]> => {
  try {
    const familias = await prisma.familia.findMany({
      include: {
        miembros: {
          include: {
            persona: true,
          },
        },
        user: true,
        editor: true,
        iglesia: true,
      },
    });

    return familias as Familia[];
  } catch (e: ErrorApp | any) {
    throw new Error(e.message);
  }
};

export const getFamiliaById = async (id: string): Promise<Familia> => {
  try {
    const familia = await prisma.familia.findFirst({
      where: {
        id: id,
      },
      include: {
        user: true,
        editor: true,
        iglesia: true,
        miembros: {
          include: {
            persona: true,
            parentesco: true,
          },
        },
      },
    });
    return familia as Familia;
  } catch (e: ErrorApp | any) {
    throw new Error(e.message);
  }
};

export const createFamilia = async (data: Familia): Promise<Familia> => {
  try {
    const session = await auth();
    const familia = await prisma.familia.create({
      data: {
        name: data.name,
        user_id: session?.user?.id as string,
        user_edit_id: session?.user?.id as string,
        iglesia_id: session?.user?.iglesia_id as string,
      },
    });

    return familia as Familia;
  } catch (e: ErrorApp | any) {
    throw new Error(e.message);
  }
};

export const updateFamilia = async (
  id: string,
  data: Familia
): Promise<Familia> => {
  try {
    const session = await auth();
    const familia = await prisma.familia.update({
      where: { id: id },
      data: {
        name: data.name,
        user_edit_id: session?.user?.id as string,
      },
    });

    return familia as Familia;
  } catch (e: ErrorApp | any) {
    throw new Error(e.message);
  }
};
