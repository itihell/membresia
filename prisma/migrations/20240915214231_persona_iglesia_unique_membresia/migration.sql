/*
  Warnings:

  - A unique constraint covering the columns `[persona_id,iglesia_id]` on the table `membresias` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "membresias_persona_id_iglesia_id_key" ON "membresias"("persona_id", "iglesia_id");
