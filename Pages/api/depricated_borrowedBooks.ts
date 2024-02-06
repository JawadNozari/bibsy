import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      if (req.body.userId !== 0 && req.body.userId !== null) {
        if (req.body.userType === "staff") {
          const response = await prisma.borrowedBooks.findMany({
            where: {
              staffId: req.body.userId,
            },
          });
          res.status(200).json({ books: response });
        } else {
          const response = await prisma.borrowedBooks.findMany({
            where: {
              studentId: req.body.userId,
            },
          });
          res.status(200).json({ books: response });
        }
      }else{
        const response = await prisma.borrowedBooks.findMany();
        res.status(200).json({ books: response });
      }
    } catch (error) {
      console.log(error);
      res.status(404).json({ message: error });
    }
  } else {
    try {
      const response = await prisma.borrowedBooks.findMany();
      res.status(200).json({ books: response });
      prisma.$disconnect();
    } catch (error) {
      console.log(error);
      res.status(404).json({ message: error });
      prisma.$disconnect();
    }
  }
}
