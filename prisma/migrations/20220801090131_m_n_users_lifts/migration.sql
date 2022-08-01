/*
  Warnings:

  - You are about to drop the column `userId` on the `Lift` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Lift" DROP CONSTRAINT "Lift_userId_fkey";

-- AlterTable
ALTER TABLE "Lift" DROP COLUMN "userId";

-- CreateTable
CREATE TABLE "LiftsOnUsers" (
    "liftId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "assignedBy" TEXT NOT NULL,

    CONSTRAINT "LiftsOnUsers_pkey" PRIMARY KEY ("liftId","userId")
);

-- AddForeignKey
ALTER TABLE "LiftsOnUsers" ADD CONSTRAINT "LiftsOnUsers_liftId_fkey" FOREIGN KEY ("liftId") REFERENCES "Lift"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LiftsOnUsers" ADD CONSTRAINT "LiftsOnUsers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
