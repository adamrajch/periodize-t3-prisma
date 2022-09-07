/*
  Warnings:

  - You are about to drop the column `nextWorkoout` on the `ActiveProgram` table. All the data in the column will be lost.
  - Added the required column `name` to the `ActiveProgram` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ActiveProgram" DROP COLUMN "nextWorkoout",
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "nextWorkout" JSONB,
ADD COLUMN     "summary" TEXT;
