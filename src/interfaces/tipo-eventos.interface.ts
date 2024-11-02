import { Evento } from "./eventos.interface";
import { Iglesia } from "./iglesia.interface";
import { User } from "./user.interface";

export interface TipoEventos {
  id?: number;
  name: string;
  eventos?: Evento[];
}
