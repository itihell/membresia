import { EstadoCivil, Sexos } from "@prisma/client";

export interface People {
  id: String;
  nombres: String;
  apellidos: String;
  cedula: String;
  fecha_nacimiento: Date;
  fecha_fe?: Date | null;
  fecha_bautizo?: Date | null;
  sexoId: number;
  direccion: String;
  telefono?: String | null;
  userId: String;
  editorId?: String | null;
  estado_civilId: number;
  email?: string | null;
  createdAt: Date;
  updatedAt: Date;

  sexo: Sexos;
  estadoCivil: EstadoCivil;
}
