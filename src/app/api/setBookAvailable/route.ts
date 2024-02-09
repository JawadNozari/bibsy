import { PrismaClient, Book } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export const GET = async () => {
	return NextResponse.json({ message: "GET Method is NOT Allowed" });
};

const prisma = new PrismaClient();

export const POST = async (req: NextRequest) => {
	const request = await req.json();
	const { bookId, listType }: { bookId: number; listType: string } = request;
	if (listType === "missing") {
		// update the book status to available
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
				// remove the book from the missing list if it is found
				await prisma.missingBooks
					.deleteMany({ where: { bookId: book.id } })
					.then((book: []) => {
						return NextResponse.json({ book: book }, { status: 200 });
					});
			})
			.catch((error: Error) => {
				return NextResponse.json({ message: error }, { status: 200 });
			})
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

	if (listType === "borrowed") {
		// update the book status to available
		console.log("bookId: ", bookId);
		await prisma.book
			.update({
				where: {
					id: bookId,
				},
				data: {
					available: true,
				},
			})
			.then(async (book: Book) => {
				// remove the book from the borrowed list if it is found
				await prisma.borrowedBooks
					.deleteMany({ where: { bookId: book.id } })
					.then((book: []) => {
						return NextResponse.json({ book: book }, { status: 200 });
					});
			})
			.catch((error: Error) => {
				return NextResponse.json({ message: error }, { status: 200 });
			})
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

	console.debug(
		"\n\n\n We have not any other listType than 'missing' for now. Please check the code. and add the other listType.\n\n\n",
	);
	return NextResponse.json(
		{ message: "Check setBookAvialable for more info" },
		{ status: 200 },
	);
};
