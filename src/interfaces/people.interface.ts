import { EstadoCivil, Sexo } from "@prisma/client";

export interface People {
  id: String;
  nombres: String;
  apellidos: String;
  cedula: String;
  fechaNacimiento: Date;
  fechaFe?: Date | null;
  fechaBautizo?: Date | null;
  sexoId: number;
  barrioId: number;
  direccion: String;
  telefono?: String | null;
  userId: String;
  editorId?: String | null;
  estadoCivilId: number;
  email?: string | null;
  createdAt: Date;
  updatedAt: Date;

  sexo: Sexo;
  estadoCivil: EstadoCivil;
}
