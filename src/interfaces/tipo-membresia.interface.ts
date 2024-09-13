import { Membresia } from "./membresia.interface";

export interface TipoMembresia {
  id?: number;
  tipo_mebresia: string;
  membresias?: Membresia[];
}
