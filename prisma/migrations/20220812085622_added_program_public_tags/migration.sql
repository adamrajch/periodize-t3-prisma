-- AlterTable
ALTER TABLE "Program" ADD COLUMN     "isPublic" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "tags" TEXT[];
