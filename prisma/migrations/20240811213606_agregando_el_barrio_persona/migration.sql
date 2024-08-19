/*
  Warnings:

  - Added the required column `barrio_id` to the `personas` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "personas" ADD COLUMN     "barrio_id" INTEGER NOT NULL,
ADD COLUMN     "estado_id" INTEGER DEFAULT 1;

-- CreateTable
CREATE TABLE "estados" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "estados_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "paises" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "paises_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "departamentos" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "pais_id" INTEGER NOT NULL,

    CONSTRAINT "departamentos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "municipios" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "departamento_id" INTEGER NOT NULL,

    CONSTRAINT "municipios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "zonas_geograficas" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "zonas_geograficas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "barrios" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "municipio_id" INTEGER NOT NULL,
    "zona_geografica_id" INTEGER NOT NULL,

    CONSTRAINT "barrios_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "estados_name_key" ON "estados"("name");

-- CreateIndex
CREATE UNIQUE INDEX "paises_name_key" ON "paises"("name");

-- CreateIndex
CREATE UNIQUE INDEX "departamentos_name_key" ON "departamentos"("name");

-- CreateIndex
CREATE UNIQUE INDEX "municipios_name_key" ON "municipios"("name");

-- CreateIndex
CREATE UNIQUE INDEX "zonas_geograficas_name_key" ON "zonas_geograficas"("name");

-- CreateIndex
CREATE UNIQUE INDEX "barrios_name_key" ON "barrios"("name");

-- AddForeignKey
ALTER TABLE "departamentos" ADD CONSTRAINT "departamentos_pais_id_fkey" FOREIGN KEY ("pais_id") REFERENCES "paises"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "municipios" ADD CONSTRAINT "municipios_departamento_id_fkey" FOREIGN KEY ("departamento_id") REFERENCES "departamentos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "barrios" ADD CONSTRAINT "barrios_municipio_id_fkey" FOREIGN KEY ("municipio_id") REFERENCES "municipios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "barrios" ADD CONSTRAINT "barrios_zona_geografica_id_fkey" FOREIGN KEY ("zona_geografica_id") REFERENCES "zonas_geograficas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "personas" ADD CONSTRAINT "personas_estado_id_fkey" FOREIGN KEY ("estado_id") REFERENCES "estados"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "personas" ADD CONSTRAINT "personas_barrio_id_fkey" FOREIGN KEY ("barrio_id") REFERENCES "barrios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
