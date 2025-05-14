/*
  Warnings:

  - You are about to drop the `_AttributeToProductVariant` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "SeoMeta" DROP CONSTRAINT "SeoMeta_ogImageId_fkey";

-- DropForeignKey
ALTER TABLE "ShippingInfo" DROP CONSTRAINT "ShippingInfo_userId_fkey";

-- DropForeignKey
ALTER TABLE "_AttributeToProductVariant" DROP CONSTRAINT "_AttributeToProductVariant_A_fkey";

-- DropForeignKey
ALTER TABLE "_AttributeToProductVariant" DROP CONSTRAINT "_AttributeToProductVariant_B_fkey";

-- DropTable
DROP TABLE "_AttributeToProductVariant";

-- CreateTable
CREATE TABLE "_AttributeValueToProductVariant" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_AttributeValueToProductVariant_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_AttributeValueToProductVariant_B_index" ON "_AttributeValueToProductVariant"("B");

-- AddForeignKey
ALTER TABLE "SeoMeta" ADD CONSTRAINT "SeoMeta_ogImageId_fkey" FOREIGN KEY ("ogImageId") REFERENCES "GalleryItem"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ShippingInfo" ADD CONSTRAINT "ShippingInfo_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AttributeValueToProductVariant" ADD CONSTRAINT "_AttributeValueToProductVariant_A_fkey" FOREIGN KEY ("A") REFERENCES "AttributeValue"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AttributeValueToProductVariant" ADD CONSTRAINT "_AttributeValueToProductVariant_B_fkey" FOREIGN KEY ("B") REFERENCES "ProductVariant"("id") ON DELETE CASCADE ON UPDATE CASCADE;
