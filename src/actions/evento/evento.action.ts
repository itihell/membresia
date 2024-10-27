"use server";
import { auth } from "@/auth.config";
import { Evento, EventoHasAsistencia } from "@/interfaces";
import prisma from "@/lib/prisma";

export const createEvent = async (payload: Evento) => {
  try {
    return await prisma.$transaction(async (prisma) => {
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

      const asistencia = miembros.map((miembro) => {
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
