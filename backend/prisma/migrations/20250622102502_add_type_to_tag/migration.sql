-- CreateEnum
CREATE TYPE "TagType" AS ENUM ('PRODUCT', 'BLOG');

-- AlterTable
ALTER TABLE "Tag" ADD COLUMN     "type" "TagType" NOT NULL DEFAULT 'PRODUCT';
