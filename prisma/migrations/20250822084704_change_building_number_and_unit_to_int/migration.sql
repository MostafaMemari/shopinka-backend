/*
  Warnings:

  - You are about to alter the column `unit` on the `Address` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `building_number` on the `Address` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `building_number` on the `AddressSnapshot` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `unit` on the `AddressSnapshot` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- AlterTable
ALTER TABLE `Address` MODIFY `unit` INTEGER NULL,
    MODIFY `building_number` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `AddressSnapshot` MODIFY `building_number` INTEGER NOT NULL,
    MODIFY `unit` INTEGER NULL;
