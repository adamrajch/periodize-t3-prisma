/*
  Warnings:

  - You are about to drop the `CategoriesOnLifts` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Lift` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `LiftCategory` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `LiftsOnUsers` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "CategoriesOnLifts" DROP CONSTRAINT "CategoriesOnLifts_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "CategoriesOnLifts" DROP CONSTRAINT "CategoriesOnLifts_liftId_fkey";

-- DropForeignKey
ALTER TABLE "LiftsOnUsers" DROP CONSTRAINT "LiftsOnUsers_liftId_fkey";

-- DropForeignKey
ALTER TABLE "LiftsOnUsers" DROP CONSTRAINT "LiftsOnUsers_userId_fkey";

-- DropTable
DROP TABLE "CategoriesOnLifts";

-- DropTable
DROP TABLE "Lift";

-- DropTable
DROP TABLE "LiftCategory";

-- DropTable
DROP TABLE "LiftsOnUsers";

-- CreateTable
CREATE TABLE "Program" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,

    CONSTRAINT "Program_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Program_name_key" ON "Program"("name");

-- AddForeignKey
ALTER TABLE "Program" ADD CONSTRAINT "Program_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
