import { Membresia } from "./membresia.interface";
import { People } from "./people.interface";
import { User } from "./user.interface";

export interface Iglesia {
  id?: string;
  name: string;
  email: string;
  direccion: string;
  telefonos: string;
  created_at?: Date;
  updated_at?: Date | null;
  //relaciones
  persona?: People[];
  user?: User;
  membresia?: Membresia[];
}
