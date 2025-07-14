"use server";

import prisma from "@/lib/prisma";

import { People } from "@/interfaces";
import { auth } from "@/auth.config";
import { PeopleType } from "@/schemas";

export const getPeopleId = async (id: string): Promise<People> => {
  try {
    const people = await prisma.persona.findUnique({
      where: {
        id: id,
      },
      include: {
        membresia: {
          include: {
            iglesia: true,
            tipoMembresia: true,
          },
        },
        sexo: true,
        estadoCivil: true,
        barrio: {
          include: {
            zonaGeografica: true,
            municipio: {
              include: {
                departamento: {
                  include: {
                    pais: true,
                  },
                },
              },
            },
          },
        },
        familia: {
          include: {
            persona: true,
          },
        },
      },
    });

    return people as People;
  } catch (error) {
    console.error({ error });

    throw new Error("No se pudo cargar la persona");
  }
};

export const updatePeople = async (id: string, data: PeopleType) => {
  try {
    const session = await auth();
    const people = await prisma.persona.update({
      where: {
        id: id,
      },
      data: {
        nombres: data.nombres,
        apellidos: data.apellidos,
        cedula: data.cedula,
        telefono: data.telefono,
        direccion: data.direccion,
        email: data.email,
        sexo_id: data.sexo_id,
        estado_civil_id: data.estado_civil_id,
        fecha_bautizo: data.fecha_bautizo,
        fecha_fe: data.fecha_fe,
        fecha_nacimiento: data.fecha_nacimiento,
        barrio_id: data.barrio_id,
        editor_id: session?.user?.id as string,
        iglesia_id: session?.user?.iglesia_id as string,
      },
    });

    return people;
  } catch (error) {
    console.error({ error });
    throw new Error("No se pudo guardar la persona");
  }
};

export const savePeople = async (data: PeopleType) => {
  try {
    const session = await auth();
    const people = await prisma.persona.create({
      data: {
        nombres: data.nombres,
        apellidos: data.apellidos,
        cedula: data.cedula,
        telefono: data.telefono,
        direccion: data.direccion,
        email: data.email,
        sexo_id: data.sexo_id,
        estado_civil_id: data.estado_civil_id,
        fecha_bautizo: data.fecha_bautizo,
        fecha_fe: data.fecha_fe,
        fecha_nacimiento: data.fecha_nacimiento,
        barrio_id: data.barrio_id,
        user_id: session?.user?.id as string,
        iglesia_id: session?.user?.iglesia_id as string,
      },
    });

    return people;
  } catch (error) {
    console.error({ error });
    throw new Error("No se pudo guardar la persona");
  }
};

export const getPaginatedPeoples = async ({ page = 1, take = 100 }) => {
  try {
    if (isNaN(Number(page))) {
      page = 1;
    }
    if (page < 1) {
      page = 1;
    }

    const peoples = await prisma.persona.findMany({
      take: take,
      skip: (page - 1) * take,
      include: {
        membresia: true,
        sexo: true,
        estadoCivil: true,
      },
      orderBy: {
        apellidos: "asc",
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
    console.error({ error });
    throw new Error("No se pudo cargar el listado de personas");
  }
};
