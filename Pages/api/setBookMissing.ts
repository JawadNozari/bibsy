import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  prisma.$connect();
  if (req.method === "POST") {
    try {
      const getBook = await prisma.borrowedBooks.findMany({
        where: {
          bookId: req.body.bookId,
        },
      });
      const book = getBook[0];

      const removeBook = await prisma.borrowedBooks.delete({
        where: {
          id: book.id,
        },
      });
      const response = await prisma.missingBooks.create({
        data: {
          studentId: book.studentId,
          staffId: book.staffId,
          bookId: req.body.bookId,
          note: book.note,
        },
      });
      res.status(200).json({ books: response });
    } catch (error) {
      console.log(error);
      res.status(404).json({ message: error });
    }
  } else {
    res.status(404).json({ message: "Method not allowed" });
  }
}
