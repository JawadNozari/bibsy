/*
  Warnings:

  - You are about to drop the `borrowedBook` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "borrowedBook" DROP CONSTRAINT "borrowedBook_bookId_fkey";

-- DropTable
DROP TABLE "borrowedBook";

-- CreateTable
CREATE TABLE "borrowedBooks" (
    "id" SERIAL NOT NULL,
    "userID" INTEGER,
    "regDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "note" VARCHAR(255) NOT NULL,
    "bookId" INTEGER,

    CONSTRAINT "borrowedBooks_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "borrowedBooks" ADD CONSTRAINT "borrowedBooks_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book"("id") ON DELETE SET NULL ON UPDATE CASCADE;
