import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    if (req.body.listType === "missing") {
      try {
        const getBook = await prisma.missingBooks.findMany({
          where: {
            bookId: req.body.bookId,
          },
        });
        const book = getBook[0];

        await prisma.missingBooks.delete({
          where: {
            id: book.id,
          },
        });

        const response = await prisma.book.update({
          where: {
            id: req.body.bookId,
          },
          data: {
            available: true,
          },
        });
        res.status(200).json({ books: response });
      } catch (error) {
        console.log(error);
        res.status(404).json({ message: error });
      }
    } else if (req.body.listType === "borrowed") {
      try {
        const getBook = await prisma.borrowedBooks.findMany({
          where: {
            bookId: req.body.bookId,
          },
        });
        const book = getBook[0];

        await prisma.borrowedBooks.delete({
          where: {
            id: book.id,
          },
        });

        const response = await prisma.book.update({
          where: {
            id: req.body.bookId,
          },
          data: {
            available: true,
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
  } else {
    res.status(404).json({ message: "Method not allowed" });
  }
}
