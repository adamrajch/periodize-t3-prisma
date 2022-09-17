/*
  Warnings:

  - You are about to drop the `RecordsOnPrograms` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `WorkoutsOnPrograms` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "RecordsOnPrograms" DROP CONSTRAINT "RecordsOnPrograms_programId_fkey";

-- DropForeignKey
ALTER TABLE "RecordsOnPrograms" DROP CONSTRAINT "RecordsOnPrograms_recordId_fkey";

-- DropForeignKey
ALTER TABLE "WorkoutsOnPrograms" DROP CONSTRAINT "WorkoutsOnPrograms_programId_fkey";

-- DropForeignKey
ALTER TABLE "WorkoutsOnPrograms" DROP CONSTRAINT "WorkoutsOnPrograms_workoutId_fkey";

-- AlterTable
ALTER TABLE "Record" ADD COLUMN     "programId" TEXT;

-- AlterTable
ALTER TABLE "Workout" ADD COLUMN     "programId" TEXT;

-- DropTable
DROP TABLE "RecordsOnPrograms";

-- DropTable
DROP TABLE "WorkoutsOnPrograms";

-- AddForeignKey
ALTER TABLE "Workout" ADD CONSTRAINT "Workout_programId_fkey" FOREIGN KEY ("programId") REFERENCES "ActiveProgram"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Record" ADD CONSTRAINT "Record_programId_fkey" FOREIGN KEY ("programId") REFERENCES "ActiveProgram"("id") ON DELETE SET NULL ON UPDATE CASCADE;
