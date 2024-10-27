import { Evento } from "./eventos.interface";
import { People } from "./people.interface";

export interface EventoHasAsistencia {
  id?: number;
  asistio: boolean;
  evento_id: string;
  people_id: string;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
  evento?: Evento;
  persona?: People;
}
