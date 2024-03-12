-- AlterTable
ALTER TABLE "People" ADD COLUMN     "email" TEXT,
ALTER COLUMN "fecha_fe" DROP NOT NULL,
ALTER COLUMN "fecha_bautizo" DROP NOT NULL,
ALTER COLUMN "telefono" DROP NOT NULL;
