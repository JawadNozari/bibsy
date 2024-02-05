import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const response = await prisma.bookHistory.findMany({});
    res.status(200).json({ books: response });
    prisma.$disconnect();
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error });
    prisma.$disconnect();
  }
}
