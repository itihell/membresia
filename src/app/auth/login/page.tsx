import { titleFont } from "@/config/fonts";
import { LoginForm } from "./ui/LoginForm";
import { Suspense } from "react";

export default function LoginPage() {
  return (
    <div className="w-full">
      <div className="bg-white p-8 rounded-xl shadow-2xl border border-gray-100 transition duration-300 hover:shadow-3xl">
        <div className="mb-6 text-center">
          <h1
            className={`${titleFont.className} text-4xl font-bold text-gray-800`}
          >
            Bienvenido
          </h1>
          <p className="text-gray-500 mt-1">
            Identifícate para acceder a FIEMCA
          </p>
        </div>

        <Suspense>
          <LoginForm />
        </Suspense>

        <p className="mt-6 text-center text-sm text-gray-500">
          ¿Olvidaste tu contraseña?{" "}
          <a
            href="/auth/forgot-password"
            className="font-medium text-blue-600 hover:text-blue-500 transition duration-150"
          >
            Recupérala aquí
          </a>
        </p>
      </div>
    </div>
  );
}
