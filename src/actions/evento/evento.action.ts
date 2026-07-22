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

export const getEventosConAsistencia = async () => {
  try {
    const session = await auth();
    if (!session?.user?.iglesia_id) throw new Error("Sin sesión activa");

    const eventos = await prisma.evento.findMany({
      where: {
        iglesia_id: session.user.iglesia_id,
      },
      include: {
        tipos_evento: true,
        eventos_has_asistencia: {
          select: {
            id: true,
            asistio: true,
            people_id: true,
          },
        },
      },
      orderBy: {
        date: "desc",
      },
    });

    // Calcular total de miembros activos de la iglesia para el porcentaje
    const totalMiembros = await prisma.membresia.count({
      where: {
        iglesia_id: session.user.iglesia_id,
        activo: true,
      },
    });

    return eventos.map(evento => {
      const totalEnEvento = evento.eventos_has_asistencia.length;
      const asistieron = evento.eventos_has_asistencia.filter(
        a => a.asistio
      ).length;
      return {
        ...evento,
        totalMiembros,
        totalEnEvento,
        asistieron,
        porcentaje:
          totalEnEvento > 0
            ? Math.round((asistieron / totalEnEvento) * 100)
            : 0,
      };
    });
  } catch (error) {
    console.error(error);
    throw new Error("No se pudo obtener los eventos con asistencia");
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

export const addPersonaToEvento = async (
  eventoId: string,
  personaId: string,
  visitante: boolean = false
) => {
  try {
    // Verificar si ya existe
    const existing = await prisma.eventoHasAsistencia.findFirst({
      where: {
        evento_id: eventoId,
        people_id: personaId,
      },
    });

    if (existing) return existing;

    return await prisma.eventoHasAsistencia.create({
      data: {
        evento_id: eventoId,
        people_id: personaId,
        asistio: true, // Si la agregan manualmente, se asume que asistió
        visitante: visitante,
      },
    });
  } catch (error) {
    console.error(error);
    throw new Error("No se pudo agregar la persona al evento");
  }
};

export const updateEvent = async (id: string, payload: Evento) => {
  try {
    const session = await auth();
    const evento = await prisma.evento.update({
      where: { id },
      data: {
        title: payload.title,
        description: payload.description,
        tipo_evento_id: payload.tipo_evento_id,
        date: payload.date,
        user_edit_id: session?.user?.id as string,
      },
    });
    return evento;
  } catch (error) {
    console.error(error);
    throw new Error("No se pudo actualizar el evento");
  }
};

export const deleteEvent = async (id: string) => {
  try {
    return await prisma.$transaction(async prisma => {
      // Eliminar asistencia asociada
      await prisma.eventoHasAsistencia.deleteMany({
        where: { evento_id: id },
      });
      // Eliminar el evento
      return await prisma.evento.delete({
        where: { id },
      });
    });
  } catch (error) {
    console.error(error);
    throw new Error("No se pudo eliminar el evento");
  }
};

export const searchPersonasVisitantes = async (
  eventoId: string,
  query: string
) => {
  try {
    const session = await auth();
    if (!session?.user?.iglesia_id) throw new Error("Sin sesión activa");

    // Buscar personas en la misma iglesia que coincidan con el término,
    // y que NO tengan un registro de asistencia para este evento
    const personas = await prisma.persona.findMany({
      where: {
        iglesia_id: session.user.iglesia_id,
        OR: [
          { nombres: { contains: query, mode: "insensitive" } },
          { apellidos: { contains: query, mode: "insensitive" } },
          { cedula: { contains: query, mode: "insensitive" } },
        ],
        NOT: {
          eventoHasAsistencia: {
            some: { evento_id: eventoId },
          },
        },
      },
      take: 10, // Límite de resultados
    });

    return personas;
  } catch (error) {
    console.error(error);
    throw new Error("No se pudieron buscar los visitantes");
  }
};
