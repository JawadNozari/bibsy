import { PrismaClient,Book } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

// export const GET = async () => {
// 	return NextResponse.json({ message: "Hello World" });
// };

const prisma = new PrismaClient();
export const GET = async () => {
	return await prisma.book
		.findMany()
		.then((books: []) => {
			// Sorts book by largest id
			books.sort((a: Book, b: Book) => {
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
export const POST = async (req: NextRequest) => {
	const request = await req.json();
	const invNr: number = parseInt(request.invNr);
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
