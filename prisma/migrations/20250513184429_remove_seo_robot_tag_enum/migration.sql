/*
  Warnings:

  - You are about to drop the column `og_image` on the `SeoMeta` table. All the data in the column will be lost.
  - The `robotsTag` column on the `SeoMeta` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "SeoMeta" DROP COLUMN "og_image",
ADD COLUMN     "ogImageId" INTEGER,
DROP COLUMN "robotsTag",
ADD COLUMN     "robotsTag" TEXT;

-- DropEnum
DROP TYPE "SeoRobotsTag";

-- AddForeignKey
ALTER TABLE "SeoMeta" ADD CONSTRAINT "SeoMeta_ogImageId_fkey" FOREIGN KEY ("ogImageId") REFERENCES "GalleryItem"("id") ON DELETE SET DEFAULT ON UPDATE CASCADE;
