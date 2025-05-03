/*
  Warnings:

  - You are about to drop the `orderItems` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "orderItems" DROP CONSTRAINT "orderItems_orderId_fkey";

-- DropForeignKey
ALTER TABLE "orderItems" DROP CONSTRAINT "orderItems_productId_fkey";

-- DropForeignKey
ALTER TABLE "reviews" DROP CONSTRAINT "reviews_orderItemId_fkey";

-- DropTable
DROP TABLE "orderItems";

-- CreateTable
CREATE TABLE "orderitems" (
    "id" SERIAL NOT NULL,
    "orderId" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "orderitems_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "orderitems" ADD CONSTRAINT "orderitems_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orderitems" ADD CONSTRAINT "orderitems_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_orderItemId_fkey" FOREIGN KEY ("orderItemId") REFERENCES "orderitems"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
