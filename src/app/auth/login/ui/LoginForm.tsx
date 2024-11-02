"use client";

import { useSession } from "next-auth/react";
import { createLogin } from "@/actions";
import clsx from "clsx";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";

import { useFormState, useFormStatus } from "react-dom";
import { IoInformationOutline } from "react-icons/io5";
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
import { z } from "zod";

export const LoginForm = () => {
  const { data: session, status } = useSession();
  const searchParams = useSearchParams();
  const arrayPath = searchParams.get("callbackUrl")?.split("/");

  arrayPath?.splice(0, 3);
  const callbackUrl = arrayPath ? "/" + arrayPath?.join("/") : "/";

  if (session?.user) {
    window.location.replace("/");
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
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="your_email@domain.com"
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
                  <Input type="password" placeholder="Password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="">
            <div className="grid space-x-0 mt-6">
              <Button type="submit" className="">
                Entrar
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
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
