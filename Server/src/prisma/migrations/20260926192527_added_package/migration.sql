-- CreateTable
CREATE TABLE "packages" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(150) NOT NULL,
    "price" INTEGER NOT NULL,
    "offer_price" INTEGER NOT NULL DEFAULT 0,
    "preparation" TEXT,
    "is_popular" BOOLEAN NOT NULL DEFAULT false,
    "category" "Category" NOT NULL,
    "relevance" TEXT[],
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "packages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "package_items" (
    "id" SERIAL NOT NULL,
    "package_id" INTEGER NOT NULL,
    "test_id" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "package_items_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "packages_name_key" ON "packages"("name");

-- CreateIndex
CREATE INDEX "package_items_test_id_idx" ON "package_items"("test_id");

-- CreateIndex
CREATE UNIQUE INDEX "package_items_package_id_test_id_key" ON "package_items"("package_id", "test_id");

-- AddForeignKey
ALTER TABLE "package_items" ADD CONSTRAINT "package_items_package_id_fkey" FOREIGN KEY ("package_id") REFERENCES "packages"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "package_items" ADD CONSTRAINT "package_items_test_id_fkey" FOREIGN KEY ("test_id") REFERENCES "tests"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
