/*
  Warnings:

  - You are about to alter the column `name` on the `barrios` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(60)`.
  - You are about to alter the column `name` on the `departamentos` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(60)`.
  - You are about to drop the column `address` on the `iglesias` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `iglesias` table. All the data in the column will be lost.
  - You are about to alter the column `name` on the `iglesias` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(200)`.
  - You are about to alter the column `email` on the `iglesias` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(200)`.
  - You are about to alter the column `name` on the `municipios` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(60)`.
  - You are about to alter the column `name` on the `paises` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(60)`.
  - You are about to alter the column `nombres` on the `personas` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(60)`.
  - You are about to alter the column `apellidos` on the `personas` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(60)`.
  - You are about to alter the column `cedula` on the `personas` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(20)`.
  - You are about to alter the column `telefono` on the `personas` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(10)`.
  - You are about to alter the column `email` on the `personas` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.
  - You are about to alter the column `name` on the `roles` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(60)`.
  - You are about to alter the column `name` on the `tipos_evento` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(60)`.
  - You are about to alter the column `tipo_mebresia` on the `tipos_membresia` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(60)`.
  - You are about to alter the column `email` on the `users` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(200)`.
  - You are about to alter the column `name` on the `users` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.
  - You are about to alter the column `name` on the `zonas_geograficas` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(60)`.
  - Added the required column `direccion` to the `iglesias` table without a default value. This is not possible if the table is not empty.
  - Added the required column `telefonos` to the `iglesias` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "barrios" ALTER COLUMN "name" SET DATA TYPE VARCHAR(60);

-- AlterTable
ALTER TABLE "departamentos" ALTER COLUMN "name" SET DATA TYPE VARCHAR(60);

-- AlterTable
ALTER TABLE "iglesias" DROP COLUMN "address",
DROP COLUMN "phone",
ADD COLUMN     "direccion" TEXT NOT NULL,
ADD COLUMN     "telefonos" VARCHAR(100) NOT NULL,
ALTER COLUMN "name" SET DATA TYPE VARCHAR(200),
ALTER COLUMN "email" SET DATA TYPE VARCHAR(200);

-- AlterTable
ALTER TABLE "municipios" ALTER COLUMN "name" SET DATA TYPE VARCHAR(60);

-- AlterTable
ALTER TABLE "paises" ALTER COLUMN "name" SET DATA TYPE VARCHAR(60);

-- AlterTable
ALTER TABLE "personas" ALTER COLUMN "nombres" SET DATA TYPE VARCHAR(60),
ALTER COLUMN "apellidos" SET DATA TYPE VARCHAR(60),
ALTER COLUMN "cedula" SET DATA TYPE VARCHAR(20),
ALTER COLUMN "telefono" SET DATA TYPE VARCHAR(10),
ALTER COLUMN "email" SET DATA TYPE VARCHAR(100);

-- AlterTable
ALTER TABLE "roles" ALTER COLUMN "name" SET DATA TYPE VARCHAR(60);

-- AlterTable
ALTER TABLE "tipos_evento" ALTER COLUMN "name" SET DATA TYPE VARCHAR(60);

-- AlterTable
ALTER TABLE "tipos_membresia" ALTER COLUMN "tipo_mebresia" SET DATA TYPE VARCHAR(60);

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "email" SET DATA TYPE VARCHAR(200),
ALTER COLUMN "name" SET DATA TYPE VARCHAR(100);

-- AlterTable
ALTER TABLE "zonas_geograficas" ALTER COLUMN "name" SET DATA TYPE VARCHAR(60);
