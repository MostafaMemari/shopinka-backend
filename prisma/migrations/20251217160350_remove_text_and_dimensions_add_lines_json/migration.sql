/*
  Warnings:

  - You are about to drop the column `height` on the `CustomSticker` table. All the data in the column will be lost.
  - You are about to drop the column `lineHeight` on the `CustomSticker` table. All the data in the column will be lost.
  - You are about to drop the column `size` on the `CustomSticker` table. All the data in the column will be lost.
  - You are about to drop the column `text` on the `CustomSticker` table. All the data in the column will be lost.
  - You are about to drop the column `width` on the `CustomSticker` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `CustomSticker` DROP COLUMN `height`,
    DROP COLUMN `lineHeight`,
    DROP COLUMN `size`,
    DROP COLUMN `text`,
    DROP COLUMN `width`;
