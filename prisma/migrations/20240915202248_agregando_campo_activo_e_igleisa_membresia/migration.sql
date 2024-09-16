/*
  Warnings:

  - Made the column `iglesia_id` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_iglesia_id_fkey";

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "iglesia_id" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_iglesia_id_fkey" FOREIGN KEY ("iglesia_id") REFERENCES "iglesias"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
