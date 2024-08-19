/*
  Warnings:

  - Made the column `estado_id` on table `personas` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "personas" DROP CONSTRAINT "personas_estado_id_fkey";

-- AlterTable
ALTER TABLE "personas" ALTER COLUMN "estado_id" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "personas" ADD CONSTRAINT "personas_estado_id_fkey" FOREIGN KEY ("estado_id") REFERENCES "estados"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
