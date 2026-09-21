-- CreateEnum
CREATE TYPE "Category" AS ENUM ('LABORATORY', 'RADIOLOGY');

-- CreateTable
CREATE TABLE "Test" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "price" INTEGER NOT NULL,
    "category" "Category" NOT NULL,
    "relevance" TEXT[],
    "preparation" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Test_pkey" PRIMARY KEY ("id")
);
