import NextAuth, { type NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";

import bcryptjs from "bcryptjs";
import prisma from "@/lib/prisma";
import { CustomAdapterUser } from "./modules/auth/interface";

export const authConfig: NextAuthConfig = {
  pages: {
    signIn: "/auth/login",
  },

  callbacks: {
    async signIn({ user }) {
      if (user) {
        return true;
      }

      return false;
    },
    jwt({ token, user }) {
      if (user) {
        token.data = user;
      }
      return token;
    },
    session({ session, token }) {
      const adapter = token.data as CustomAdapterUser;
      session.user = {
        ...adapter,
        emailVerified: null,
      };
      return session;
    },
    authorized: async ({ auth }) => {
      return !!auth?.user;
    },
  },
  providers: [
    Credentials({
      async authorize(credentials) {
        const { email, password } = credentials;

        //buscar el correo
        const user = await prisma.user.findUnique({
          where: { email: email as string },
        });
        // Si no existe el usuario
        if (!user) {
          return null;
        }
        // comparar la contraseña
        if (!bcryptjs.compareSync(password as string, user.password)) {
          return null;
        }
        // si todo esta bien regresar el usuario

        const { password: _, ...rest } = user;

        return rest;
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 4 * 60 * 60, // 4 horas
  },
};

export const { signIn, signOut, auth, handlers } = NextAuth({
  ...authConfig,
});
