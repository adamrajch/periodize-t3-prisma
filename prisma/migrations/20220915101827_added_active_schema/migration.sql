/*
  Warnings:

  - Added the required column `numberOfDays` to the `ActiveProgram` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ActiveProgram" ADD COLUMN     "currentDayIndex" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "numberOfDays" INTEGER NOT NULL,
ADD COLUMN     "timesCompleted" INTEGER NOT NULL DEFAULT 0;
