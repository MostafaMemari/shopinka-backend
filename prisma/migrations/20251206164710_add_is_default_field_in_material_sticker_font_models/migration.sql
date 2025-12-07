-- AlterTable
ALTER TABLE `Font` ADD COLUMN `isDefault` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `MaterialSticker` ADD COLUMN `isDefault` BOOLEAN NOT NULL DEFAULT false;
