import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
// type Data = {
//     title: string;
//     author: string;
//     isbn: number;
//     invNr: number;
//     price: number;
//     image: string;
//     available: boolean;
// };
// Handler function for handling book registration
export default async function BookRegister(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	// Check if the request method is POST
	// if (req.method === "POST") {
	//     console.log(req.body);
	//     const { title, author, isbn, invNr, price, image}:Data = req.body;

	//     // Convert invNr and price from string to number
	//     const numberInvNr = invNr;
	//     const numberPrice = price;
	//     try {
	//         // Create a new book record using Prisma client
	//         const book = await prisma.book.create({
	//             data: {
	//                 title: title,
	//                 author: author,
	//                 isbn: isbn,
	//                 invNr: numberInvNr,
	//                 price: numberPrice,
	//                 bookImg: image,
	//                 available: true,
	//             },
	//         });

	//         // Send a 201 Created response with the created book
	//         res.status(201).json(book);
	//     } catch (error) {
	//         // Log and send a 500 Internal Server Error response if an error occurs
	//         console.error(error);
	//         res.status(500).json({ error: error });
	//     }
	// } else {
	//     // Send a 400 Bad Request response if the request method is not POST
	//     res.status(400).json({ error: "Wrong request method" });
	// }
	res.status(404).json({ error: "This Code is Depricated" });
}
