/*
  Warnings:

  - You are about to drop the column `address` on the `Address` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Address` table. All the data in the column will be lost.
  - You are about to drop the column `receiver_mobile` on the `Address` table. All the data in the column will be lost.
  - You are about to alter the column `postal_code` on the `Address` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(10)`.
  - You are about to drop the column `seoMetaType` on the `ProductVariant` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[cartId,productId]` on the table `CartItem` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[cartId,productVariantId]` on the table `CartItem` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `fullName` to the `Address` table without a default value. This is not possible if the table is not empty.
  - Added the required column `plate` to the `Address` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "AttributeValue" DROP CONSTRAINT "AttributeValue_attributeId_fkey";

-- DropIndex
DROP INDEX "CartItem_productId_key";

-- DropIndex
DROP INDEX "CartItem_productVariantId_key";

-- AlterTable
ALTER TABLE "Address" DROP COLUMN "address",
DROP COLUMN "description",
DROP COLUMN "receiver_mobile",
ADD COLUMN     "fullName" TEXT NOT NULL,
ADD COLUMN     "plate" TEXT NOT NULL,
ADD COLUMN     "unit" TEXT,
ALTER COLUMN "postal_code" SET DATA TYPE VARCHAR(10);

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "defaultVariantId" INTEGER;

-- AlterTable
ALTER TABLE "ProductVariant" DROP COLUMN "seoMetaType";

-- CreateIndex
CREATE UNIQUE INDEX "CartItem_cartId_productId_key" ON "CartItem"("cartId", "productId");

-- CreateIndex
CREATE UNIQUE INDEX "CartItem_cartId_productVariantId_key" ON "CartItem"("cartId", "productVariantId");

-- AddForeignKey
ALTER TABLE "AttributeValue" ADD CONSTRAINT "AttributeValue_attributeId_fkey" FOREIGN KEY ("attributeId") REFERENCES "Attribute"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_defaultVariantId_fkey" FOREIGN KEY ("defaultVariantId") REFERENCES "ProductVariant"("id") ON DELETE SET NULL ON UPDATE CASCADE;
