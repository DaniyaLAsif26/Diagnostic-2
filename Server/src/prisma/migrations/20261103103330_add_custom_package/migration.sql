-- CreateEnum
CREATE TYPE "CustomPackageStatus" AS ENUM ('PENDING', 'COMPLETED', 'CANCELLED');

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "phone" VARCHAR(10) NOT NULL,
    "email" VARCHAR(60) NOT NULL,
    "password" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "custom_packages" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "price" INTEGER NOT NULL,
    "coupon_code" TEXT,
    "status" "CustomPackageStatus" NOT NULL DEFAULT 'PENDING',
    "user_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "custom_packages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "custom_package_items" (
    "id" SERIAL NOT NULL,
    "price" INTEGER NOT NULL,
    "test_name" VARCHAR(100) NOT NULL,
    "test_id" INTEGER NOT NULL,
    "custom_package_id" INTEGER NOT NULL,

    CONSTRAINT "custom_package_items_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_phone_key" ON "users"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE INDEX "custom_packages_user_id_idx" ON "custom_packages"("user_id");

-- CreateIndex
CREATE INDEX "custom_packages_status_idx" ON "custom_packages"("status");

-- CreateIndex
CREATE INDEX "custom_package_items_test_id_idx" ON "custom_package_items"("test_id");

-- CreateIndex
CREATE UNIQUE INDEX "custom_package_items_custom_package_id_test_id_key" ON "custom_package_items"("custom_package_id", "test_id");

-- AddForeignKey
ALTER TABLE "custom_packages" ADD CONSTRAINT "custom_packages_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "custom_package_items" ADD CONSTRAINT "custom_package_items_custom_package_id_fkey" FOREIGN KEY ("custom_package_id") REFERENCES "custom_packages"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "custom_package_items" ADD CONSTRAINT "custom_package_items_test_id_fkey" FOREIGN KEY ("test_id") REFERENCES "tests"("id") ON DELETE CASCADE ON UPDATE CASCADE;
