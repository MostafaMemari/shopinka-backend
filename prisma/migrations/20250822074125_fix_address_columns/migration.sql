/*
  Warnings:

  - You are about to drop the column `address` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `receiverName` on the `Order` table. All the data in the column will be lost.
  - Made the column `building_number` on table `Address` required. This step will fail if there are existing NULL values in that column.
  - Made the column `postal_address` on table `Address` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Address` MODIFY `building_number` VARCHAR(191) NOT NULL,
    MODIFY `postal_address` TEXT NOT NULL;

-- AlterTable
ALTER TABLE `Order` DROP COLUMN `address`,
    DROP COLUMN `receiverName`,
    ADD COLUMN `addressSnapshotId` INTEGER NULL;

-- CreateTable
CREATE TABLE `AddressSnapshot` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `fullName` VARCHAR(191) NOT NULL,
    `province` VARCHAR(191) NOT NULL,
    `city` VARCHAR(191) NOT NULL,
    `postal_address` TEXT NOT NULL,
    `building_number` VARCHAR(191) NOT NULL,
    `unit` VARCHAR(191) NULL,
    `postal_code` VARCHAR(10) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE INDEX `Order_addressSnapshotId_fkey` ON `Order`(`addressSnapshotId`);

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_addressSnapshotId_fkey` FOREIGN KEY (`addressSnapshotId`) REFERENCES `AddressSnapshot`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
