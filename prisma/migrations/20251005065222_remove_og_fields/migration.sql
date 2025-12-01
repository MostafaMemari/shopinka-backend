/*
  Warnings:

  - You are about to drop the column `ogImageId` on the `SeoMeta` table. All the data in the column will be lost.
  - You are about to drop the column `og_description` on the `SeoMeta` table. All the data in the column will be lost.
  - You are about to drop the column `og_title` on the `SeoMeta` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `SeoMeta` DROP FOREIGN KEY `SeoMeta_ogImageId_fkey`;

-- DropIndex
DROP INDEX `SeoMeta_ogImageId_fkey` ON `SeoMeta`;

-- AlterTable
ALTER TABLE `SeoMeta` DROP COLUMN `ogImageId`,
    DROP COLUMN `og_description`,
    DROP COLUMN `og_title`;
