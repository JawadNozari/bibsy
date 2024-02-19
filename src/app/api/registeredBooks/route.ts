import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

//* If request is GET runs this
const prisma = new PrismaClient();
export const GET = async () => {
	return await prisma.book
		.findMany()
		.then((books) => {
			//* Sorts books by largest id
			books.sort((a, b) => {
				return b.id - a.id;
			});
			return NextResponse.json({ books: books }, { status: 200 });
		})
		.catch((error: Error) => {
			return NextResponse.json({ message: error }, { status: 500 });
		})
		.finally(() => {
			prisma.$disconnect();
		});
};

//* If request is POST then find book by invNr then send the book back to the client
export const POST = async (req: NextRequest) => {
	const request = await req.json();

	//* Converts the invNr from str to number
	const invNr: number = parseInt(request.invNr);

	//* Finds the books where the invNr matches the requested 
	return await prisma.book
		.findUnique({
			where: {
				invNr: invNr,
			},
		})
		.then((book) => {
			return NextResponse.json(book, { status: 200 });
		})
		.catch((error: Error) => {
			return NextResponse.json({ message: error }, { status: 200 });
		})
		.finally(() => {
			prisma.$disconnect();
		});
};
