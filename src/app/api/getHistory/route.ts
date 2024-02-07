import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
const prisma = new PrismaClient();

export const GET = async () => {
	return await prisma.bookHistory
		.findMany({})
		.then((response) => {
			return NextResponse.json({ books: response }, { status: 200 });
		})
		.catch((error) => {
			return NextResponse.json({ message: error }, { status: 500 });
		})
		.finally(() => {
			prisma.$disconnect();
		});
};
