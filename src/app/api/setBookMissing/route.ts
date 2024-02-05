import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export const GET = async () => {
	return NextResponse.json({ message: "Hello World" });
};

const prisma = new PrismaClient();

export const POST = async (req: NextRequest, res: NextResponse) => {
	return NextResponse.json({ message: "Convert this" });
	// try {
	// 	const getBook = await prisma.borrowedBooks.findMany({
	// 		where: {
	// 			bookId: req.body.bookId,
	// 		},
	// 	});
	// 	const book = getBook[0];
	// 	await prisma.borrowedBooks.delete({
	// 		where: {
	// 			id: book.id,
	// 		},
	// 	});
	// 	const response = await prisma.missingBooks.create({
	// 		data: {
	// 			studentId: book.studentId,
	// 			staffId: book.staffId,
	// 			bookId: req.body.bookId,
	// 			note: book.note,
	// 		},
	// 	});
	// 	return NextResponse.json({ books: response });
	// } catch (error) {
	// 	console.log(error);
	// 	return NextResponse.json({ message: error });
	// }
};
