/*
  Warnings:

  - You are about to drop the `borrowedBooks` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "borrowedBooks" DROP CONSTRAINT "borrowedBooks_bookId_fkey";

-- DropTable
DROP TABLE "borrowedBooks";

-- CreateTable
CREATE TABLE "borrowedBook" (
    "id" SERIAL NOT NULL,
    "userID" INTEGER,
    "regDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "note" VARCHAR(255) NOT NULL,
    "bookId" INTEGER,

    CONSTRAINT "borrowedBook_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "borrowedBook" ADD CONSTRAINT "borrowedBook_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book"("id") ON DELETE SET NULL ON UPDATE CASCADE;
