/*
  Warnings:

  - You are about to drop the column `church_id` on the `users` table. All the data in the column will be lost.
  - You are about to drop the `iglesia` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `iglesia_id` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "eventos" DROP CONSTRAINT "eventos_iglesia_id_fkey";

-- DropForeignKey
ALTER TABLE "users_has_church" DROP CONSTRAINT "users_has_church_iglesia_id_fkey";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "church_id",
ADD COLUMN     "iglesia_id" TEXT NOT NULL;

-- DropTable
DROP TABLE "iglesia";

-- CreateTable
CREATE TABLE "iglesias" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "iglesias_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_iglesia_id_fkey" FOREIGN KEY ("iglesia_id") REFERENCES "iglesias"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users_has_church" ADD CONSTRAINT "users_has_church_iglesia_id_fkey" FOREIGN KEY ("iglesia_id") REFERENCES "iglesias"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "eventos" ADD CONSTRAINT "eventos_iglesia_id_fkey" FOREIGN KEY ("iglesia_id") REFERENCES "iglesias"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
