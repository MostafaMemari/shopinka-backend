/*
  Warnings:

  - Added the required column `lines` to the `CustomSticker` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `CustomSticker` ADD COLUMN `lines` JSON NOT NULL;
