/*
  Warnings:

  - A unique constraint covering the columns `[blogId]` on the table `SeoMeta` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[tagId]` on the table `SeoMeta` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[categoryId]` on the table `SeoMeta` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `entityType` to the `SeoMeta` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SeoMeta" ADD COLUMN     "blogId" INTEGER,
ADD COLUMN     "categoryId" INTEGER,
ADD COLUMN     "entityType" TEXT NOT NULL,
ADD COLUMN     "tagId" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "SeoMeta_blogId_key" ON "SeoMeta"("blogId");

-- CreateIndex
CREATE UNIQUE INDEX "SeoMeta_tagId_key" ON "SeoMeta"("tagId");

-- CreateIndex
CREATE UNIQUE INDEX "SeoMeta_categoryId_key" ON "SeoMeta"("categoryId");

-- AddForeignKey
ALTER TABLE "SeoMeta" ADD CONSTRAINT "SeoMeta_blogId_fkey" FOREIGN KEY ("blogId") REFERENCES "Blog"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SeoMeta" ADD CONSTRAINT "SeoMeta_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SeoMeta" ADD CONSTRAINT "SeoMeta_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;
