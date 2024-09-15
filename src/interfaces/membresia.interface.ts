import { People } from "./people.interface";
import { TipoMembresia } from "./tipo-membresia.interface";
import { Iglesia } from "./iglesia.interface";
import { User } from "./user.interface";

export interface Membresia {
  id?: string;
  persona_id: string;
  fecha: Date;
  tipo_id: number;
  iglesia_id: string;
  user_id: string;
  activo: boolean;
  created_at: Date;
  updated_at: Date;
  persona?: People;
  iglesia?: Iglesia;
  user?: User;
  tipoMembresia?: TipoMembresia;
}
