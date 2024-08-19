/*
  Warnings:

  - You are about to drop the column `editorId` on the `bajas` table. All the data in the column will be lost.
  - You are about to drop the column `peopleId` on the `bajas` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `bajas` table. All the data in the column will be lost.
  - You are about to drop the column `churchId` on the `eventos` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `eventos` table. All the data in the column will be lost.
  - You are about to drop the column `deletedAt` on the `eventos` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `eventos` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `eventos` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `eventos_has_asistencia` table. All the data in the column will be lost.
  - You are about to drop the column `deletedAt` on the `eventos_has_asistencia` table. All the data in the column will be lost.
  - You are about to drop the column `eventoId` on the `eventos_has_asistencia` table. All the data in the column will be lost.
  - You are about to drop the column `peopleId` on the `eventos_has_asistencia` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `eventos_has_asistencia` table. All the data in the column will be lost.
  - You are about to drop the column `postId` on the `post_has_image` table. All the data in the column will be lost.
  - The primary key for the `user_has_role` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `roleId` on the `user_has_role` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `user_has_role` table. All the data in the column will be lost.
  - You are about to drop the `category` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `church` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `estado_civil` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `membresia` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `people` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `post` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `role` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tipo_membresia` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user_has_church` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `people_id` to the `bajas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `bajas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `church_id` to the `eventos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `eventos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `eventos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `evento_id` to the `eventos_has_asistencia` table without a default value. This is not possible if the table is not empty.
  - Added the required column `people_id` to the `eventos_has_asistencia` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `eventos_has_asistencia` table without a default value. This is not possible if the table is not empty.
  - Added the required column `post_id` to the `post_has_image` table without a default value. This is not possible if the table is not empty.
  - Added the required column `role_id` to the `user_has_role` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `user_has_role` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "bajas" DROP CONSTRAINT "bajas_editorId_fkey";

-- DropForeignKey
ALTER TABLE "bajas" DROP CONSTRAINT "bajas_peopleId_fkey";

-- DropForeignKey
ALTER TABLE "bajas" DROP CONSTRAINT "bajas_userId_fkey";

-- DropForeignKey
ALTER TABLE "eventos" DROP CONSTRAINT "eventos_churchId_fkey";

-- DropForeignKey
ALTER TABLE "eventos" DROP CONSTRAINT "eventos_userId_fkey";

-- DropForeignKey
ALTER TABLE "eventos_has_asistencia" DROP CONSTRAINT "eventos_has_asistencia_eventoId_fkey";

-- DropForeignKey
ALTER TABLE "eventos_has_asistencia" DROP CONSTRAINT "eventos_has_asistencia_peopleId_fkey";

-- DropForeignKey
ALTER TABLE "membresia" DROP CONSTRAINT "membresia_peopleId_fkey";

-- DropForeignKey
ALTER TABLE "membresia" DROP CONSTRAINT "membresia_tipoId_fkey";

-- DropForeignKey
ALTER TABLE "people" DROP CONSTRAINT "people_editorId_fkey";

-- DropForeignKey
ALTER TABLE "people" DROP CONSTRAINT "people_estado_civilId_fkey";

-- DropForeignKey
ALTER TABLE "people" DROP CONSTRAINT "people_sexoId_fkey";

-- DropForeignKey
ALTER TABLE "people" DROP CONSTRAINT "people_userId_fkey";

-- DropForeignKey
ALTER TABLE "post" DROP CONSTRAINT "post_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "post" DROP CONSTRAINT "post_userId_fkey";

-- DropForeignKey
ALTER TABLE "post_has_image" DROP CONSTRAINT "post_has_image_postId_fkey";

-- DropForeignKey
ALTER TABLE "user_has_church" DROP CONSTRAINT "user_has_church_churchId_fkey";

-- DropForeignKey
ALTER TABLE "user_has_church" DROP CONSTRAINT "user_has_church_userId_fkey";

-- DropForeignKey
ALTER TABLE "user_has_role" DROP CONSTRAINT "user_has_role_roleId_fkey";

-- DropForeignKey
ALTER TABLE "user_has_role" DROP CONSTRAINT "user_has_role_userId_fkey";

-- AlterTable
ALTER TABLE "bajas" DROP COLUMN "editorId",
DROP COLUMN "peopleId",
DROP COLUMN "userId",
ADD COLUMN     "editor_id" TEXT,
ADD COLUMN     "people_id" TEXT NOT NULL,
ADD COLUMN     "user_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "eventos" DROP COLUMN "churchId",
DROP COLUMN "createdAt",
DROP COLUMN "deletedAt",
DROP COLUMN "updatedAt",
DROP COLUMN "userId",
ADD COLUMN     "church_id" TEXT NOT NULL,
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "deleted_at" TIMESTAMP(3),
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "user_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "eventos_has_asistencia" DROP COLUMN "createdAt",
DROP COLUMN "deletedAt",
DROP COLUMN "eventoId",
DROP COLUMN "peopleId",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "deleted_at" TIMESTAMP(3),
ADD COLUMN     "evento_id" TEXT NOT NULL,
ADD COLUMN     "people_id" TEXT NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "post_has_image" DROP COLUMN "postId",
ADD COLUMN     "post_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "user_has_role" DROP CONSTRAINT "user_has_role_pkey",
DROP COLUMN "roleId",
DROP COLUMN "userId",
ADD COLUMN     "role_id" INTEGER NOT NULL,
ADD COLUMN     "user_id" TEXT NOT NULL,
ADD CONSTRAINT "user_has_role_pkey" PRIMARY KEY ("user_id", "role_id");

-- DropTable
DROP TABLE "category";

-- DropTable
DROP TABLE "church";

-- DropTable
DROP TABLE "estado_civil";

-- DropTable
DROP TABLE "membresia";

-- DropTable
DROP TABLE "people";

-- DropTable
DROP TABLE "post";

-- DropTable
DROP TABLE "role";

-- DropTable
DROP TABLE "tipo_membresia";

-- DropTable
DROP TABLE "user";

-- DropTable
DROP TABLE "user_has_church";

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "church_id" TEXT,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "roles" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "roles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "estados_civil" (
    "id" SERIAL NOT NULL,
    "estado_civil" TEXT NOT NULL,

    CONSTRAINT "estados_civil_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "peoples" (
    "id" TEXT NOT NULL,
    "nombres" TEXT NOT NULL,
    "apellidos" TEXT NOT NULL,
    "cedula" TEXT NOT NULL,
    "fecha_nacimiento" TIMESTAMP(3) NOT NULL,
    "fecha_fe" TIMESTAMP(3),
    "fecha_bautizo" TIMESTAMP(3),
    "sexo_id" INTEGER NOT NULL,
    "direccion" TEXT NOT NULL,
    "telefono" TEXT,
    "user_id" TEXT NOT NULL,
    "editor_id" TEXT,
    "estado_civil_id" INTEGER NOT NULL,
    "email" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "peoples_pkey" PRIMARY KEY ("id")
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
CREATE TABLE "tipos_membresia" (
    "id" SERIAL NOT NULL,
    "tipo_mebresia" TEXT NOT NULL,

    CONSTRAINT "tipos_membresia_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "churchs" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "churchs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users_has_church" (
    "id" SERIAL NOT NULL,
    "user_id" TEXT NOT NULL,
    "church_id" TEXT NOT NULL,

    CONSTRAINT "users_has_church_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "categorys" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "categorys_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "posts" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "user_id" TEXT NOT NULL,
    "category_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "posts_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "roles_name_key" ON "roles"("name");

-- CreateIndex
CREATE UNIQUE INDEX "estados_civil_estado_civil_key" ON "estados_civil"("estado_civil");

-- CreateIndex
CREATE UNIQUE INDEX "peoples_cedula_key" ON "peoples"("cedula");

-- CreateIndex
CREATE UNIQUE INDEX "categorys_name_key" ON "categorys"("name");

-- CreateIndex
CREATE UNIQUE INDEX "posts_slug_key" ON "posts"("slug");

-- AddForeignKey
ALTER TABLE "user_has_role" ADD CONSTRAINT "user_has_role_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_has_role" ADD CONSTRAINT "user_has_role_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "peoples" ADD CONSTRAINT "peoples_sexo_id_fkey" FOREIGN KEY ("sexo_id") REFERENCES "sexos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "peoples" ADD CONSTRAINT "peoples_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "peoples" ADD CONSTRAINT "peoples_editor_id_fkey" FOREIGN KEY ("editor_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "peoples" ADD CONSTRAINT "peoples_estado_civil_id_fkey" FOREIGN KEY ("estado_civil_id") REFERENCES "estados_civil"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "membresias" ADD CONSTRAINT "membresias_people_id_fkey" FOREIGN KEY ("people_id") REFERENCES "peoples"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "membresias" ADD CONSTRAINT "membresias_tipo_id_fkey" FOREIGN KEY ("tipo_id") REFERENCES "tipos_membresia"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bajas" ADD CONSTRAINT "bajas_people_id_fkey" FOREIGN KEY ("people_id") REFERENCES "peoples"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bajas" ADD CONSTRAINT "bajas_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bajas" ADD CONSTRAINT "bajas_editor_id_fkey" FOREIGN KEY ("editor_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users_has_church" ADD CONSTRAINT "users_has_church_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users_has_church" ADD CONSTRAINT "users_has_church_church_id_fkey" FOREIGN KEY ("church_id") REFERENCES "churchs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "posts" ADD CONSTRAINT "posts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "posts" ADD CONSTRAINT "posts_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categorys"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "eventos" ADD CONSTRAINT "eventos_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "eventos" ADD CONSTRAINT "eventos_church_id_fkey" FOREIGN KEY ("church_id") REFERENCES "churchs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "eventos_has_asistencia" ADD CONSTRAINT "eventos_has_asistencia_evento_id_fkey" FOREIGN KEY ("evento_id") REFERENCES "eventos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "eventos_has_asistencia" ADD CONSTRAINT "eventos_has_asistencia_people_id_fkey" FOREIGN KEY ("people_id") REFERENCES "peoples"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "post_has_image" ADD CONSTRAINT "post_has_image_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "posts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
