/*
  Warnings:

  - You are about to drop the column `seoMetaType` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `targetId` on the `SeoMeta` table. All the data in the column will be lost.
  - You are about to drop the column `targetType` on the `SeoMeta` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[productId]` on the table `SeoMeta` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "ProductVariant" DROP CONSTRAINT "ProductVariant_id_seoMetaType_fkey";

-- DropForeignKey
ALTER TABLE "SeoMeta" DROP CONSTRAINT "SeoMeta_targetId_targetType_fkey";

-- DropIndex
DROP INDEX "Product_id_seoMetaType_key";

-- DropIndex
DROP INDEX "SeoMeta_targetId_targetType_idx";

-- DropIndex
DROP INDEX "SeoMeta_targetId_targetType_key";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "seoMetaType";

-- AlterTable
ALTER TABLE "SeoMeta" DROP COLUMN "targetId",
DROP COLUMN "targetType",
ADD COLUMN     "productId" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "SeoMeta_productId_key" ON "SeoMeta"("productId");

-- AddForeignKey
ALTER TABLE "SeoMeta" ADD CONSTRAINT "SeoMeta_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
