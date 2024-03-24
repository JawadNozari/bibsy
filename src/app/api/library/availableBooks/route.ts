import { type Book, PrismaClient } from "@prisma/client";
import { type NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();
export const GET = async () => {
	//* If request is GET runs this that gets all of the registered books that are available from the DB and sends them all back to the client
	return await prisma.book
		.findMany({
			where: {
				available: true,
			},
		})
		.then((books: Book[]) => {
			//* Sorts book by largest id
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
	const title = request.bookTitle;

	//* Finds the books where the title matches the requested
	return await prisma.book
		.findMany({
			where: {
				available: true,
				title: {
					contains: title.toString(),
					mode: "insensitive",
				}
			},
		})
		.then((books: Book[]) => {
			//* Sorts book by largest id
			books.sort((a: Book, b: Book) => {
				return b.id - a.id;
			});
			return NextResponse.json(books, { status: 200 });
		})
		.catch((error: Error) => {
			return NextResponse.json({ message: error }, { status: 500 });
		})
		.finally(() => {
			prisma.$disconnect();
		});
};