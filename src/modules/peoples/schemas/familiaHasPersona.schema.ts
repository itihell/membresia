import type { Familia, Parentesco, Persona } from "@prisma/client";
import { z } from "zod";

export const FamiliaHasPersonaSchema = z.object({
  persona_id: z.string({ message: "Debe seleccionar una persona" }),
  familia_id: z.string({ message: "Debe seleccionar una familia" }),
  parentesco_id: z.number({ message: "Debe seleccionar un parentesco" }),
  familia: z.custom<Familia>().optional(),
  parentesco: z.custom<Parentesco>().optional(),
  persona: z.custom<Persona>().optional(),
});

export type FamiliaHasPersonaType = z.infer<typeof FamiliaHasPersonaSchema>;
