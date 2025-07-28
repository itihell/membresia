"use server";
import { auth } from "@/auth.config";
import type { Evento, ListaEventos } from "@/interfaces";
import prisma from "@/lib/prisma";

export const getEventos = async (): Promise<ListaEventos[]> => {
  try {
    const session = await auth();
    const eventos = (await prisma.$queryRaw`
      select eventos.id, eventos.title,eventos."date",
      sum( case when eventos_has_asistencias.asistio=true then 1 else 0 end) as asistencia
      from eventos
      left join eventos_has_asistencias
      on eventos_has_asistencias.evento_id = eventos.id
      inner join tipos_eventos
      on tipos_eventos.id = eventos.tipo_evento_id
      inner join personas
      on personas.id = eventos_has_asistencias.people_id
      inner join sexos
      on sexos.id = personas.sexo_id 
      where eventos.iglesia_id = ${session?.user?.iglesia_id}
      GROUP by eventos.id, eventos."date", eventos.title
    `) as ListaEventos[];

    return eventos;
  } catch (error) {
    console.error(error);
    throw new Error("No se pudo obtener los eventos");
  }
};

export const createEvent = async (payload: Evento) => {
  try {
    return await prisma.$transaction(async prisma => {
      const session = await auth();
      const evento = await prisma.evento.create({
        data: {
          title: payload.title,
          description: payload.description,
          tipo_evento_id: payload.tipo_evento_id,
          date: payload.date,
          iglesia_id: session?.user?.iglesia_id as string,
          user_id: session?.user?.id as string,
          user_edit_id: session?.user?.id as string,
        },
      });

      const miembros = await prisma.membresia.findMany({
        where: {
          iglesia_id: session?.user?.iglesia_id as string,
          activo: true,
        },
      });

      const asistencia = miembros.map(miembro => {
        const asistencia = {
          evento_id: evento.id,
          people_id: miembro.persona_id,
          asistio: false,
        };
        return asistencia;
      });

      await prisma.eventoHasAsistencia.createMany({
        data: asistencia,
        skipDuplicates: true,
      });

      return evento;
    });
  } catch (error) {
    console.error(error);
    throw new Error("No se pudo guardar el evento");
  }
};

export const getEventosByIdWhithAsistencia = async (
  id: string
): Promise<Evento> => {
  const evento = await prisma.evento.findUnique({
    where: {
      id: id,
    },
    include: {
      eventos_has_asistencia: {
        include: {
          persona: true,
        },
        orderBy: {
          persona: {
            nombres: "asc",
          },
        },
      },
    },
  });
  return evento as Evento;
};

export const updateAsistencia = async (id: string, status: boolean) => {
  try {
    return await prisma.eventoHasAsistencia.update({
      where: {
        id: id,
      },
      data: {
        asistio: !status,
      },
    });
  } catch (error) {
    console.error(error);
    throw new Error("No se pudo actualizar la asistencia");
  }
};
