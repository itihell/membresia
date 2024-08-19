/*
  Warnings:

  - You are about to drop the `post_has_image` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "post_has_image" DROP CONSTRAINT "post_has_image_post_id_fkey";

-- DropTable
DROP TABLE "post_has_image";

-- CreateTable
CREATE TABLE "posts_has_image" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "post_id" TEXT NOT NULL,

    CONSTRAINT "posts_has_image_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "posts_has_image" ADD CONSTRAINT "posts_has_image_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "posts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
