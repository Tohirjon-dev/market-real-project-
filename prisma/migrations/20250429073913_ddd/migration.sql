/*
  Warnings:

  - You are about to drop the column `name` on the `addresses` table. All the data in the column will be lost.
  - Added the required column `region` to the `addresses` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "addresses" DROP COLUMN "name",
ADD COLUMN     "region" TEXT NOT NULL;
