"use server";
import { z } from "zod";
import { signIn } from "@/auth.config";
import { AuthError } from "next-auth";
import { loginFormSchema } from "@/schemas";

// ...

export async function createLogin(
  payload: z.infer<typeof loginFormSchema>,
  callbackUrl: string
) {
  try {
    const data = await signIn("credentials", {
      ...payload,
      redirectTo: callbackUrl,
      redirect: true,
    });

    console.log("DAta", data);

    return "Success";
  } catch (error) {
    console.log(error);

    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Las credenciales no son correctas.";
        default:
          return "Algo salió mal. Por favor intenta de nuevo.";
      }
    }

    throw error;
  }
}
