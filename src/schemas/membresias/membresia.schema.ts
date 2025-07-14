import { Persona, TipoMembresia } from "@prisma/client";
import { z } from "zod";

export const MembresiaSchema = z.object({
  persona_id: z.string({ message: "Debe seleccionar una persona" }),
  fecha: z.date({ message: "Debe seleccionar la fecha de la membresía" }),
  tipo_id: z.number({ message: "Debe seleccionar el tipo de membresia" }),
  activo: z.boolean(),
  tipoMembresia: z.custom<TipoMembresia>().optional(),
  persona: z.custom<Persona>().optional(),
});

export type MembresiaType = z.infer<typeof MembresiaSchema>;
