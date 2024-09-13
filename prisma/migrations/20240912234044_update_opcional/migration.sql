/*
  Warnings:

  - You are about to drop the column `people_id` on the `membresias` table. All the data in the column will be lost.
  - Added the required column `persona_id` to the `membresias` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "membresias" DROP CONSTRAINT "membresias_people_id_fkey";

-- AlterTable
ALTER TABLE "membresias" DROP COLUMN "people_id",
ADD COLUMN     "persona_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "membresias" ADD CONSTRAINT "membresias_persona_id_fkey" FOREIGN KEY ("persona_id") REFERENCES "personas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
