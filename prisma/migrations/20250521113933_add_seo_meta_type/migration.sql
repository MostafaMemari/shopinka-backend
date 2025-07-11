/*
  Warnings:

  - A unique constraint covering the columns `[id,seoMetaType]` on the table `Product` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[targetId,targetType]` on the table `SeoMeta` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "seoMetaType" "SeoMetaTargetType" NOT NULL DEFAULT 'product';

-- AlterTable
ALTER TABLE "ProductVariant" ADD COLUMN     "seoMetaType" "SeoMetaTargetType" NOT NULL DEFAULT 'product';

-- CreateIndex
CREATE UNIQUE INDEX "Product_id_seoMetaType_key" ON "Product"("id", "seoMetaType");

-- CreateIndex
CREATE INDEX "SeoMeta_targetId_targetType_idx" ON "SeoMeta"("targetId", "targetType");

-- CreateIndex
CREATE UNIQUE INDEX "SeoMeta_targetId_targetType_key" ON "SeoMeta"("targetId", "targetType");

-- AddForeignKey
ALTER TABLE "ProductVariant" ADD CONSTRAINT "ProductVariant_id_seoMetaType_fkey" FOREIGN KEY ("id", "seoMetaType") REFERENCES "SeoMeta"("targetId", "targetType") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SeoMeta" ADD CONSTRAINT "SeoMeta_targetId_targetType_fkey" FOREIGN KEY ("targetId", "targetType") REFERENCES "Product"("id", "seoMetaType") ON DELETE RESTRICT ON UPDATE CASCADE;
