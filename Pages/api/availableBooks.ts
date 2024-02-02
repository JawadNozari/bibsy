import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    prisma.$connect();
    try {
        const response = await prisma.book.findMany({
            where: {
                available: true
            }
        });
        res.status(200).json({ books: response });
        prisma.$disconnect();
    }
    catch (error) {
        console.log(error);
        res.status(404).json({ message: error });
        prisma.$disconnect();
    }
}