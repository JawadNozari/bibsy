-- AlterTable
ALTER TABLE "borrowedBooks" ADD COLUMN     "userId" INTEGER;

-- AlterTable
ALTER TABLE "missingBooks" ADD COLUMN     "userId" INTEGER;

-- AlterTable
ALTER TABLE "returnedBooks" ADD COLUMN     "userId" INTEGER;

-- AddForeignKey
ALTER TABLE "missingBooks" ADD CONSTRAINT "missingBooks_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "borrowedBooks" ADD CONSTRAINT "borrowedBooks_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "returnedBooks" ADD CONSTRAINT "returnedBooks_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
