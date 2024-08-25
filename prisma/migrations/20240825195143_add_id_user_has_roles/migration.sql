/*
  Warnings:

  - The primary key for the `users_has_roles` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "users_has_roles" DROP CONSTRAINT "users_has_roles_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "users_has_roles_pkey" PRIMARY KEY ("id");
