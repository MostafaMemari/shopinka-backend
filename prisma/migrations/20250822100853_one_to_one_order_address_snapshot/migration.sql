/*
  Warnings:

  - A unique constraint covering the columns `[orderId]` on the table `AddressSnapshot` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[addressSnapshotId]` on the table `Order` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `orderId` to the `AddressSnapshot` table without a default value. This is not possible if the table is not empty.
  - Made the column `addressSnapshotId` on table `Order` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `Order` DROP FOREIGN KEY `Order_addressSnapshotId_fkey`;

-- DropIndex
DROP INDEX `Order_addressSnapshotId_fkey` ON `Order`;

-- AlterTable
ALTER TABLE `AddressSnapshot` ADD COLUMN `orderId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `Order` MODIFY `addressSnapshotId` INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `AddressSnapshot_orderId_key` ON `AddressSnapshot`(`orderId`);

-- CreateIndex
CREATE UNIQUE INDEX `Order_addressSnapshotId_key` ON `Order`(`addressSnapshotId`);

-- AddForeignKey
ALTER TABLE `AddressSnapshot` ADD CONSTRAINT `AddressSnapshot_orderId_fkey` FOREIGN KEY (`orderId`) REFERENCES `Order`(`addressSnapshotId`) ON DELETE CASCADE ON UPDATE CASCADE;
