"use server";
import { signIn } from "@/auth.config";
import { AuthError } from "next-auth";

// ...

export async function loginForm(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    await signIn("credentials", {
      ...Object.fromEntries(formData),
      redirect: false,
    });

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
