import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export const GET = async () => {
	return NextResponse.json({ message: "Hello World" });
};

const prisma = new PrismaClient();

export const POST = async (req: NextRequest) => {
	// try {
	//     console.log(req.body);
	//     const{title, author, publisher, invNr, price, image} = req.body;
	//     const isbn = Number(req.body.isbn);
	//     const edit = await prisma.book.update({
	//         where: { id: req.body.id },
	//         data: {
	//             title:title,
	//             author:author,
	//             publishers:publisher,
	//             invNr:invNr,
	//             price:price,
	//             isbn:isbn,
	//             bookImg:image,
	//         },
	//     });
	//     console.log(edit);
	// }catch {
	//     console.log(Error);
	// }
};
