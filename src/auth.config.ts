import NextAuth, { type NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";

import bcryptjs from "bcryptjs";
import prisma from "@/lib/prisma";

export const authConfig: NextAuthConfig = {
  pages: {
    signIn: "/auth/login",
    newUser: "/auth/new-acount",
  },

  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.data = user;
      }
      return token;
    },
    session({ session, token, user }) {
      session.user = token.data as any;

      return session;
    },

    authorized({ auth, request: { nextUrl } }) {
      //console.log({ auth });

      const isLoggedIn = !!auth?.user;
      //console.log({ parasm: nextUrl.searchParams });

      const isOnDashboard = nextUrl.pathname.startsWith("/checkout");

      if (isLoggedIn) return true;
      return false;

      //console.log({ isLoggedIn, isOnDashboard });

      // if (isOnDashboard) {
      //   if (isLoggedIn) return true;
      //   return false; // Redirect unauthenticated users to login page
      // } else if (isLoggedIn) {
      //   return Response.redirect(new URL("/checkout", nextUrl));
      // }
      // return true;
    },
  },
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (!parsedCredentials.success) return null;

        const { email, password } = parsedCredentials.data;

        //buscar el correo
        const user = await prisma.user.findUnique({ where: { email } });
        // Si no existe el usuario
        if (!user) return null;
        // comparar la contraseña
        if (!bcryptjs.compareSync(password, user.password)) return null;
        // si todo esta bien regresar el usuario

        const { password: _, ...rest } = user;

        return rest;
      },
    }),
  ],
};

export const { signIn, signOut, auth, handlers } = NextAuth({
  ...authConfig,
});
