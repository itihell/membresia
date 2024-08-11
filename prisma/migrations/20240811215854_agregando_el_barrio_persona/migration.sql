/*
  Warnings:

  - You are about to drop the column `estado_id` on the `personas` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "personas" DROP CONSTRAINT "personas_estado_id_fkey";

-- AlterTable
ALTER TABLE "personas" DROP COLUMN "estado_id";
