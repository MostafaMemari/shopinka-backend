/*
  Warnings:

  - The primary key for the `Product` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Product` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `_ProductToGalleryItem` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Changed the type of `B` on the `_ProductToGalleryItem` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "_ProductToGalleryItem" DROP CONSTRAINT "_ProductToGalleryItem_B_fkey";

-- AlterTable
ALTER TABLE "Product" DROP CONSTRAINT "Product_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Product_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "_ProductToGalleryItem" DROP CONSTRAINT "_ProductToGalleryItem_AB_pkey",
DROP COLUMN "B",
ADD COLUMN     "B" INTEGER NOT NULL,
ADD CONSTRAINT "_ProductToGalleryItem_AB_pkey" PRIMARY KEY ("A", "B");

-- CreateIndex
CREATE INDEX "_ProductToGalleryItem_B_index" ON "_ProductToGalleryItem"("B");

-- AddForeignKey
ALTER TABLE "_ProductToGalleryItem" ADD CONSTRAINT "_ProductToGalleryItem_B_fkey" FOREIGN KEY ("B") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
