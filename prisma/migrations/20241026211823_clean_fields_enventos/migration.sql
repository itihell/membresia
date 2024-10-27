/*
  Warnings:

  - You are about to drop the column `iglesiaId` on the `eventos` table. All the data in the column will be lost.
  - You are about to drop the column `location` on the `eventos` table. All the data in the column will be lost.
  - You are about to drop the column `tipoEventoId` on the `eventos` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "eventos" DROP CONSTRAINT "eventos_iglesiaId_fkey";

-- DropForeignKey
ALTER TABLE "eventos" DROP CONSTRAINT "eventos_tipoEventoId_fkey";

-- AlterTable
ALTER TABLE "eventos" DROP COLUMN "iglesiaId",
DROP COLUMN "location",
DROP COLUMN "tipoEventoId";
