import { People } from "./people.interface";

export interface FamiliaHasPersona {
  id?: string;
  familia_id: string;
  persona_id: string;
  created_at?: Date;
  updated_at?: Date | null;
  persona?: People;
}
