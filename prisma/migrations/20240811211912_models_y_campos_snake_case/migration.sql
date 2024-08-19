/*
  Warnings:

  - You are about to drop the `peoples` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "bajas" DROP CONSTRAINT "bajas_people_id_fkey";

-- DropForeignKey
ALTER TABLE "eventos_has_asistencia" DROP CONSTRAINT "eventos_has_asistencia_people_id_fkey";

-- DropForeignKey
ALTER TABLE "membresias" DROP CONSTRAINT "membresias_people_id_fkey";

-- DropForeignKey
ALTER TABLE "peoples" DROP CONSTRAINT "peoples_editor_id_fkey";

-- DropForeignKey
ALTER TABLE "peoples" DROP CONSTRAINT "peoples_estado_civil_id_fkey";

-- DropForeignKey
ALTER TABLE "peoples" DROP CONSTRAINT "peoples_sexo_id_fkey";

-- DropForeignKey
ALTER TABLE "peoples" DROP CONSTRAINT "peoples_user_id_fkey";

-- DropTable
DROP TABLE "peoples";

-- CreateTable
CREATE TABLE "personas" (
    "id" TEXT NOT NULL,
    "nombres" TEXT NOT NULL,
    "apellidos" TEXT NOT NULL,
    "cedula" TEXT NOT NULL,
    "fecha_nacimiento" TIMESTAMP(3) NOT NULL,
    "fecha_fe" TIMESTAMP(3),
    "fecha_bautizo" TIMESTAMP(3),
    "sexo_id" INTEGER NOT NULL,
    "direccion" TEXT NOT NULL,
    "telefono" TEXT,
    "user_id" TEXT NOT NULL,
    "editor_id" TEXT,
    "estado_civil_id" INTEGER NOT NULL,
    "email" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "personas_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "personas_cedula_key" ON "personas"("cedula");

-- AddForeignKey
ALTER TABLE "personas" ADD CONSTRAINT "personas_sexo_id_fkey" FOREIGN KEY ("sexo_id") REFERENCES "sexos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "personas" ADD CONSTRAINT "personas_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "personas" ADD CONSTRAINT "personas_editor_id_fkey" FOREIGN KEY ("editor_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "personas" ADD CONSTRAINT "personas_estado_civil_id_fkey" FOREIGN KEY ("estado_civil_id") REFERENCES "estados_civil"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "membresias" ADD CONSTRAINT "membresias_people_id_fkey" FOREIGN KEY ("people_id") REFERENCES "personas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bajas" ADD CONSTRAINT "bajas_people_id_fkey" FOREIGN KEY ("people_id") REFERENCES "personas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "eventos_has_asistencia" ADD CONSTRAINT "eventos_has_asistencia_people_id_fkey" FOREIGN KEY ("people_id") REFERENCES "personas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
