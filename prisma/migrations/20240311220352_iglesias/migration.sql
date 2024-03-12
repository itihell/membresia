-- AlterTable
ALTER TABLE "User" ADD COLUMN     "churchId" TEXT;

-- CreateTable
CREATE TABLE "Church" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "Church_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserHasChurch" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "churchId" TEXT NOT NULL,

    CONSTRAINT "UserHasChurch_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UserHasChurch" ADD CONSTRAINT "UserHasChurch_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserHasChurch" ADD CONSTRAINT "UserHasChurch_churchId_fkey" FOREIGN KEY ("churchId") REFERENCES "Church"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
