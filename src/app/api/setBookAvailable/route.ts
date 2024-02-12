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
	const { bookId, listType }: { bookId: number; listType: string } = request;
	if (listType === "missing") {
		//* Update the books status to available
		await prisma.book
			.update({
				where: {
					id: bookId,
				},
				data: {
					available: true,
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
				return NextResponse.json(
					{ message: "Check setBookAvialable for more info" },
					{ status: 200 },
				);
			});
		//? I dont know why this is the one that is being sent
		return NextResponse.json("Book has been set to available!", {
			status: 200,
		});
	}

	if (listType === "borrowed") {
		//* Update the book status to available
		await prisma.book
			.update({
				where: {
					id: bookId,
				},
				data: {
					available: true,
				},
			})
			.then(async (book) => {
				//* Remove the book from the borrowed list if it is found
				await prisma.borrowedBooks
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
				return NextResponse.json(
					{ message: "Check setBookAvialable for more info" },
					{ status: 200 },
				);
			});
		return NextResponse.json("Book has been set to available!", {
			status: 200,
		});
	}

	//* If the listType is not missing or borrowed
	console.debug(
		"\n\n\n We have not any other listType than 'missing' for now. Please check the code. and add the other listType.\n\n\n",
	);

	//* Disconnect from prisma and return a message	
	return NextResponse.json(
		{ message: "Check setBookAvialable for more info" },
		{ status: 200 },
	);
};
