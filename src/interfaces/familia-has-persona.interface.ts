import { Familia } from "./familia.interface";
import { Parentesco } from "./parentesco.interface";
import { People } from "./people.interface";

export interface FamiliaHasPersona {
  id?: string;
  familia_id: string;
  persona_id: string;
  parentesco_id: number;
  created_at?: Date;
  updated_at?: Date | null;
  persona?: People;
  familia?: Familia;
  parentesco?: Parentesco;
}
