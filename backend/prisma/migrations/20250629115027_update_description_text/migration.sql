-- AlterTable
ALTER TABLE `Attribute` MODIFY `description` TEXT NULL;

-- AlterTable
ALTER TABLE `Category` MODIFY `description` TEXT NULL;

-- AlterTable
ALTER TABLE `Comment` MODIFY `content` TEXT NOT NULL;

-- AlterTable
ALTER TABLE `Gallery` MODIFY `description` TEXT NULL;

-- AlterTable
ALTER TABLE `GalleryItem` MODIFY `description` TEXT NULL;

-- AlterTable
ALTER TABLE `Page` MODIFY `description` TEXT NULL;

-- AlterTable
ALTER TABLE `Product` MODIFY `description` TEXT NULL;

-- AlterTable
ALTER TABLE `SeoMeta` MODIFY `description` TEXT NULL;

-- AlterTable
ALTER TABLE `Tag` MODIFY `description` TEXT NULL;
