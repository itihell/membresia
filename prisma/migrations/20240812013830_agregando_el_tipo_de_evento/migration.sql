/*
  Warnings:

  - Added the required column `tipo_evento_id` to the `eventos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "eventos" ADD COLUMN     "tipo_evento_id" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "tipos_evento" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "tipos_evento_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "tipos_evento_name_key" ON "tipos_evento"("name");

-- AddForeignKey
ALTER TABLE "eventos" ADD CONSTRAINT "eventos_tipo_evento_id_fkey" FOREIGN KEY ("tipo_evento_id") REFERENCES "tipos_evento"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
