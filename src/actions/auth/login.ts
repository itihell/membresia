"use server";
import type { z } from "zod";
import { signIn } from "@/auth.config";
import { AuthError } from "next-auth";
import type { loginFormSchema } from "@/schemas";

// ...

export async function createLogin(
  payload: z.infer<typeof loginFormSchema>,
  callbackUrl: string
) {
  try {
    //const a = await signIn("oauth", {
    return await signIn("credentials", {
      ...payload,
      redirectTo: callbackUrl,
      redirect: true,
    });

    //console.error({ a });
  } catch (error) {
    // console.log({ error });

    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return {
            error: true,
            message: "Credenciales incorrectas. Por favor intenta de nuevo.",
          };
        default:
          return {
            error: true,
            message: "Credenciales incorrectas. Por favor intenta de nuevo.",
          };
      }
    }

    throw error;
  }
}
