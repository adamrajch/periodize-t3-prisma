/*
  Warnings:

  - Added the required column `programSchema` to the `ActiveProgram` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ActiveProgram" ADD COLUMN     "programSchema" JSONB NOT NULL;
