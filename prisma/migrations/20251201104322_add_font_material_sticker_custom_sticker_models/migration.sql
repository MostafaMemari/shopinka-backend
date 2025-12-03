/*
  Warnings:

  - A unique constraint covering the columns `[cartId,customStickerId]` on the table `CartItem` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `CartItem` ADD COLUMN `customStickerId` INTEGER NULL;

-- AlterTable
ALTER TABLE `OrderItem` ADD COLUMN `customStickerId` INTEGER NULL;

-- CreateTable
CREATE TABLE `Font` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `fileId` INTEGER NULL,
    `thumbnailId` INTEGER NULL,
    `displayName` VARCHAR(191) NOT NULL,
    `lineHeight` DOUBLE NOT NULL,
    `size` DOUBLE NOT NULL,
    `isPersian` BOOLEAN NOT NULL DEFAULT true,
    `difficultyRatio` DOUBLE NOT NULL DEFAULT 1.0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MaterialSticker` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `colorCode` VARCHAR(191) NOT NULL,
    `surface` ENUM('MATTE', 'GLOSSY', 'RAINBOW', 'REFLECTIVE') NOT NULL,
    `pricePerCM` DOUBLE NOT NULL,
    `profitPercent` DOUBLE NOT NULL DEFAULT 0.25,
    `backgroundFrom` VARCHAR(191) NULL,
    `backgroundTo` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CustomSticker` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `fontId` INTEGER NULL,
    `materialId` INTEGER NULL,
    `previewImageId` INTEGER NULL,
    `width` DOUBLE NOT NULL,
    `height` DOUBLE NOT NULL,
    `text` TEXT NOT NULL,
    `lineHeight` DOUBLE NOT NULL DEFAULT 1.0,
    `size` DOUBLE NOT NULL DEFAULT 1.0,
    `style` VARCHAR(191) NULL,
    `weight` VARCHAR(191) NULL,
    `letterSpacing` DOUBLE NOT NULL DEFAULT 0,
    `textAlign` VARCHAR(191) NULL,
    `finalPrice` DOUBLE NOT NULL,
    `status` ENUM('PENDING', 'APPROVED', 'REJECTED', 'PUBLISHED') NOT NULL DEFAULT 'PENDING',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE INDEX `CartItem_customStickerId_fkey` ON `CartItem`(`customStickerId`);

-- CreateIndex
CREATE UNIQUE INDEX `CartItem_cartId_customStickerId_key` ON `CartItem`(`cartId`, `customStickerId`);

-- AddForeignKey
ALTER TABLE `CartItem` ADD CONSTRAINT `CartItem_customStickerId_fkey` FOREIGN KEY (`customStickerId`) REFERENCES `CustomSticker`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OrderItem` ADD CONSTRAINT `OrderItem_customStickerId_fkey` FOREIGN KEY (`customStickerId`) REFERENCES `CustomSticker`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Font` ADD CONSTRAINT `Font_fileId_fkey` FOREIGN KEY (`fileId`) REFERENCES `GalleryItem`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Font` ADD CONSTRAINT `Font_thumbnailId_fkey` FOREIGN KEY (`thumbnailId`) REFERENCES `GalleryItem`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CustomSticker` ADD CONSTRAINT `CustomSticker_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CustomSticker` ADD CONSTRAINT `CustomSticker_fontId_fkey` FOREIGN KEY (`fontId`) REFERENCES `Font`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CustomSticker` ADD CONSTRAINT `CustomSticker_materialId_fkey` FOREIGN KEY (`materialId`) REFERENCES `MaterialSticker`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CustomSticker` ADD CONSTRAINT `CustomSticker_previewImageId_fkey` FOREIGN KEY (`previewImageId`) REFERENCES `GalleryItem`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
