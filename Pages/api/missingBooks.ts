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
      if (req.body.userType === "staff") {
        const response = await prisma.missingBooks.findMany({
          where: {
            staffId: req.body.userId,
          },
        });
        res.status(200).json({ books: response });
      } else {
        const response = await prisma.missingBooks.findMany({
          where: {
            studentId: req.body.userId,
          },
        });
        res.status(200).json({ books: response });
      }
    } catch (error) {
      console.log(error);
      res.status(404).json({ message: error });
    }
  } else {
    try {
      const response = await prisma.missingBooks.findMany();
      res.status(200).json({ books: response });
      prisma.$disconnect();
    } catch (error) {
      console.log(error);
      res.status(404).json({ message: error });
      prisma.$disconnect();
    }
  }
}
