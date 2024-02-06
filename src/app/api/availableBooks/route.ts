import { PrismaClient,Book } from "@prisma/client";

import { NextResponse } from "next/server";

const prisma = new PrismaClient();
export const GET = async () => {
	return await prisma.book
		.findMany({
			where: {
				available: true,
			},
		})
		.then((books: Book[]) => { // Explicitly type 'books' as an array of books
			return NextResponse.json({ books: books }, { status: 200 });
		})
		.catch((error: Error) => { // Explicitly type 'error' as 'Error'
			return NextResponse.json({ message: error }, { status: 500 });
		})
		.finally(() => {
			prisma.$disconnect();
		});
};
