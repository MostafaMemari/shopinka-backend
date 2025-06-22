-- CreateEnum
CREATE TYPE "CategoryType" AS ENUM ('PRODUCT', 'BLOG');

-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "type" "CategoryType" NOT NULL DEFAULT 'PRODUCT';
