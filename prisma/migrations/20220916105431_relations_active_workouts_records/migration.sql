/*
  Warnings:

  - You are about to drop the column `programId` on the `Workout` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Workout" DROP CONSTRAINT "Workout_programId_fkey";

-- AlterTable
ALTER TABLE "Workout" DROP COLUMN "programId";

-- CreateTable
CREATE TABLE "WorkoutsOnPrograms" (
    "programId" TEXT NOT NULL,
    "workoutId" TEXT NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "WorkoutsOnPrograms_pkey" PRIMARY KEY ("programId","workoutId")
);

-- CreateTable
CREATE TABLE "Record" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "sets" INTEGER NOT NULL,
    "reps" INTEGER NOT NULL,
    "rpe" INTEGER,
    "percentage" INTEGER,
    "time" INTEGER,
    "weight" JSONB,
    "distance" JSONB,
    "userId" TEXT NOT NULL,
    "workoutId" TEXT NOT NULL,

    CONSTRAINT "Record_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RecordsOnPrograms" (
    "programId" TEXT NOT NULL,
    "recordId" TEXT NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RecordsOnPrograms_pkey" PRIMARY KEY ("programId","recordId")
);

-- AddForeignKey
ALTER TABLE "WorkoutsOnPrograms" ADD CONSTRAINT "WorkoutsOnPrograms_programId_fkey" FOREIGN KEY ("programId") REFERENCES "ActiveProgram"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkoutsOnPrograms" ADD CONSTRAINT "WorkoutsOnPrograms_workoutId_fkey" FOREIGN KEY ("workoutId") REFERENCES "Workout"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Record" ADD CONSTRAINT "Record_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Record" ADD CONSTRAINT "Record_workoutId_fkey" FOREIGN KEY ("workoutId") REFERENCES "Workout"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecordsOnPrograms" ADD CONSTRAINT "RecordsOnPrograms_programId_fkey" FOREIGN KEY ("programId") REFERENCES "ActiveProgram"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecordsOnPrograms" ADD CONSTRAINT "RecordsOnPrograms_recordId_fkey" FOREIGN KEY ("recordId") REFERENCES "Record"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
