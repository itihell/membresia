"use client";

import { useSession } from "next-auth/react";
import { loginForm } from "@/actions";
import clsx from "clsx";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";

import { useFormState, useFormStatus } from "react-dom";
import { IoInformationOutline } from "react-icons/io5";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const LoginForm = () => {
  const [message, dispatch] = useFormState(loginForm, undefined);
  const { data: session } = useSession();

  const querysParams = useSearchParams();

  if (session?.user) {
    window.location.replace("/");
  }

  useEffect(() => {
    if (message === "Success") {
      if (querysParams.get("callbackUrl")) {
        const url = querysParams.get("callbackUrl") ?? "/";
        window.location.replace(url);
      } else {
        window.location.replace("/");
      }
    }
  }, [message, querysParams]);
  return (
    <form action={dispatch} className="flex flex-col">
      <label htmlFor="email">Correo electrónico</label>
      <Input
        className="px-5 py-2 border bg-gray-200 rounded mb-5"
        type="email"
        name="email"
      />

      <label htmlFor="email">Contraseña</label>
      <Input
        className="px-5 py-2 border bg-gray-200 rounded mb-5"
        type="password"
        name="password"
      />

      <div
        className="flex h-8 items-end space-x-1"
        aria-live="polite"
        aria-atomic="true"
      >
        {message && (
          <div className="flex flex-row mb-2">
            <IoInformationOutline className="h-5 w-5 text-red-500" />
            {message === "Success" ? (
              <p className="text-sm text-green-600">{message}</p>
            ) : (
              <p className="text-sm text-red-500">{message}</p>
            )}
          </div>
        )}
      </div>

      <Suspense>
        <LoginButton />
      </Suspense>
    </form>
  );
};

function LoginButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      variant={"default"}
      type="submit"
      className={clsx({ "btn-primary": !pending, "btn-disabled": pending })}
      disabled={pending}
    >
      Entrar
    </Button>
  );
}
