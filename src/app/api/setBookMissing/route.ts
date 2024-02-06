//TODO: This code needs cleanup

import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export const GET = async () => {
  return NextResponse.json({ message: "GET METHOD IS NOT ALLOWED" });
};

const prisma = new PrismaClient();

export const POST = async (req: NextRequest) => {
  const request = await req.json();
  const { bookId }: { bookId: number } = request;
  // update the book status to available
  return await prisma.borrowedBooks
    .findFirst({
      where: {
        bookId: bookId,
      },
    })
    .then(async (book) => {
      console.log(book);
      // remove the book from the borrowedBooks list
      await prisma.borrowedBooks
        .delete({ where: { id: book.id } })
        .then(async (book) => {
          // add it to the missingBooks list
          await prisma.missingBooks
            .create({
              data: {
                studentId: book.studentId, // which student had the book last
                staffId: book.staffId, // which staff member borrowed the book last
                bookId: book.bookId, // which book is missing
                note: book.note, // any notes about the book status
              },
            })
            .then((response) => {
              // return status OK if the data is saved successfully
              return NextResponse.json(
                { "book status": response },
                { status: 200 }
              );
            });
        });
      return NextResponse.json(
        { message: "Book set missing!" },
        { status: 200 }
      );
    })
    .catch((error: Error) => {
      return NextResponse.json({ message: error }, { status: 200 });
    })
    .finally(() => {
      prisma.$disconnect();
    });
};
