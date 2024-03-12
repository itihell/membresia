import { UserHasRole } from "./userHasRoles.inteface";

export interface User {
  id?: string;
  email: string;
  password: string;
  name: string;
  UserHasRole: UserHasRole[];
  churchId: string;
}
