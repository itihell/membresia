import type { EventoHasAsistencia } from "./eventos_has_asistencia.interface";
import type { TipoEventos } from "./tipo-eventos.interface";

export interface Evento {
  id?: string;
  title: string;
  description?: string | null;
  tipo_evento_id: number;
  date: Date;
  iglesia_id?: string;
  user_id?: string;
  user_edit_id?: string;
  created_at?: Date | null | undefined;
  updated_at?: Date | null | undefined;
  deleted_at?: Date | null | undefined;
  tipos_evento?: TipoEventos | null;
  eventos_has_asistencia?: EventoHasAsistencia[] | null;
}

export interface ListaEventos {
  id?: string;
  date: Date;
  title: string;
  description?: string | null;
  asistencia: string;
}

export interface countAsistencia {
  hombres: number;
  mujeres: number;
  total: number;
}
