"use client";

import { useSession } from "next-auth/react";
import { createLogin } from "@/actions";

import { useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui";
import { useForm } from "react-hook-form";
import { loginFormSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import type { z } from "zod";
import { InputLabel } from "@/components/common";

export const LoginForm = () => {
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const arrayPath = searchParams.get("callbackUrl")?.split("/");

  arrayPath?.splice(0, 3);
  const callbackUrl = arrayPath ? "/" + arrayPath?.join("/") : "/";

  if (session?.user) {
    // Es mejor usar el router de next/navigation para redirecciones.
    // window.location.replace("/");
    // Deberías usar: router.replace('/') o router.push('/')
  }

  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof loginFormSchema>) => {
    createLogin(values, callbackUrl);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <InputLabel
                  type="email"
                  label="Correo Electrónico"
                  autoComplete="email"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <InputLabel type="password" label="Password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="pt-2">
          <Button
            type="submit"
            className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-lg font-semibold transition duration-150"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? "Cargando..." : "Entrar"}
          </Button>
        </div>
      </form>
    </Form>
  );
};
