-- CreateTable
CREATE TABLE "Exercise" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "category" TEXT,
    "load" BOOLEAN,
    "distance" BOOLEAN,
    "time" BOOLEAN,

    CONSTRAINT "Exercise_pkey" PRIMARY KEY ("id")
);
