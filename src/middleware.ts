import NextAuth from "next-auth";
import { authConfig } from "./auth.config";

export default NextAuth(authConfig).auth;

export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  //matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
  matcher: [
    "/",
    "/admin/:path*",
    "/asistencias/:path*",
    "/eventos/:path*",
    "/iglesias/:path*",
    "/membresias/:path*",
    "/personas/:path*",
    "/donaciones/:path*",
    "/reportes/:path*",
    "/familias/:path*",
  ],
};
