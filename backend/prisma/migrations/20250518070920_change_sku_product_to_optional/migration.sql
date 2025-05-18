-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "sku" DROP NOT NULL;

-- AlterTable
ALTER TABLE "ProductVariant" ALTER COLUMN "sku" DROP NOT NULL;
