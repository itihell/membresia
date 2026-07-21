import { z } from "zod";

export const iglesiaSchema = z.object({
  name: z
    .string()
    .min(1, "El nombre es requerido")
    .max(200, "El nombre no puede exceder 200 caracteres"),
  email: z
    .string()
    .email("Correo electrónico inválido")
    .min(1, "El correo electrónico es requerido")
    .max(200, "El correo electrónico no puede exceder 200 caracteres"),
  direccion: z.string().min(1, "La dirección es requerida"),
  telefonos: z
    .string()
    .min(1, "Los teléfonos son requeridos")
    .max(100, "Los teléfonos no pueden exceder 100 caracteres"),
});

export type IglesiaType = z.infer<typeof iglesiaSchema>;
