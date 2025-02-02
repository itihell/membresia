export interface CustomAdapterUser {
  id: string;
  email: string;
  name: string;
  iglesia_id: string;
  activo: boolean;
  created_at: Date;
  updated_at: Date;
  emailVerified: Date & null & string & undefined;
}
