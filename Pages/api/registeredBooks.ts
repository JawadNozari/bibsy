import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      let invNr = parseInt(req.body.invNr);
      const response = await prisma.book.findUnique({
        where: {
          invNr: invNr,
        },
      });
      res.status(200).json({ book: response });
      prisma.$disconnect();
    } catch (error) {
      console.log(error);
      res.status(404).json({ message: error });
      prisma.$disconnect();
    }
  } else {
    try {
      const response = await prisma.book.findMany();
      res.status(200).json({ books: response });
      prisma.$disconnect();
    } catch (error) {
      console.log(error);
      res.status(404).json({ message: error });
      prisma.$disconnect();
    }
  }
}
