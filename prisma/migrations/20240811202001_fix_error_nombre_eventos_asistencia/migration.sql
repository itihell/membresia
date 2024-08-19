/*
  Warnings:

  - You are about to drop the `evento_has_asistencia` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "evento_has_asistencia" DROP CONSTRAINT "evento_has_asistencia_eventoId_fkey";

-- DropForeignKey
ALTER TABLE "evento_has_asistencia" DROP CONSTRAINT "evento_has_asistencia_peopleId_fkey";

-- DropTable
DROP TABLE "evento_has_asistencia";

-- CreateTable
CREATE TABLE "eventos_has_asistencia" (
    "id" SERIAL NOT NULL,
    "eventoId" TEXT NOT NULL,
    "peopleId" TEXT NOT NULL,
    "asistio" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "eventos_has_asistencia_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "eventos_has_asistencia" ADD CONSTRAINT "eventos_has_asistencia_eventoId_fkey" FOREIGN KEY ("eventoId") REFERENCES "eventos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "eventos_has_asistencia" ADD CONSTRAINT "eventos_has_asistencia_peopleId_fkey" FOREIGN KEY ("peopleId") REFERENCES "people"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
