import { Book, PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();
export const GET = async () => {
	return await prisma.book
		.findMany({
			where: {
				available: true,
			},
		})
		.then((books: { id: number; bookImg: string; title: string | null; author: string | null; publishers: string | null; published: Date; regDate: Date; isbn: number; invNr: number; price: number; available: boolean; }[]) => {
			// Sorts book by largest id
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
		.then((books: { id: number; bookImg: string; title: string | null; author: string | null; publishers: string | null; published: Date; regDate: Date; isbn: number; invNr: number; price: number; available: boolean; }[]) => {
			// Sorts book by largest id
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