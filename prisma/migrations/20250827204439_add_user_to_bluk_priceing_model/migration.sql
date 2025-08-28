-- AlterTable
ALTER TABLE `BulkPricing` ADD COLUMN `userId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `BulkPricing` ADD CONSTRAINT `BulkPricing_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
