"use server";

import bcryptjs from "bcryptjs";

import prisma from "@/lib/prisma";

interface Props {
  email: string;
  name: string;
  password: string;
}

export const registerUser = async (
  name: string,
  email: string,
  password: string
) => {
  try {
    const user = await prisma.user.create({
      data: {
        name,
        email: email.toLocaleLowerCase(),
        password: bcryptjs.hashSync(password, 10),
      },
      select: {
        id: true,
        name: true,
        email: true,
        tipoDocumentoId: true,
      },
    });

    return {
      ok: true,
      user: user,
      message: "Usuario creado correctamente",
    };
  } catch (error) {
    console.log(error);

    return {
      ok: false,
      message: "No se pudo crear el usuario",
    };
  }
};
