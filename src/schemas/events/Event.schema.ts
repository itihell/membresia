import { TipoEvento } from "@prisma/client";
import { z } from "zod";

export const EventoSchema = z.object({
  id: z.string().optional(),
  title: z
    .string({ message: "El titulo es obligatorio" })
    .min(3, { message: "El titulo debe tener al menos 3 caracteres" }),
  description: z.string().optional(),
  date: z.date({ message: "La fecha es obligatorio" }),
  tipo_evento_id: z.number({ message: "El tipo de evento es obligatorio" }),
  tipos_evento: z.custom<TipoEvento>().optional(), // Use z.custom to type without validating the full structure
});
