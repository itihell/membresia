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

-- DropEnum
DROP TYPE "Gender";

-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "churchId" TEXT,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "role" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_has_role" (
    "userId" TEXT NOT NULL,
    "roleId" INTEGER NOT NULL,

    CONSTRAINT "user_has_role_pkey" PRIMARY KEY ("userId","roleId")
);

-- CreateTable
CREATE TABLE "sexos" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "sexos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "estado_civil" (
    "id" SERIAL NOT NULL,
    "estado_civil" TEXT NOT NULL,

    CONSTRAINT "estado_civil_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "people" (
    "id" TEXT NOT NULL,
    "nombres" TEXT NOT NULL,
    "apellidos" TEXT NOT NULL,
    "cedula" TEXT NOT NULL,
    "fecha_nacimiento" TIMESTAMP(3) NOT NULL,
    "fecha_fe" TIMESTAMP(3),
    "fecha_bautizo" TIMESTAMP(3),
    "sexoId" INTEGER NOT NULL,
    "direccion" TEXT NOT NULL,
    "telefono" TEXT,
    "userId" TEXT NOT NULL,
    "editorId" TEXT,
    "estado_civilId" INTEGER NOT NULL,
    "email" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "people_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "membresia" (
    "id" TEXT NOT NULL,
    "peopleId" TEXT NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL,
    "tipoId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "membresia_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tipo_membresia" (
    "id" SERIAL NOT NULL,
    "tipo_mebresia" TEXT NOT NULL,

    CONSTRAINT "tipo_membresia_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bajas" (
    "id" TEXT NOT NULL,
    "peopleId" TEXT NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL,
    "motivo" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "editorId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "bajas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "church" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "church_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_has_church" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "churchId" TEXT NOT NULL,

    CONSTRAINT "user_has_church_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "post" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "userId" TEXT NOT NULL,
    "categoryId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "eventos" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "date" TIMESTAMP(3) NOT NULL,
    "location" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "churchId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "eventos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "evento_has_asistencia" (
    "id" SERIAL NOT NULL,
    "eventoId" TEXT NOT NULL,
    "peopleId" TEXT NOT NULL,
    "asistio" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "evento_has_asistencia_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "post_has_image" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "postId" TEXT NOT NULL,

    CONSTRAINT "post_has_image_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "role_name_key" ON "role"("name");

-- CreateIndex
CREATE UNIQUE INDEX "sexos_name_key" ON "sexos"("name");

-- CreateIndex
CREATE UNIQUE INDEX "estado_civil_estado_civil_key" ON "estado_civil"("estado_civil");

-- CreateIndex
CREATE UNIQUE INDEX "people_cedula_key" ON "people"("cedula");

-- CreateIndex
CREATE UNIQUE INDEX "post_slug_key" ON "post"("slug");

-- AddForeignKey
ALTER TABLE "user_has_role" ADD CONSTRAINT "user_has_role_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_has_role" ADD CONSTRAINT "user_has_role_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "people" ADD CONSTRAINT "people_sexoId_fkey" FOREIGN KEY ("sexoId") REFERENCES "sexos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "people" ADD CONSTRAINT "people_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "people" ADD CONSTRAINT "people_editorId_fkey" FOREIGN KEY ("editorId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "people" ADD CONSTRAINT "people_estado_civilId_fkey" FOREIGN KEY ("estado_civilId") REFERENCES "estado_civil"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "membresia" ADD CONSTRAINT "membresia_peopleId_fkey" FOREIGN KEY ("peopleId") REFERENCES "people"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "membresia" ADD CONSTRAINT "membresia_tipoId_fkey" FOREIGN KEY ("tipoId") REFERENCES "tipo_membresia"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bajas" ADD CONSTRAINT "bajas_peopleId_fkey" FOREIGN KEY ("peopleId") REFERENCES "people"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bajas" ADD CONSTRAINT "bajas_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bajas" ADD CONSTRAINT "bajas_editorId_fkey" FOREIGN KEY ("editorId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_has_church" ADD CONSTRAINT "user_has_church_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_has_church" ADD CONSTRAINT "user_has_church_churchId_fkey" FOREIGN KEY ("churchId") REFERENCES "church"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "post" ADD CONSTRAINT "post_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "post" ADD CONSTRAINT "post_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "eventos" ADD CONSTRAINT "eventos_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "eventos" ADD CONSTRAINT "eventos_churchId_fkey" FOREIGN KEY ("churchId") REFERENCES "church"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "evento_has_asistencia" ADD CONSTRAINT "evento_has_asistencia_eventoId_fkey" FOREIGN KEY ("eventoId") REFERENCES "eventos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "evento_has_asistencia" ADD CONSTRAINT "evento_has_asistencia_peopleId_fkey" FOREIGN KEY ("peopleId") REFERENCES "people"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "post_has_image" ADD CONSTRAINT "post_has_image_postId_fkey" FOREIGN KEY ("postId") REFERENCES "post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
