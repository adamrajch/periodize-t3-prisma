/*
  Warnings:

  - Added the required column `programId` to the `ActiveProgram` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ActiveProgram" ADD COLUMN     "programId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "ActiveProgram" ADD CONSTRAINT "ActiveProgram_programId_fkey" FOREIGN KEY ("programId") REFERENCES "Program"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
