import type { People } from "./people.interface";
import type { TipoMembresia } from "./tipo-membresia.interface";
import type { Iglesia } from "./iglesia.interface";
import type { User } from "./user.interface";

export interface Membresia {
  id?: string;
  fecha: Date;
  tipo_id: number;
  created_at: Date;
  updated_at: Date;
  persona_id: string;
  activo: boolean;
  iglesia_id: string;
  user_id: string;
  // Relations
  persona?: People;
  iglesia?: Iglesia;
  user?: User;
  tipoMembresia?: TipoMembresia;
}
