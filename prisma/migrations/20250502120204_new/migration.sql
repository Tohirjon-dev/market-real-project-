/*
  Warnings:

  - Added the required column `orderItemId` to the `reviews` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "reviews" ADD COLUMN     "orderItemId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_orderItemId_fkey" FOREIGN KEY ("orderItemId") REFERENCES "orderItems"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
