import prisma from "../lib/prisma";

import bcryptjs from "bcryptjs";

async function main() {
  // 1. Borrar registros previos
  // await Promise.all( [
  await prisma.tipoEvento.deleteMany();
  await prisma.persona.deleteMany();
  await prisma.sexo.deleteMany();
  await prisma.estadoCivil.deleteMany();
  await prisma.tipoMembresia.deleteMany();
  await prisma.membresia.deleteMany();
  await prisma.iglesia.deleteMany();
  await prisma.usersHasChurch.deleteMany();
  await prisma.usersHasRole.deleteMany();
  await prisma.postHasImage.deleteMany();
  await prisma.post.deleteMany();
  await prisma.categoria.deleteMany();
  await prisma.user.deleteMany();
  await prisma.roles.deleteMany();
  await prisma.barrio.deleteMany();
  await prisma.municipio.deleteMany();
  await prisma.departamento.deleteMany();
  await prisma.pais.deleteMany();
  await prisma.zonaGeografica.deleteMany();
  await prisma.parentesco.deleteMany();
  // ]);

  //  Categorias
  // {
  //   name: 'Shirt'
  // }

  await prisma.sexo.createMany({
    data: [
      { id: 1, name: "Masculino" },
      { id: 2, name: "Femenino" },
    ],
  });

  await prisma.parentesco.createMany({
    data: [
      { id: 1, parentesco: "Papá" },
      { id: 2, parentesco: "Mamá" },
      { id: 3, parentesco: "Hijo" },
      { id: 4, parentesco: "Abuelo" },
      { id: 5, parentesco: "Sobrino" },
      { id: 6, parentesco: "Primo" },
    ],
  });

  await prisma.tipoEvento.createMany({
    data: [
      { id: 1, name: "Culto" },
      { id: 2, name: "Sesión" },
      { id: 3, name: "Santa Cena" },
    ],
  });

  await prisma.zonaGeografica.createMany({
    data: [
      { id: 1, name: "Urbana" },
      { id: 2, name: "Rural" },
    ],
  });

  await prisma.pais.createMany({
    data: [
      { id: 1, name: "Nicaragua" },
      { id: 2, name: "Costa Rica" },
    ],
  });

  await prisma.departamento.createMany({
    data: [
      { id: 1, name: "RACCS", pais_id: 1 },
      { id: 2, name: "RACCN", pais_id: 1 },
      { id: 3, name: "Managua", pais_id: 1 },
      { id: 4, name: "Chontales", pais_id: 1 },
      { id: 5, name: "Chinandega", pais_id: 1 },
    ],
  });

  await prisma.municipio.createMany({
    data: [
      { id: 1, name: "Nueva Guinea", departamento_id: 1 },
      { id: 2, name: "El Rama", departamento_id: 1 },
    ],
  });

  await prisma.barrio.createMany({
    data: [
      { id: 1, name: "Zona 1", municipio_id: 1, zona_geografica_id: 1 },
      { id: 2, name: "Zona 2", municipio_id: 1, zona_geografica_id: 1 },
      { id: 3, name: "Zona 3", municipio_id: 1, zona_geografica_id: 1 },
      { id: 4, name: "Zona 4", municipio_id: 1, zona_geografica_id: 1 },
      { id: 5, name: "Zona 5", municipio_id: 1, zona_geografica_id: 1 },
      { id: 6, name: "Zona 6", municipio_id: 1, zona_geografica_id: 1 },
      { id: 7, name: "Zona 7", municipio_id: 1, zona_geografica_id: 1 },
      { id: 8, name: "Zona 8", municipio_id: 1, zona_geografica_id: 1 },
      { id: 9, name: "Zona 9", municipio_id: 1, zona_geografica_id: 1 },
      {
        id: 10,
        name: "Bo. Linda Vista",
        municipio_id: 1,
        zona_geografica_id: 1,
      },
      { id: 11, name: "Bo. 5 Marzo", municipio_id: 1, zona_geografica_id: 1 },
      { id: 12, name: "Otro", municipio_id: 1, zona_geografica_id: 1 },
    ],
  });

  const sexos = await prisma.sexo.findMany();

  await prisma.estadoCivil.createMany({
    data: [
      { id: 1, estado_civil: "Soltero" },
      { id: 2, estado_civil: "Casado" },
      { id: 3, estado_civil: "Divorciado" },
      { id: 4, estado_civil: "Union Libre" },
    ],
  });

  const estadoCivil = await prisma.estadoCivil.findMany();

  await prisma.roles.createMany({
    data: [
      { id: 1, name: "admin" },
      { id: 2, name: "user" },
      { id: 3, name: "secretario" },
      { id: 4, name: "tesorero" },
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

  const iglesia = await prisma.iglesia.findMany();

  await prisma.user.createMany({
    data: [
      {
        email: "itihell.mejia@gmail.com",
        password: bcryptjs.hashSync("12345678", 10),
        name: "Itihell Mejia",
        iglesia_id: iglesia[0].id,
      },
    ],
  });

  const users = await prisma.user.findMany();

  await prisma.usersHasRole.createMany({
    data: [
      { user_id: users[0].id, role_id: 1 },
      { user_id: users[0].id, role_id: 2 },
      { user_id: users[0].id, role_id: 3 },
      { user_id: users[0].id, role_id: 4 },
    ],
  });

  await prisma.persona.createMany({
    data: [
      {
        nombres: "Juana Maria",
        apellidos: "Perez Garcia",
        sexo_id: sexos[1].id,
        user_id: users[0].id,
        direccion: "Calle 1",
        telefono: "123456789",
        estado_civil_id: estadoCivil[1].id,
        barrio_id: 1,
        iglesia_id: iglesia[0].id,
      },
      {
        nombres: "Karla Azucena",
        apellidos: "Martinez Alvarez",
        sexo_id: sexos[1].id,
        user_id: users[0].id,
        direccion: "Calle 12",
        telefono: "678989345",
        estado_civil_id: estadoCivil[2].id,
        barrio_id: 1,
        iglesia_id: iglesia[0].id,
      },
      {
        nombres: "Iker Adonay",
        apellidos: "Gomez Rodriguez",
        sexo_id: sexos[1].id,
        cedula: "1219789789",
        user_id: users[0].id,
        direccion: "Calle 24",
        telefono: "677677678",
        estado_civil_id: estadoCivil[1].id,
        barrio_id: 1,
        iglesia_id: iglesia[0].id,
      },
    ],
  });

  await prisma.tipoMembresia.createMany({
    data: [
      { id: 1, tipo_mebresia: "Bautismo" },
      { id: 2, tipo_mebresia: "Reconcilio" },
      { id: 3, tipo_mebresia: "Traslado" },
    ],
  });

  await prisma.categoria.createMany({
    data: [
      {
        id: 1,
        name: "Noticia",
      },
      {
        id: 2,
        name: "Evento",
      },
      {
        id: 3,
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
        categoria_id: categorias[0].id,
        slug: "titulo-1",
        user_id: users[0].id,
      },
      {
        title: "Titulo 2",
        content: "Contenido 2",
        categoria_id: categorias[1].id,
        slug: "titulo-2",
        user_id: users[0].id,
      },
      {
        title: "Titulo 3",
        content: "Contenido 3",
        categoria_id: categorias[2].id,
        slug: "titulo-3",
        user_id: users[0].id,
      },
      {
        title: "Titulo 4",
        content: "Contenido 4",
        categoria_id: categorias[0].id,
        slug: "titulo-4",
        user_id: users[0].id,
      },
      {
        title: "Titulo 5",
        content: "Contenido 5",
        categoria_id: categorias[1].id,
        slug: "titulo-5",
        user_id: users[0].id,
      },
      {
        title: "Titulo 6",
        content: "Contenido 6",
        categoria_id: categorias[2].id,
        slug: "titulo-6",
        user_id: users[0].id,
      },
    ],
  });

  const posts = await prisma.post.findMany();

  await prisma.postHasImage.createMany({
    data: [
      { post_id: posts[0].id, url: "pedro_1_3_13.png" },
      { post_id: posts[0].id, url: "colosenses_1_16.png" },
      {
        post_id: posts[1].id,
        url: "coreintios1_13_34.png",
      },
      {
        post_id: posts[1].id,
        url: "mateo_8_26.png",
      },
      {
        post_id: posts[2].id,
        url: "lucas_1_37.png",
      },
      {
        post_id: posts[2].id,
        url: "juan_3_16.png",
      },
      { post_id: posts[3].id, url: "colosenses_1_16.png" },
      { post_id: posts[3].id, url: "pedro_1_3_13.png" },
      {
        post_id: posts[4].id,
        url: "mateo_8_26.png",
      },
      {
        post_id: posts[4].id,
        url: "coreintios1_13_34.png",
      },
      {
        post_id: posts[5].id,
        url: "juan_3_16.png",
      },
      {
        post_id: posts[5].id,
        url: "lucas_1_37.png",
      },
    ],
  });
}

(() => {
  if (process.env.NODE_ENV === "production") {
    return;
  }

  main();
})();
