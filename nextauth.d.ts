// nextauth.d.ts
import NextAuth from "next-auth";
import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface User extends DefaultUser {
    iglesia_id?: string;
    accessToken?: string;
  }

  interface Session extends DefaultSession {
    user?: User;
    accessToken?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    iglesia_id?: string;
    accessToken?: string;
  }
}
