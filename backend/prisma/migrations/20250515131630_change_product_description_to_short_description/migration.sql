/*
  Warnings:

  - You are about to drop the column `description` on the `ProductVariant` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ProductVariant" DROP COLUMN "description",
ADD COLUMN     "short_description" TEXT;
