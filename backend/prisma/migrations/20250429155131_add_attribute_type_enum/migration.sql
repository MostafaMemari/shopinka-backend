/*
  Warnings:

  - Changed the type of `type` on the `Attribute` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "AttributeType" AS ENUM ('COLOR', 'BUTTON');

-- AlterTable
ALTER TABLE "Attribute" DROP COLUMN "type",
ADD COLUMN     "type" "AttributeType" NOT NULL,
ALTER COLUMN "description" DROP NOT NULL;

-- AlterTable
ALTER TABLE "AttributeValue" ALTER COLUMN "color_code" DROP NOT NULL,
ALTER COLUMN "button_label" DROP NOT NULL;
