import { EstadoCivil, Sexo } from "@prisma/client";
import { Iglesia } from "./iglesia.interface";

export interface People {
  id?: string;
  nombres: string;
  apellidos: string;
  full_name?: string;
  cedula?: string | null;
  fecha_nacimiento?: Date | null;
  fecha_fe?: Date | null;
  fecha_bautizo?: Date | null;
  sexo_id: number;
  barrio_id: number;
  direccion: string;
  telefono?: string | null;
  user_id?: string;
  editor_id?: string | null;
  estado_civil_id: number;
  email?: string | null;
  created_at?: Date;
  updated_at?: Date | null;

  sexo?: Sexo;
  estadoCivil?: EstadoCivil;
  iglesia?: Iglesia;
}
