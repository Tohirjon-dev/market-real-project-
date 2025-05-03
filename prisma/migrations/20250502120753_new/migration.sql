/*
  Warnings:

  - A unique constraint covering the columns `[userId,orderItemId]` on the table `reviews` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "reviews_userId_orderItemId_key" ON "reviews"("userId", "orderItemId");
