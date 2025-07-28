import type { People } from "./people.interface";

export interface Barrio {
  id?: number;
  name: string;
  municipio_id: number;
  zona_geografica_id: number;
  municipio?: Municipio;
  zonaGeografica?: ZonaGeografica;
  personas?: People[];
}

export interface Municipio {
  id?: number;
  name: string;
  departamento_id: number;
  barrios?: Barrio[];
  departamento?: Departamento;
}

export interface ZonaGeografica {
  id?: number;
  name: string;
  barrios?: Barrio[];
}

export interface Departamento {
  id?: number;
  name: string;
  pais_id: number;
  pais?: Pais;
  municipios?: Municipio[];
}

export interface Pais {
  id?: number;
  name: string;
  departamentos?: Departamento[];
}
