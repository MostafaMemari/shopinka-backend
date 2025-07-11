/*
  Warnings:

  - You are about to drop the column `blogId` on the `Category` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[shippingId]` on the table `Cart` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[slug]` on the table `Tag` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `shippingId` to the `Cart` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "BlogStatus" AS ENUM ('DRAFT', 'PUBLISHED');

-- AlterTable
ALTER TABLE "Blog" ADD COLUMN     "status" "BlogStatus" NOT NULL DEFAULT 'PUBLISHED';

-- AlterTable
ALTER TABLE "Cart" ADD COLUMN     "shippingId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Category" DROP COLUMN "blogId";

-- AlterTable
ALTER TABLE "Comment" ALTER COLUMN "productId" DROP NOT NULL,
ALTER COLUMN "blogId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "SeoMeta" ALTER COLUMN "productId" DROP NOT NULL,
ALTER COLUMN "blogId" DROP NOT NULL,
ALTER COLUMN "tagId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Tag" ALTER COLUMN "description" DROP NOT NULL,
ALTER COLUMN "thumbnailImage" DROP NOT NULL;

-- CreateTable
CREATE TABLE "Shipping" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "estimatedDays" INTEGER,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Shipping_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Cart_shippingId_key" ON "Cart"("shippingId");

-- CreateIndex
CREATE UNIQUE INDEX "Tag_slug_key" ON "Tag"("slug");

-- AddForeignKey
ALTER TABLE "Cart" ADD CONSTRAINT "Cart_shippingId_fkey" FOREIGN KEY ("shippingId") REFERENCES "Shipping"("id") ON DELETE SET DEFAULT ON UPDATE CASCADE;
