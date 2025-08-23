/*
  Warnings:

  - You are about to drop the column `isActive` on the `Address` table. All the data in the column will be lost.
  - You are about to drop the column `plate` on the `Address` table. All the data in the column will be lost.
  - You are about to drop the column `streetAndAlley` on the `Address` table. All the data in the column will be lost.
  - You are about to drop the column `addressId` on the `Order` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `Order` DROP FOREIGN KEY `Order_addressId_fkey`;

-- DropIndex
DROP INDEX `Order_addressId_fkey` ON `Order`;

-- AlterTable
ALTER TABLE `Address` DROP COLUMN `isActive`,
    DROP COLUMN `plate`,
    DROP COLUMN `streetAndAlley`,
    ADD COLUMN `building_number` VARCHAR(191) NULL,
    ADD COLUMN `postal_address` TEXT NULL;

-- AlterTable
ALTER TABLE `Order` DROP COLUMN `addressId`,
    ADD COLUMN `address` TEXT NULL,
    ADD COLUMN `receiverName` VARCHAR(191) NULL;
