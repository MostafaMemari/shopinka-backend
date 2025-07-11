/*
  Warnings:

  - You are about to drop the column `blogId` on the `SeoMeta` table. All the data in the column will be lost.
  - You are about to drop the column `categoryId` on the `SeoMeta` table. All the data in the column will be lost.
  - You are about to drop the column `productId` on the `SeoMeta` table. All the data in the column will be lost.
  - You are about to drop the column `tagId` on the `SeoMeta` table. All the data in the column will be lost.
  - Added the required column `targetId` to the `SeoMeta` table without a default value. This is not possible if the table is not empty.
  - Added the required column `targetType` to the `SeoMeta` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "SeoMetaTargetType" AS ENUM ('product', 'blog', 'category', 'tag');

-- DropForeignKey
ALTER TABLE "SeoMeta" DROP CONSTRAINT "SeoMeta_blogId_fkey";

-- DropForeignKey
ALTER TABLE "SeoMeta" DROP CONSTRAINT "SeoMeta_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "SeoMeta" DROP CONSTRAINT "SeoMeta_productId_fkey";

-- DropForeignKey
ALTER TABLE "SeoMeta" DROP CONSTRAINT "SeoMeta_tagId_fkey";

-- DropIndex
DROP INDEX "SeoMeta_blogId_key";

-- DropIndex
DROP INDEX "SeoMeta_categoryId_key";

-- DropIndex
DROP INDEX "SeoMeta_productId_key";

-- DropIndex
DROP INDEX "SeoMeta_tagId_key";

-- AlterTable
ALTER TABLE "SeoMeta" DROP COLUMN "blogId",
DROP COLUMN "categoryId",
DROP COLUMN "productId",
DROP COLUMN "tagId",
ADD COLUMN     "targetId" INTEGER NOT NULL,
ADD COLUMN     "targetType" "SeoMetaTargetType" NOT NULL;
