import { PrismaClient, bookHistory } from "@prisma/client";
import { NextResponse } from "next/server";
const prisma = new PrismaClient();

export const GET = async () => {
	return await prisma.bookHistory
		.findMany({})
		.then((response: bookHistory) => {
			return NextResponse.json({ books: response }, { status: 200 });
		})
		.catch((error:Error) => {
			return NextResponse.json({ message: error }, { status: 500 });
		})
		.finally(() => {
			prisma.$disconnect();
		});
};
