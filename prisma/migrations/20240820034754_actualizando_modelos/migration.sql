/*
  Warnings:

  - You are about to drop the `Bajas` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Church` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `EstadoCivil` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Membresia` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `People` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PostHasImage` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Role` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Sexos` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TipoMembresia` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserHasChurch` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserHasRole` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `category` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Bajas" DROP CONSTRAINT "Bajas_editorId_fkey";

-- DropForeignKey
ALTER TABLE "Bajas" DROP CONSTRAINT "Bajas_peopleId_fkey";

-- DropForeignKey
ALTER TABLE "Bajas" DROP CONSTRAINT "Bajas_userId_fkey";

-- DropForeignKey
ALTER TABLE "Membresia" DROP CONSTRAINT "Membresia_peopleId_fkey";

-- DropForeignKey
ALTER TABLE "Membresia" DROP CONSTRAINT "Membresia_tipoId_fkey";

-- DropForeignKey
ALTER TABLE "People" DROP CONSTRAINT "People_editorId_fkey";

-- DropForeignKey
ALTER TABLE "People" DROP CONSTRAINT "People_estado_civilId_fkey";

-- DropForeignKey
ALTER TABLE "People" DROP CONSTRAINT "People_sexoId_fkey";

-- DropForeignKey
ALTER TABLE "People" DROP CONSTRAINT "People_userId_fkey";

-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_userId_fkey";

-- DropForeignKey
ALTER TABLE "PostHasImage" DROP CONSTRAINT "PostHasImage_postId_fkey";

-- DropForeignKey
ALTER TABLE "UserHasChurch" DROP CONSTRAINT "UserHasChurch_churchId_fkey";

-- DropForeignKey
ALTER TABLE "UserHasChurch" DROP CONSTRAINT "UserHasChurch_userId_fkey";

-- DropForeignKey
ALTER TABLE "UserHasRole" DROP CONSTRAINT "UserHasRole_roleId_fkey";

-- DropForeignKey
ALTER TABLE "UserHasRole" DROP CONSTRAINT "UserHasRole_userId_fkey";

-- DropTable
DROP TABLE "Bajas";

-- DropTable
DROP TABLE "Church";

-- DropTable
DROP TABLE "EstadoCivil";

-- DropTable
DROP TABLE "Membresia";

-- DropTable
DROP TABLE "People";

-- DropTable
DROP TABLE "Post";

-- DropTable
DROP TABLE "PostHasImage";

-- DropTable
DROP TABLE "Role";

-- DropTable
DROP TABLE "Sexos";

-- DropTable
DROP TABLE "TipoMembresia";

-- DropTable
DROP TABLE "User";

-- DropTable
DROP TABLE "UserHasChurch";

-- DropTable
DROP TABLE "UserHasRole";

-- DropTable
DROP TABLE "category";

-- DropEnum
DROP TYPE "Gender";

-- DropEnum
DROP TYPE "Size";

-- CreateTable
CREATE TABLE "bajas" (
    "id" TEXT NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL,
    "motivo" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "editor_id" TEXT,
    "people_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "bajas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "barrios" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(60) NOT NULL,
    "municipio_id" INTEGER NOT NULL,
    "zona_geografica_id" INTEGER NOT NULL,

    CONSTRAINT "barrios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "categorias" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "categorias_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "departamentos" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(60) NOT NULL,
    "pais_id" INTEGER NOT NULL,

    CONSTRAINT "departamentos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "estados" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(20) NOT NULL,

    CONSTRAINT "estados_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "estados_civiles" (
    "id" SERIAL NOT NULL,
    "estado_civil" TEXT NOT NULL,

    CONSTRAINT "estados_civiles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "eventos" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "date" TIMESTAMP(3) NOT NULL,
    "location" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),
    "user_id" TEXT NOT NULL,
    "user_edit_id" TEXT NOT NULL,
    "iglesia_id" TEXT NOT NULL,
    "tipo_evento_id" INTEGER NOT NULL,
    "iglesiaId" TEXT,
    "tipoEventoId" INTEGER,

    CONSTRAINT "eventos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "eventos_has_asistencias" (
    "id" TEXT NOT NULL,
    "asistio" BOOLEAN NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),
    "evento_id" TEXT NOT NULL,
    "people_id" TEXT NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "eventos_has_asistencias_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "iglesias" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(200) NOT NULL,
    "email" VARCHAR(200) NOT NULL,
    "direccion" TEXT NOT NULL,
    "telefonos" VARCHAR(100) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "iglesias_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "membresias" (
    "id" TEXT NOT NULL,
    "people_id" TEXT NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL,
    "tipo_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "membresias_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "municipios" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(60) NOT NULL,
    "departamento_id" INTEGER NOT NULL,

    CONSTRAINT "municipios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "paises" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(60) NOT NULL,

    CONSTRAINT "paises_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "personas" (
    "id" TEXT NOT NULL,
    "nombres" VARCHAR(60) NOT NULL,
    "apellidos" VARCHAR(60) NOT NULL,
    "cedula" VARCHAR(20) NOT NULL,
    "fecha_nacimiento" TIMESTAMP(3) NOT NULL,
    "fecha_fe" TIMESTAMP(3),
    "fecha_bautizo" TIMESTAMP(3),
    "sexo_id" INTEGER NOT NULL,
    "direccion" TEXT NOT NULL,
    "telefono" VARCHAR(10),
    "user_id" TEXT NOT NULL,
    "editor_id" TEXT,
    "estado_civil_id" INTEGER NOT NULL,
    "email" VARCHAR(100),
    "barrio_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "personas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "posts" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "user_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "categoria_id" INTEGER NOT NULL,
    "userId" TEXT,

    CONSTRAINT "posts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "posts_has_images" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "post_id" TEXT NOT NULL,

    CONSTRAINT "posts_has_images_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "roles" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(60) NOT NULL,

    CONSTRAINT "roles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sexos" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(20) NOT NULL,

    CONSTRAINT "sexos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tipos_eventos" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(60) NOT NULL,

    CONSTRAINT "tipos_eventos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tipos_membresias" (
    "id" SERIAL NOT NULL,
    "tipo_mebresia" VARCHAR(60) NOT NULL,

    CONSTRAINT "tipos_membresias_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "email" VARCHAR(200) NOT NULL,
    "password" TEXT NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "iglesia_id" TEXT,
    "activo" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users_has_church" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "iglesia_id" TEXT NOT NULL,

    CONSTRAINT "users_has_church_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users_has_roles" (
    "user_id" TEXT NOT NULL,
    "role_id" INTEGER NOT NULL,

    CONSTRAINT "users_has_roles_pkey" PRIMARY KEY ("user_id","role_id")
);

-- CreateTable
CREATE TABLE "zonas_geograficas" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(60) NOT NULL,

    CONSTRAINT "zonas_geograficas_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "barrios_name_key" ON "barrios"("name");

-- CreateIndex
CREATE UNIQUE INDEX "categorias_name_key" ON "categorias"("name");

-- CreateIndex
CREATE UNIQUE INDEX "departamentos_name_key" ON "departamentos"("name");

-- CreateIndex
CREATE UNIQUE INDEX "estados_name_key" ON "estados"("name");

-- CreateIndex
CREATE UNIQUE INDEX "estados_civiles_estado_civil_key" ON "estados_civiles"("estado_civil");

-- CreateIndex
CREATE UNIQUE INDEX "municipios_name_key" ON "municipios"("name");

-- CreateIndex
CREATE UNIQUE INDEX "paises_name_key" ON "paises"("name");

-- CreateIndex
CREATE UNIQUE INDEX "personas_cedula_key" ON "personas"("cedula");

-- CreateIndex
CREATE UNIQUE INDEX "posts_slug_key" ON "posts"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "roles_name_key" ON "roles"("name");

-- CreateIndex
CREATE UNIQUE INDEX "sexos_name_key" ON "sexos"("name");

-- CreateIndex
CREATE UNIQUE INDEX "tipos_eventos_name_key" ON "tipos_eventos"("name");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "zonas_geograficas_name_key" ON "zonas_geograficas"("name");

-- AddForeignKey
ALTER TABLE "bajas" ADD CONSTRAINT "bajas_people_id_fkey" FOREIGN KEY ("people_id") REFERENCES "personas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bajas" ADD CONSTRAINT "bajas_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bajas" ADD CONSTRAINT "bajas_editor_id_fkey" FOREIGN KEY ("editor_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "barrios" ADD CONSTRAINT "barrios_municipio_id_fkey" FOREIGN KEY ("municipio_id") REFERENCES "municipios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "barrios" ADD CONSTRAINT "barrios_zona_geografica_id_fkey" FOREIGN KEY ("zona_geografica_id") REFERENCES "zonas_geograficas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "departamentos" ADD CONSTRAINT "departamentos_pais_id_fkey" FOREIGN KEY ("pais_id") REFERENCES "paises"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "eventos" ADD CONSTRAINT "eventos_iglesia_id_fkey" FOREIGN KEY ("iglesia_id") REFERENCES "iglesias"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "eventos" ADD CONSTRAINT "eventos_tipo_evento_id_fkey" FOREIGN KEY ("tipo_evento_id") REFERENCES "tipos_eventos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "eventos" ADD CONSTRAINT "eventos_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "eventos" ADD CONSTRAINT "eventos_user_edit_id_fkey" FOREIGN KEY ("user_edit_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "eventos" ADD CONSTRAINT "eventos_iglesiaId_fkey" FOREIGN KEY ("iglesiaId") REFERENCES "iglesias"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "eventos" ADD CONSTRAINT "eventos_tipoEventoId_fkey" FOREIGN KEY ("tipoEventoId") REFERENCES "tipos_eventos"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "eventos_has_asistencias" ADD CONSTRAINT "eventos_has_asistencias_evento_id_fkey" FOREIGN KEY ("evento_id") REFERENCES "eventos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "eventos_has_asistencias" ADD CONSTRAINT "eventos_has_asistencias_people_id_fkey" FOREIGN KEY ("people_id") REFERENCES "personas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "membresias" ADD CONSTRAINT "membresias_people_id_fkey" FOREIGN KEY ("people_id") REFERENCES "personas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "membresias" ADD CONSTRAINT "membresias_tipo_id_fkey" FOREIGN KEY ("tipo_id") REFERENCES "tipos_membresias"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "municipios" ADD CONSTRAINT "municipios_departamento_id_fkey" FOREIGN KEY ("departamento_id") REFERENCES "departamentos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "personas" ADD CONSTRAINT "personas_barrio_id_fkey" FOREIGN KEY ("barrio_id") REFERENCES "barrios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "personas" ADD CONSTRAINT "personas_estado_civil_id_fkey" FOREIGN KEY ("estado_civil_id") REFERENCES "estados_civiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "personas" ADD CONSTRAINT "personas_sexo_id_fkey" FOREIGN KEY ("sexo_id") REFERENCES "sexos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "personas" ADD CONSTRAINT "personas_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "personas" ADD CONSTRAINT "personas_editor_id_fkey" FOREIGN KEY ("editor_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "posts" ADD CONSTRAINT "posts_categoria_id_fkey" FOREIGN KEY ("categoria_id") REFERENCES "categorias"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "posts" ADD CONSTRAINT "posts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "posts" ADD CONSTRAINT "posts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "posts_has_images" ADD CONSTRAINT "posts_has_images_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "posts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_iglesia_id_fkey" FOREIGN KEY ("iglesia_id") REFERENCES "iglesias"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users_has_church" ADD CONSTRAINT "users_has_church_iglesia_id_fkey" FOREIGN KEY ("iglesia_id") REFERENCES "iglesias"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users_has_church" ADD CONSTRAINT "users_has_church_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users_has_roles" ADD CONSTRAINT "users_has_roles_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users_has_roles" ADD CONSTRAINT "users_has_roles_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
