-- CreateTable
CREATE TABLE "Lift" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "default" BOOLEAN NOT NULL,

    CONSTRAINT "Lift_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LiftCategory" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "LiftCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CategoriesOnLifts" (
    "liftId" TEXT NOT NULL,
    "categoryId" INTEGER NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "assignedBy" TEXT NOT NULL,

    CONSTRAINT "CategoriesOnLifts_pkey" PRIMARY KEY ("liftId","categoryId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Lift_name_key" ON "Lift"("name");

-- AddForeignKey
ALTER TABLE "Lift" ADD CONSTRAINT "Lift_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CategoriesOnLifts" ADD CONSTRAINT "CategoriesOnLifts_liftId_fkey" FOREIGN KEY ("liftId") REFERENCES "Lift"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CategoriesOnLifts" ADD CONSTRAINT "CategoriesOnLifts_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "LiftCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
