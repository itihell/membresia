"use server";

import { auth } from "@/auth.config";
import { FamiliaHasPersona } from "@/interfaces";
import prisma from "@/lib/prisma";

export const createMiembroHasFamilia = async (
  payload: FamiliaHasPersona
): Promise<FamiliaHasPersona> => {
  const session = await auth();
  const miembro = await prisma.familiaHasPersona.create({
    data: {
      familia_id: payload.familia_id,
      persona_id: payload.persona_id,
      parentesco_id: payload.parentesco_id,
      user_id: session?.user?.id as string,
    },
  });

  return miembro;
};

export const deleteMiembroHasFamilia = async (id: string): Promise<any> => {
  const deleted = await prisma.familiaHasPersona.deleteMany({
    where: { id: id },
  });

  return deleted;
};
