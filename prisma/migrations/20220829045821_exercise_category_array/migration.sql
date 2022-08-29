/*
  Warnings:

  - The `category` column on the `Exercise` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Made the column `load` on table `Exercise` required. This step will fail if there are existing NULL values in that column.
  - Made the column `distance` on table `Exercise` required. This step will fail if there are existing NULL values in that column.
  - Made the column `time` on table `Exercise` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Exercise" DROP COLUMN "category",
ADD COLUMN     "category" TEXT[],
ALTER COLUMN "load" SET NOT NULL,
ALTER COLUMN "distance" SET NOT NULL,
ALTER COLUMN "time" SET NOT NULL;
