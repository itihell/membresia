/*
  Warnings:

  - Made the column `iglesia_id` on table `personas` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "personas" DROP CONSTRAINT "personas_iglesia_id_fkey";

-- AlterTable
ALTER TABLE "personas" ALTER COLUMN "iglesia_id" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "personas" ADD CONSTRAINT "personas_iglesia_id_fkey" FOREIGN KEY ("iglesia_id") REFERENCES "iglesias"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
