/*
  Warnings:

  - Added the required column `itemType` to the `OrderItem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `OrderItem` ADD COLUMN `customStickerSnapshot` JSON NULL,
    ADD COLUMN `itemType` ENUM('PRODUCT', 'CUSTOM_STICKER') NOT NULL,
    ADD COLUMN `variantSnapshot` JSON NULL;
