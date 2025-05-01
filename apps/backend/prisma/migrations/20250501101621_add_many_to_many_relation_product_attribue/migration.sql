-- CreateTable
CREATE TABLE "_AttributeToProduct" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_AttributeToProduct_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_AttributeToProduct_B_index" ON "_AttributeToProduct"("B");

-- AddForeignKey
ALTER TABLE "_AttributeToProduct" ADD CONSTRAINT "_AttributeToProduct_A_fkey" FOREIGN KEY ("A") REFERENCES "Attribute"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AttributeToProduct" ADD CONSTRAINT "_AttributeToProduct_B_fkey" FOREIGN KEY ("B") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
