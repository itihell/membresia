import { z } from "zod";

export const FamiliaSchema = z.object({
  name: z.string({ message: "El nombre de la familia es requerido" }),
});
