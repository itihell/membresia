"use server";

import prisma from "@/lib/prisma";

export const getPaginatedPeoples = async ({ page = 1, take = 12 }) => {
  try {
    if (isNaN(Number(page))) page = 1;
    if (page < 1) page = 1;

    const peoples = await prisma.persona.findMany({
      take: take,
      skip: (page - 1) * take,
      include: {
        sexo: true,
        estadoCivil: true,
      },
    });

    const totalCount = await prisma.persona.count();
    const totalPages = Math.ceil(totalCount / take);

    return {
      currentPage: page,
      totalPages: totalPages,
      peoples: peoples,
    };
  } catch (error) {
    throw new Error("No se pudo cargar el listado de personas");
  }
};
