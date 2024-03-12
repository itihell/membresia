/*
  Warnings:

  - Added the required column `estado_civilId` to the `People` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "People" ADD COLUMN     "estado_civilId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "EstadoCivil" (
    "id" SERIAL NOT NULL,
    "estado_civil" TEXT NOT NULL,

    CONSTRAINT "EstadoCivil_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "EstadoCivil_estado_civil_key" ON "EstadoCivil"("estado_civil");

-- AddForeignKey
ALTER TABLE "People" ADD CONSTRAINT "People_estado_civilId_fkey" FOREIGN KEY ("estado_civilId") REFERENCES "EstadoCivil"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
