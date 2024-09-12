/*
  Warnings:

  - A unique constraint covering the columns `[familia_id,persona_id]` on the table `familias_has_personas` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `user_id` to the `familias_has_personas` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "familias_has_personas" ADD COLUMN     "user_id" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "familias_has_personas_familia_id_persona_id_key" ON "familias_has_personas"("familia_id", "persona_id");

-- AddForeignKey
ALTER TABLE "familias_has_personas" ADD CONSTRAINT "familias_has_personas_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
