import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export const GET = async () => {
	return NextResponse.json({ message: "Hello World" });
};

const prisma = new PrismaClient();

export const POST = async (req: NextRequest, res: NextResponse) => {
	// const sendableBooks: unknown = [];
	// const queriedBooks = await prisma.book.findMany({
	// 	where: {
	// 		title: {
	// 			contains: req.body.bookTitle,
	// 			mode: "insensitive",
	// 		},
	// 	},
	// });
	// if (req.body.listType === "available") {
	// 	try {
	// 		queriedBooks.map((book: any) => {
	// 			if (book.available !== false) {
	// 				sendableBooks.push(book);
	// 				console.log(book);
	// 			}
	// 		});
	// 		res.status(200).json({ books: sendableBooks });
	// 	} catch (error) {
	// 		console.log(error);
	// 		res.status(404).json({ message: error });
	// 		prisma.$disconnect();
	// 	}
	// } else if (req.body.listType === "borrowed") {
	// 	try {
	// 		queriedBooks.map(async (book: any) => {
	// 			const borrowedBook = await prisma.borrowedBooks.findMany({
	// 				where: {
	// 					bookId: book.id,
	// 				},
	// 			});
	// 			if (borrowedBook.length === 0) {
	// 				const index = queriedBooks.indexOf(book);
	// 				queriedBooks.splice(index, 1);
	// 			}
	// 		});
	// 		res.status(200).json({ books: queriedBooks });
	// 		prisma.$disconnect();
	// 	} catch (error) {
	// 		console.log(error);
	// 		res.status(404).json({ message: error });
	// 		prisma.$disconnect();
	// 	}
	// } else if (req.body.listType === "missing") {
	// 	console.log("missing");
	// 	try {
	// 		queriedBooks.map(async (book: any) => {
	// 			const borrowedBook = await prisma.missingBooks.findMany({
	// 				where: {
	// 					bookId: book.id,
	// 				},
	// 			});
	// 			if (borrowedBook.length === 0) {
	// 				const index = queriedBooks.indexOf(book);
	// 				queriedBooks.splice(index, 1);
	// 			}
	// 		});
	// 		res.status(200).json({ books: queriedBooks });
	// 		prisma.$disconnect();
	// 	} catch (error) {
	// 		console.log(error);
	// 		res.status(404).json({ message: error });
	// 		prisma.$disconnect();
	// 	}
	// } else {
	// 	try {
	// 		res.status(200).json({ books: queriedBooks });
	// 		prisma.$disconnect();
	// 	} catch (error) {
	// 		console.log(error);
	// 		res.status(404).json({ message: error });
	// 		prisma.$disconnect();
	// 	}
	// }
};
