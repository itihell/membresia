import { People } from "./people.interface";
import { TipoMembresia } from "./tipo-membresia.interface";

export interface Membresia {
  id?: string;
  persona_id: string;
  fecha: Date;
  tipo_id: number;
  created_at: Date;
  updated_at: Date;
  persona?: People;
  tipoMembresia?: TipoMembresia;
}
