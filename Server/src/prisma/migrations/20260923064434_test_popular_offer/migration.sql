-- AlterTable
ALTER TABLE "tests" ADD COLUMN     "is_popular" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "offer_price" INTEGER NOT NULL DEFAULT 0;
