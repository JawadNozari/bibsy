import { Book, PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
const prisma = new PrismaClient();

export const GET = async () => {
	return await prisma.bookHistory
		.findMany({})
		.then((response: []) => {
			// Sorts book by largest id
			response.sort((a: Book, b: Book) => {
				return b.id - a.id;
			});
			return NextResponse.json({ books: response }, { status: 200 });
		})
		.catch((error: Error) => {
			return NextResponse.json({ message: error }, { status: 500 });
		})
		.finally(() => {
			prisma.$disconnect();
		});
};
