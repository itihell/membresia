/*
  Warnings:

  - Added the required column `parentesco_id` to the `familias_has_personas` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "familias" ADD COLUMN     "parentescoId" INTEGER;

-- AlterTable
ALTER TABLE "familias_has_personas" ADD COLUMN     "parentesco_id" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "parentescos" (
    "id" SERIAL NOT NULL,
    "parentesco" VARCHAR(60) NOT NULL,

    CONSTRAINT "parentescos_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "parentescos_parentesco_key" ON "parentescos"("parentesco");

-- AddForeignKey
ALTER TABLE "familias_has_personas" ADD CONSTRAINT "familias_has_personas_parentesco_id_fkey" FOREIGN KEY ("parentesco_id") REFERENCES "parentescos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
