import { EstadoCivil, Sexo } from "@prisma/client";
import { Iglesia } from "./iglesia.interface";
import { FamiliaHasPersona } from "./familia-has-persona.interface";
import { Barrio } from "./sobre-barrio.interface";
import { Membresia } from "./membresia.interface";

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
  membresia?: Membresia[];
  familia?: FamiliaHasPersona;
  estadoCivil?: EstadoCivil;
  iglesia?: Iglesia;
  barrio?: Barrio;
}
