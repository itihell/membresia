import { z } from "zod";

export const MiembrosHasFamiliaSchema = z.object({
  persona_id: z.string({ message: "Debe seleccionar una persona" }),
  familia_id: z.string({ message: "Debe seleccionar una familia" }),
  parentesco_id: z.number({ message: "Debe seleccionar el parentesco" }),
});
