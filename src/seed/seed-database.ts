import { create } from "zustand";

import bcryptjs from "bcryptjs";

import prisma from "../lib/prisma";

async function main() {
  // 1. Borrar registros previos
  // await Promise.all( [
  await prisma.persona.deleteMany();
  await prisma.sexo.deleteMany();
  await prisma.estadoCivil.deleteMany();
  await prisma.tipoMembresia.deleteMany();
  await prisma.membresia.deleteMany();
  await prisma.iglesia.deleteMany();
  await prisma.userHasChurch.deleteMany();
  await prisma.usersHasRole.deleteMany();
  await prisma.postHasImage.deleteMany();
  await prisma.post.deleteMany();
  await prisma.categoria.deleteMany();
  await prisma.user.deleteMany();
  await prisma.role.deleteMany();
  await prisma.barrio.deleteMany();
  await prisma.zonaGeografica.deleteMany();
  await prisma.municipio.deleteMany();
  await prisma.departamento.deleteMany();
  await prisma.pais.deleteMany();
  await prisma.estado.deleteMany();
  await prisma.tipoEvento.deleteMany();
  // ]);

  await prisma.sexo.createMany({
    data: [{ name: "Masculino" }, { name: "Femenino" }],
  });

  await prisma.tipoEvento.createMany({
    data: [
      { id: 1, name: "Culto de Oración" },
      { id: 2, name: "Escuela Dominical" },
      { id: 3, name: "Culto de Jovenes" },
      { id: 4, name: "Culto de Caballeros" },
      { id: 5, name: "Culto de Femenil" },
      { id: 6, name: "Culto Unido" },
    ],
  });

  await prisma.estado.createMany({
    data: [{ name: "Activo" }, { name: "Baja" }],
  });

  await prisma.pais.createMany({
    data: [
      { id: 1, name: "Nicaragua" },
      { id: 2, name: "Costa Rica" },
    ],
  });

  await prisma.departamento.createMany({
    data: [
      { id: 1, paisId: 1, name: "RACCS" },
      { id: 2, paisId: 1, name: "Managua" },
    ],
  });

  await prisma.municipio.createMany({
    data: [
      { id: 1, departamentoId: 1, name: "Nueva Guinea" },
      { id: 2, departamentoId: 1, name: "El Rama" },
      { id: 3, departamentoId: 1, name: "Bluefields" },
      { id: 4, departamentoId: 1, name: "Mueye de los Buelles" },
    ],
  });

  await prisma.zonaGeografica.createMany({
    data: [
      { id: 1, name: "Urbano" },
      { id: 2, name: "Rural" },
    ],
  });

  await prisma.barrio.createMany({
    data: [
      { id: 1, zonaGeograficaId: 1, municipioId: 1, name: "Zona 1" },
      { id: 2, zonaGeograficaId: 1, municipioId: 1, name: "Zona 2" },
      { id: 3, zonaGeograficaId: 1, municipioId: 1, name: "Zona 3" },
      { id: 4, zonaGeograficaId: 1, municipioId: 1, name: "Zona 4" },
      { id: 5, zonaGeograficaId: 1, municipioId: 1, name: "Zona 5" },
      { id: 6, zonaGeograficaId: 1, municipioId: 1, name: "Zona 6" },
      { id: 7, zonaGeograficaId: 1, municipioId: 1, name: "Zona 7" },
      { id: 8, zonaGeograficaId: 1, municipioId: 1, name: "Zona 8" },
      { id: 9, zonaGeograficaId: 1, municipioId: 1, name: "Zona 9" },
      { id: 10, zonaGeograficaId: 1, municipioId: 1, name: "Bo. Linda Vista" },
      { id: 11, zonaGeograficaId: 1, municipioId: 1, name: "Bo. 5 Marzo" },
    ],
  });

  const sexos = await prisma.sexo.findMany();

  await prisma.estadoCivil.createMany({
    data: [
      { id: 1, estadoCivil: "Soltero" },
      { id: 2, estadoCivil: "Casado" },
      { id: 3, estadoCivil: "Divorciado" },
      { id: 4, estadoCivil: "Union Libre" },
    ],
  });

  const estadoCivil = await prisma.estadoCivil.findMany();

  await prisma.role.createMany({
    data: [
      { id: 1, name: "admin" },
      { id: 2, name: "user" },
      { id: 3, name: "secretario" },
    ],
  });

  await prisma.user.createMany({
    data: [
      {
        email: "itihell.mejia@gmail.com",
        password: bcryptjs.hashSync("12345678", 10),
        name: "Itihell Mejia",
        activo: true,
      },
    ],
  });

  const users = await prisma.user.findMany();

  await prisma.persona.createMany({
    data: [
      {
        nombres: "Juana Maria",
        apellidos: "Perez Garcia",
        sexoId: sexos[1].id,
        fechaNacimiento: new Date("1990-01-01"),
        fechaBautizo: new Date("2010-01-01"),
        fechaFe: new Date("2010-01-01"),
        cedula: "1234567890",
        userId: users[0].id,
        direccion: "Calle 1",
        telefono: "123456789",
        estadoCivilId: estadoCivil[1].id,
        barrioId: 1,
      },
      {
        nombres: "Karla Azucena",
        apellidos: "Martinez Alvarez",
        sexoId: sexos[1].id,
        fechaNacimiento: new Date("1983-07-03"),
        fechaBautizo: new Date("2010-01-01"),
        fechaFe: new Date("2010-01-01"),
        cedula: "616435345435",
        userId: users[0].id,
        direccion: "Calle 12",
        telefono: "6789893453",
        estadoCivilId: estadoCivil[2].id,
        barrioId: 2,
      },
      {
        nombres: "Iker Adonay",
        apellidos: "Gomez Rodriguez",
        sexoId: sexos[1].id,
        fechaNacimiento: new Date("1989-12-12"),
        fechaBautizo: new Date("2009-03-09"),
        fechaFe: new Date("2011-02-12"),
        cedula: "1219789789",
        userId: users[0].id,
        direccion: "Calle 24",
        telefono: "6776776789",
        estadoCivilId: estadoCivil[1].id,
        barrioId: 3,
      },
    ],
  });

  await prisma.iglesia.createMany({
    data: [
      {
        name: "Eben Ezer",
        direccion: "Calle 1",
        telefonos: "1234567890",
        email: "eben.ezer.ng@gmail.com",
      },
      {
        name: "Rosa de Saron",
        direccion: "Calle central",
        telefonos: "8787898023",
        email: "rosa.saron.ng@gmail.com",
      },
      {
        name: "Esmirna",
        direccion: "Calle central",
        telefonos: "8787898023",
        email: "esmirna.ng@gmail.com",
      },
    ],
  });

  await prisma.tipoMembresia.createMany({
    data: [{ tipoMebresia: "Pleno" }, { tipoMebresia: "Asociado" }],
  });

  await prisma.categoria.createMany({
    data: [
      {
        name: "Noticia",
      },
      {
        name: "Evento",
      },
      {
        name: "Anuncio",
      },
    ],
  });

  const categorias = await prisma.categoria.findMany();

  await prisma.post.createMany({
    data: [
      {
        title: "Titulo 1",
        content: "Contenido 1",
        categoriaId: categorias[0].id,
        slug: "titulo-1",
        userId: users[0].id,
      },
      {
        title: "Titulo 2",
        content: "Contenido 2",
        categoriaId: categorias[1].id,
        slug: "titulo-2",
        userId: users[0].id,
      },
      {
        title: "Titulo 3",
        content: "Contenido 3",
        categoriaId: categorias[2].id,
        slug: "titulo-3",
        userId: users[0].id,
      },
      {
        title: "Titulo 4",
        content: "Contenido 4",
        categoriaId: categorias[0].id,
        slug: "titulo-4",
        userId: users[0].id,
      },
      {
        title: "Titulo 5",
        content: "Contenido 5",
        categoriaId: categorias[1].id,
        slug: "titulo-5",
        userId: users[0].id,
      },
      {
        title: "Titulo 6",
        content: "Contenido 6",
        categoriaId: categorias[2].id,
        slug: "titulo-6",
        userId: users[0].id,
      },
    ],
  });

  const posts = await prisma.post.findMany();

  await prisma.postHasImage.createMany({
    data: [
      { postId: posts[0].id, url: "pedro_1_3_13.png" },
      { postId: posts[0].id, url: "colosenses_1_16.png" },
      {
        postId: posts[1].id,
        url: "coreintios1_13_34.png",
      },
      {
        postId: posts[1].id,
        url: "mateo_8_26.png",
      },
      {
        postId: posts[2].id,
        url: "lucas_1_37.png",
      },
      {
        postId: posts[2].id,
        url: "juan_3_16.png",
      },
      { postId: posts[3].id, url: "colosenses_1_16.png" },
      { postId: posts[3].id, url: "pedro_1_3_13.png" },
      {
        postId: posts[4].id,
        url: "mateo_8_26.png",
      },
      {
        postId: posts[4].id,
        url: "coreintios1_13_34.png",
      },
      {
        postId: posts[5].id,
        url: "juan_3_16.png",
      },
      {
        postId: posts[5].id,
        url: "lucas_1_37.png",
      },
    ],
  });

  // Productos

  console.log("Seed ejecutado correctamente");
}

(() => {
  if (process.env.NODE_ENV === "production") return;

  main();
})();
