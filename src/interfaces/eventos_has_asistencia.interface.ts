import type { Evento } from "./eventos.interface";
import type { People } from "./people.interface";

export interface EventoHasAsistencia {
  id?: string;
  asistio: boolean;
  evento_id: string;
  people_id: string;
  created_at?: Date | null;
  updated_at?: Date | null | undefined;
  deleted_at?: Date | null | undefined;
  evento?: Evento;
  persona?: People | null | undefined;
}
