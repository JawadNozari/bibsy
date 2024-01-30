/*
  Warnings:

  - You are about to drop the column `userID` on the `borrowedBooks` table. All the data in the column will be lost.
  - You are about to drop the column `userID` on the `missingBooks` table. All the data in the column will be lost.
  - You are about to drop the column `userID` on the `returnedBooks` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "borrowedBooks" DROP COLUMN "userID";

-- AlterTable
ALTER TABLE "missingBooks" DROP COLUMN "userID";

-- AlterTable
ALTER TABLE "returnedBooks" DROP COLUMN "userID";
