/*
  Warnings:

  - Made the column `schema` on table `Program` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Program" ALTER COLUMN "schema" SET NOT NULL;
