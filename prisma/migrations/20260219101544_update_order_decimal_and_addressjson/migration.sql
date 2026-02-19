/*
  Warnings:

  - You are about to drop the column `addressSnapshotId` on the `Order` table. All the data in the column will be lost.
  - You are about to alter the column `totalPrice` on the `Order` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Decimal(65,30)`.
  - You are about to drop the `AddressSnapshot` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `addressSnapshot` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Order` DROP FOREIGN KEY `Order_addressSnapshotId_fkey`;

-- DropIndex
DROP INDEX `Order_addressSnapshotId_key` ON `Order`;

-- AlterTable
ALTER TABLE `Order` DROP COLUMN `addressSnapshotId`,
    ADD COLUMN `addressSnapshot` JSON NOT NULL,
    MODIFY `totalPrice` DECIMAL(65, 30) NOT NULL;

-- DropTable
DROP TABLE `AddressSnapshot`;
