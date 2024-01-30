/*
  Warnings:

  - You are about to drop the column `availabe` on the `Book` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Book" DROP COLUMN "availabe",
ADD COLUMN     "available" BOOLEAN NOT NULL DEFAULT true;

-- CreateTable
CREATE TABLE "returnedBooks" (
    "id" SERIAL NOT NULL,
    "userID" INTEGER,
    "regDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "note" VARCHAR(255) NOT NULL,
    "bookId" INTEGER,

    CONSTRAINT "returnedBooks_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "returnedBooks" ADD CONSTRAINT "returnedBooks_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book"("id") ON DELETE SET NULL ON UPDATE CASCADE;
