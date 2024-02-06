import { PrismaClient } from "@prisma/client";
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
		return await prisma.book
			.update({
				where: {
					id: bookId,
				},
				data: {
					available: true,
				},
			})
			.then(async () => {
				// remove the book from the missing list if it is found
				await prisma.missingBooks
					.delete({ where: { id: bookId } })
					.then((book) => {
						return NextResponse.json({ book: book }, { status: 200 });
					});
			})
			.catch((error:Error) => {
				return NextResponse.json({ message: error }, { status: 500 });
			})
			.finally(() => {
				prisma.$disconnect();
			});
		// } else {
		// 	// remove the book from the borrowed list if it is returned
		// 	await prisma.borrowedBooks.delete({ where: { id: bookId } });
		// }

		// if (req.body.listType === "missing") {
		// 	try {
		// 		const getBook = await prisma.missingBooks.findMany({
		// 			where: {
		// 				bookId: req.body.bookId,
		// 			},
		// 		});
		// 		const book = getBook[0];
		// 		await prisma.missingBooks.delete({
		// 			where: {
		// 				id: book.id,
		// 			},
		// 		});
		// 		const response = await prisma.book.update({
		// 			where: {
		// 				id: req.body.bookId,
		// 			},
		// 			data: {
		// 				available: true,
		// 			},
		// 		});
		// 		res.status(200).json({ books: response });
		// 	} catch (error) {
		// 		console.log(error);
		// 		res.status(404).json({ message: error });
		// 	}
		// } else if (req.body.listType === "borrowed") {
		// 	try {
		// 		const getBook = await prisma.borrowedBooks.findMany({
		// 			where: {
		// 				bookId: req.body.bookId,
		// 			},
		// 		});
		// 		const book = getBook[0];
		// 		await prisma.borrowedBooks.delete({
		// 			where: {
		// 				id: book.id,
		// 			},
		// 		});
		// 		const response = await prisma.book.update({
		// 			where: {
		// 				id: req.body.bookId,
		// 			},
		// 			data: {
		// 				available: true,
		// 			},
		// 		});
		// 		res.status(200).json({ books: response });
		// 	} catch (error) {
		// 		console.log(error);
		// 		res.status(404).json({ message: error });
		// 	}
		// } else {
		// 	res.status(404).json({ message: "Method not allowed" });
		// }
	}
	console.debug(
		"\n\n\n We have not any other listType than 'missing' for now. Please check the code. and add the other listType.\n\n\n",
	);
	return NextResponse.json(
		{ message: "Check setBookAvialable for more info" },
		{ status: 400 },
	);
};
