import type { UserHasRole } from "./userHasRoles.inteface";

export interface User {
  id?: string;
  email: string;
  password: string;
  iglesia_id: string;
  name: string;
  activo: boolean;
  UserHasRole?: UserHasRole[];
}
