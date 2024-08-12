/*
  Warnings:

  - You are about to drop the `user_has_role` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "user_has_role" DROP CONSTRAINT "user_has_role_role_id_fkey";

-- DropForeignKey
ALTER TABLE "user_has_role" DROP CONSTRAINT "user_has_role_user_id_fkey";

-- DropTable
DROP TABLE "user_has_role";

-- CreateTable
CREATE TABLE "users_has_role" (
    "user_id" TEXT NOT NULL,
    "role_id" INTEGER NOT NULL,

    CONSTRAINT "users_has_role_pkey" PRIMARY KEY ("user_id","role_id")
);

-- AddForeignKey
ALTER TABLE "users_has_role" ADD CONSTRAINT "users_has_role_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users_has_role" ADD CONSTRAINT "users_has_role_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
