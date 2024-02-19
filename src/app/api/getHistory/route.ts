import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
const prisma = new PrismaClient();

//* If request is GET runs this
export const GET = async () => {
	return await prisma.bookHistory
		.findMany({})
		.then((response: []) => {
			// Sorts book by largest id
			response.sort((a: Book, b: Book) => {
				return b.id - a.id;
			});

			//* Sends the books back to the client
			return NextResponse.json({ books: response }, { status: 200 });
		})
		//* Catch the error
		.catch((error: Error) => {
			return NextResponse.json({ message: error }, { status: 500 });
		})
		//* Disconnect from prisma
		.finally(() => {
			prisma.$disconnect();
		});
};

//* If request is POST then return an error message
export const POST = async () => {
	return NextResponse.json({ message: "POST Method is NOT Allowed" });
};