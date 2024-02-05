import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export const POST = async (req: NextRequest) => {
	const request = await req.json();
	const { invNr }: { invNr: number } = request;

	return await prisma.book
		.findUnique({
			where: {
				invNr: invNr,
			},
		})
		.then((book) => {
			return NextResponse.json(book, { status: 200 });
		})
		.catch((error) => {
			return NextResponse.json({ message: error }, { status: 500 });
		})
		.finally(() => {
			prisma.$disconnect();
		});
};
export const GET = async () => {
	return await prisma.book
		.findMany()
		.then((books) => {
			return NextResponse.json(books, { status: 200 });
		})
		.catch((error) => {
			return NextResponse.json({ message: error }, { status: 500 });
		})
		.finally(() => {
			prisma.$disconnect();
		});
};
