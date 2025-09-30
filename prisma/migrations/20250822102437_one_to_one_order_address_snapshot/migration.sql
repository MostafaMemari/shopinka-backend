/*
  Warnings:

  - You are about to drop the column `orderId` on the `AddressSnapshot` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `AddressSnapshot` DROP FOREIGN KEY `AddressSnapshot_orderId_fkey`;

-- DropIndex
DROP INDEX `AddressSnapshot_orderId_key` ON `AddressSnapshot`;

-- AlterTable
ALTER TABLE `AddressSnapshot` DROP COLUMN `orderId`;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_addressSnapshotId_fkey` FOREIGN KEY (`addressSnapshotId`) REFERENCES `AddressSnapshot`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
