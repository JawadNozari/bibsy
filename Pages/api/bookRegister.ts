import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Handler function for handling book registration
export default async function BookRegister(req: NextApiRequest, res: NextApiResponse) {
    // Check if the request method is POST
    if (req.method === 'POST') {
        const { title, author, isbn, invNr } = req.body;

        // Convert invNr from string to number
        const numberInvNr = parseInt(invNr, 10);
        try {
            // Create a new book record using Prisma client
            const book = await prisma.book.create({
                data: {
                    title: title,
                    author: author,
                    isbn: isbn,
                    invNr: numberInvNr,
                    available: true,
                },
            });


            // Send a 201 Created response with the created book
            res.status(201).json(book);
        } catch (error) {
            // Log and send a 500 Internal Server Error response if an error occurs
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    } else {
        // Send a 400 Bad Request response if the request method is not POST
        res.status(400).json({ error: 'Wrong request method' });
    }
}
