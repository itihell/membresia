import type { Familia } from "./familia.interface";
import type { Parentesco } from "./parentesco.interface";
import type { People } from "./people.interface";

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
