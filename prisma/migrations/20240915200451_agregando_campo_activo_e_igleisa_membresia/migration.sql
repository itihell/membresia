/*
  Warnings:

  - Added the required column `activo` to the `membresias` table without a default value. This is not possible if the table is not empty.
  - Added the required column `iglesia_id` to the `membresias` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `membresias` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "membresias" ADD COLUMN     "activo" BOOLEAN NOT NULL,
ADD COLUMN     "iglesia_id" TEXT NOT NULL,
ADD COLUMN     "user_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "membresias" ADD CONSTRAINT "membresias_iglesia_id_fkey" FOREIGN KEY ("iglesia_id") REFERENCES "iglesias"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "membresias" ADD CONSTRAINT "membresias_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
