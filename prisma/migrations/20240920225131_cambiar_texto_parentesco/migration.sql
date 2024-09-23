/*
  Warnings:

  - A unique constraint covering the columns `[persona_id]` on the table `familias_has_personas` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "familias_has_personas_persona_id_key" ON "familias_has_personas"("persona_id");
