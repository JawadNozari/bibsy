-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "admin" BOOLEAN NOT NULL DEFAULT false,
    "password" TEXT,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "phone" VARCHAR(13) NOT NULL,
    "image" VARCHAR(255) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Book" (
    "id" SERIAL NOT NULL,
    "title" TEXT,
    "author" TEXT,
    "published" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "regDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isbn" TEXT,
    "invNr" INTEGER NOT NULL,
    "available" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Book_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "missingBooks" (
    "id" SERIAL NOT NULL,
    "regDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "note" VARCHAR(255) NOT NULL,
    "bookId" INTEGER,
    "userId" INTEGER,

    CONSTRAINT "missingBooks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "borrowedBooks" (
    "id" SERIAL NOT NULL,
    "regDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "note" VARCHAR(255) NOT NULL,
    "bookId" INTEGER,
    "userId" INTEGER,

    CONSTRAINT "borrowedBooks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "returnedBooks" (
    "id" SERIAL NOT NULL,
    "regDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "bookId" INTEGER,
    "userId" INTEGER,

    CONSTRAINT "returnedBooks_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_phone_key" ON "User"("phone");

-- AddForeignKey
ALTER TABLE "missingBooks" ADD CONSTRAINT "missingBooks_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "missingBooks" ADD CONSTRAINT "missingBooks_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "borrowedBooks" ADD CONSTRAINT "borrowedBooks_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "borrowedBooks" ADD CONSTRAINT "borrowedBooks_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "returnedBooks" ADD CONSTRAINT "returnedBooks_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "returnedBooks" ADD CONSTRAINT "returnedBooks_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
