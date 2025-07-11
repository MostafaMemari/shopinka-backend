/*
  Warnings:

  - You are about to drop the column `tackingCode` on the `ShippingInfo` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[trackingCode]` on the table `ShippingInfo` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `trackingCode` to the `ShippingInfo` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "ShippingInfo_tackingCode_key";

-- AlterTable
ALTER TABLE "ShippingInfo" DROP COLUMN "tackingCode",
ADD COLUMN     "trackingCode" TEXT NOT NULL,
ADD COLUMN     "userId" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "ShippingInfo_trackingCode_key" ON "ShippingInfo"("trackingCode");

-- AddForeignKey
ALTER TABLE "ShippingInfo" ADD CONSTRAINT "ShippingInfo_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET DEFAULT ON UPDATE CASCADE;
