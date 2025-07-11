-- AlterTable
ALTER TABLE "ProductVariant" ALTER COLUMN "mainImageId" DROP NOT NULL,
ALTER COLUMN "quantity" DROP NOT NULL,
ALTER COLUMN "base_price" DROP NOT NULL,
ALTER COLUMN "sale_price" DROP NOT NULL,
ALTER COLUMN "width" DROP NOT NULL,
ALTER COLUMN "height" DROP NOT NULL,
ALTER COLUMN "length" DROP NOT NULL,
ALTER COLUMN "weight" DROP NOT NULL;

-- CreateTable
CREATE TABLE "_AttributeToProductVariant" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_AttributeToProductVariant_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_AttributeToProductVariant_B_index" ON "_AttributeToProductVariant"("B");

-- AddForeignKey
ALTER TABLE "_AttributeToProductVariant" ADD CONSTRAINT "_AttributeToProductVariant_A_fkey" FOREIGN KEY ("A") REFERENCES "Attribute"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AttributeToProductVariant" ADD CONSTRAINT "_AttributeToProductVariant_B_fkey" FOREIGN KEY ("B") REFERENCES "ProductVariant"("id") ON DELETE CASCADE ON UPDATE CASCADE;
