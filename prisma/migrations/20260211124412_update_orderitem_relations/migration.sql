/*
  Warnings:

  - Added the required column `productTitle` to the `OrderItem` table without a default value. This is not possible if the table is not empty.

*/

-- AlterTable
ALTER TABLE `OrderItem` ADD COLUMN `imageUrl` VARCHAR(191) NULL,
    ADD COLUMN `productTitle` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `OrderItem` ADD CONSTRAINT `OrderItem_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OrderItem` ADD CONSTRAINT `OrderItem_productVariantId_fkey` FOREIGN KEY (`productVariantId`) REFERENCES `ProductVariant`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OrderItem` ADD CONSTRAINT `OrderItem_customStickerId_fkey` FOREIGN KEY (`customStickerId`) REFERENCES `CustomSticker`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

