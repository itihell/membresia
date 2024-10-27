import { EventoHasAsistencia } from "./eventos_has_asistencia.interface";

export interface Evento {
  id?: string;
  title: string;
  description?: string;
  tipo_evento_id: number;
  date: Date;
  iglesia_id?: string;
  user_id?: string;
  user_edit_id?: string;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
  eventos_has_asistencia?: EventoHasAsistencia[];
}
