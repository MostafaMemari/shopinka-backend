-- AlterTable
ALTER TABLE "Blog" ADD COLUMN     "mainImageId" INTEGER;

-- AddForeignKey
ALTER TABLE "Blog" ADD CONSTRAINT "Blog_mainImageId_fkey" FOREIGN KEY ("mainImageId") REFERENCES "GalleryItem"("id") ON DELETE SET NULL ON UPDATE CASCADE;
