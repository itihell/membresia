-- AlterTable
ALTER TABLE "personas" ADD COLUMN     "iglesia_id" TEXT;

-- AddForeignKey
ALTER TABLE "personas" ADD CONSTRAINT "personas_iglesia_id_fkey" FOREIGN KEY ("iglesia_id") REFERENCES "iglesias"("id") ON DELETE SET NULL ON UPDATE CASCADE;
