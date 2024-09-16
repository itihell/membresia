import { FamiliaHasPersona } from "./familia-has-persona.interface";
import { User } from "./user.interface";

export interface Familia {
  id?: string;
  name: string;
  iglesia_id: string;
  user_id: string;
  user_edit_id: string;
  created_at?: Date;
  updated_at?: Date | null;
  iglesia: string;
  editor: User;
  user: User;
  miembros: FamiliaHasPersona[];
}
