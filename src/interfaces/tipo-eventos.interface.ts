import type { Evento } from "./eventos.interface";
export interface TipoEventos {
  id?: number;
  name: string;
  eventos?: Evento[];
}
