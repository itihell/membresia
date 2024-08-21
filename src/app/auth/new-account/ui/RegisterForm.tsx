"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import Link from "next/link";
import clsx from "clsx";
import { login, registerUser } from "@/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type FormInputs = {
  name: string;
  email: string;
  password: string;
};

export const RegisterForm = () => {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>();

  const onSubmit: SubmitHandler<FormInputs> = async (data: FormInputs) => {
    setErrorMessage("");
    const { email, name, password } = data;

    const respuesta = await registerUser(name, email, password);

    if (!respuesta.ok) {
      setErrorMessage(respuesta.message);
      return;
    }

    await login(email.toLowerCase(), password);

    window.location.replace("/perfil");
  };
  return (
    <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
      {/* {errors.name?.type === "required" && (
        <span className="text-red-500">* El nombre es obligatorio *</span>
      )} */}

      <label htmlFor="email">Nombre completo</label>
      <Input
        placeholder="Carlos Pérez"
        className={clsx("px-5 py-2 border bg-gray-200 rounded mb-5", {
          "border-red-500": !!errors.name,
        })}
        type="text"
        autoFocus
        {...register("name", { required: true })}
      />

      <label htmlFor="email">Correo electrónico</label>
      <Input
        placeholder="carlos.perez@est.uraccan.edu.ni"
        className={clsx("px-5 py-2 border bg-gray-200 rounded mb-5", {
          "border-red-500": !!errors.email,
        })}
        type="email"
        {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
      />

      <label htmlFor="email">Contraseña</label>
      <Input
        placeholder="Mínimo 6 caracteres"
        className={clsx("px-5 py-2 border bg-gray-200 rounded mb-5", {
          "border-red-500": !!errors.password,
        })}
        type="password"
        {...register("password", { required: true, minLength: 6 })}
      />

      {errorMessage.length > 0 && (
        <span className="text-red-500 mb-2">{errorMessage}</span>
      )}

      <Button variant={"default"}>Crear cuenta</Button>

      {/* divisor l ine */}
      <div className="flex items-center my-5">
        <div className="flex-1 border-t border-gray-500"></div>
        <div className="px-2 text-gray-800">O</div>
        <div className="flex-1 border-t border-gray-500"></div>
      </div>

      <Button asChild>
        <Link href="/auth/login" className="btn-secondary text-center">
          Ingresar
        </Link>
      </Button>
    </form>
  );
};
