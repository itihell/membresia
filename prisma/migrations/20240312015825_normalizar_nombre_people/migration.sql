/*
  Warnings:

  - You are about to drop the column `name` on the `People` table. All the data in the column will be lost.
  - Added the required column `apellidos` to the `People` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nombres` to the `People` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "People" DROP COLUMN "name",
ADD COLUMN     "apellidos" TEXT NOT NULL,
ADD COLUMN     "nombres" TEXT NOT NULL;
