/*
  Warnings:

  - Made the column `postal_code` on table `Address` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Address` MODIFY `postal_code` VARCHAR(10) NOT NULL;
