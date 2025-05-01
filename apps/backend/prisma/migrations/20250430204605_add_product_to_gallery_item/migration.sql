/*
  Warnings:

  - You are about to drop the column `galleryItemId` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the `_galleyItemImages` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `mainImageId` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_galleryItemId_fkey";

-- DropForeignKey
ALTER TABLE "_galleyItemImages" DROP CONSTRAINT "_galleyItemImages_A_fkey";

-- DropForeignKey
ALTER TABLE "_galleyItemImages" DROP CONSTRAINT "_galleyItemImages_B_fkey";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "galleryItemId",
ADD COLUMN     "mainImageId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "_galleyItemImages";

-- CreateTable
CREATE TABLE "_ProductToGalleryItem" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_ProductToGalleryItem_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_ProductToGalleryItem_B_index" ON "_ProductToGalleryItem"("B");

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_mainImageId_fkey" FOREIGN KEY ("mainImageId") REFERENCES "GalleryItem"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductToGalleryItem" ADD CONSTRAINT "_ProductToGalleryItem_A_fkey" FOREIGN KEY ("A") REFERENCES "GalleryItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductToGalleryItem" ADD CONSTRAINT "_ProductToGalleryItem_B_fkey" FOREIGN KEY ("B") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
