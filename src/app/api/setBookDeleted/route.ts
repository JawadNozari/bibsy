import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

//* GET Method is NOT Allowed
export const GET = async () => {
	return NextResponse.json({ message: "GET Method is NOT Allowed" });
};

const prisma = new PrismaClient();

//* If request is POST then set selected book to available and send the book back to the client
export const POST = async (req: NextRequest) => {
	const request = await req.json();

	//* Get the bookId and listType from the request
	const { bookId, listType }: { bookId: number; listType: string } = request;
	switch (listType) {
		case "missing":
			//* Remove the book from the missing list if it is found
			await prisma.book
				.delete({
					where: {
						id: bookId,
					},
				})
				.then(async (book) => {
					//* Remove the book from the missing list if it is found
					await prisma.missingBooks
						.deleteMany({ where: { bookId: book.id } })
						.then((book) => {
							return NextResponse.json({ book: book }, { status: 200 });
						});
				})
				//* Catch the error
				.catch((error: Error) => {
					return NextResponse.json({ message: error }, { status: 200 });
				})
				//* Disconnect from prisma and return a message
				.finally(() => {
					prisma.$disconnect();
				});
			//* Return a message to the client
			return NextResponse.json("Book has been set to available!", {
				status: 200,
			});

		case "borrowed":
			//* Remove the book from the borrowed list if it is found
			console.log("borrowed", bookId);
			//! WHY IS THIS NOT WORKING ??
			await prisma.book
				.delete({
					where: {
						id: bookId,
					},
				})
				.then(async (book) => {
					//* Remove the book from the missing list if it is found
					await prisma.borrowedBooks
						.deleteMany({ where: { bookId: book.id } })
						.then((book) => {
							console.log("book", book);
							return NextResponse.json({ book: book }, { status: 200 });
						});
				})
				//* Catch the error
				.catch((error: Error) => {
					return NextResponse.json({ message: error }, { status: 200 });
				})
				//* Disconnect from prisma and return a message
				.finally(() => {
					console.log("finally");
					prisma.$disconnect();
				});
			//* Return a message to the client
			return NextResponse.json("Book has been set to available!", {
				status: 200,
			});

		case "available":
		case "registered":
			//* Remove the book from the available/registered list if it is found
			await prisma.book
				.delete({
					where: {
						id: bookId,
					},
				})
				.then((book) => {
					return NextResponse.json({ book: book }, { status: 200 });
				})
				//* Catch the error
				.catch((error: Error) => {
					return NextResponse.json({ message: error }, { status: 200 });
				})
				//* Disconnect from prisma and return a message
				.finally(() => {
					prisma.$disconnect();
					return NextResponse.json(
						{ message: "Check setBookAvialable for more info" },
						{ status: 200 },
					);
				});
			return NextResponse.json("Book has been set to available!", {
				status: 200,
			});

		default:
			console.debug(
				"\n\n\n We have not any other listType than 'missing' for now. Please check the code. and add the other listType.\n\n\n",
			);
			return NextResponse.json(
				{ message: "Check setBookAvialable for more info" },
				{ status: 200 },
			);
	}
};
