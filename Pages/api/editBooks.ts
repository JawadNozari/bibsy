import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();


export default async function edit(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
        console.log(req.body);
        const edit = await prisma.book.update({
            where: { id: req.body.id },
            data: { 
                title: req.body.title,
                author: req.body.author,
                publishers: req.body.publishers,
                isbn: req.body.isbn,
                invNr: req.body.invNr,
                price: req.body.price,
            },
        });
        console.log(edit);
    }catch {
        console.log(Error);
    }
  }
}