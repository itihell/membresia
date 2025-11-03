"use client";

import { useSession } from "next-auth/react";
import { createLogin } from "@/actions";

import { useSearchParams } from "next/navigation";

// Asumo que estos componentes ya están estilizados de forma moderna (shadcn/ui o similar)
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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

export const LoginForm = () => {
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const arrayPath = searchParams.get("callbackUrl")?.split("/");

  // Lógica para el callbackUrl
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
    // Añade manejo de carga/error aquí
    createLogin(values, callbackUrl);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {" "}
        {/* Aumento el espacio entre campos */}
        {/* Campo Email */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                {/* Asegúrate de que tu componente Input tenga un estilo moderno (padding, border-radius, focus state) */}
                <Input
                  type="email"
                  placeholder="Correo Electrónico" // Texto más amigable
                  autoComplete="email" // Importante para accesibilidad
                  className="h-11 text-base" // Ajustes sutiles para Inputs
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Campo Contraseña */}
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Contraseña"
                  autoComplete="current-password" // Importante para accesibilidad
                  className="h-11 text-base"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Botón de Submit */}
        <div className="pt-2">
          {" "}
          {/* Espacio extra antes del botón */}
          <Button
            type="submit"
            className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-lg font-semibold transition duration-150"
            disabled={form.formState.isSubmitting} // Deshabilitar durante el envío
          >
            {form.formState.isSubmitting ? "Cargando..." : "Entrar"}
          </Button>
        </div>
      </form>
    </Form>
  );
};
