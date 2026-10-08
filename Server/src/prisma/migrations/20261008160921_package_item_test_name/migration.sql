-- AlterTable
ALTER TABLE "package_items" ADD COLUMN     "test_name" VARCHAR(150);

-- CreateIndex
CREATE UNIQUE INDEX "package_items_package_id_test_name_key" ON "package_items"("package_id", "test_name");

