import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();


export default async function edit(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
        console.log(req.body);
        const{title, author, publisher, invNr, price, image} = req.body;
        const isbn = Number(req.body.isbn);
        const edit = await prisma.book.update({
            where: { id: req.body.id },
            data: { 
                title:title,
                author:author,
                publishers:publisher,
                invNr:invNr,
                price:price,
                isbn:isbn,
                bookImg:image,
            },
        });
        console.log(edit);
    }catch {
        console.log(Error);
    }
  }
}