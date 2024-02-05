import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();
export const GET = async () => {
	return await prisma.book
		.findMany({
			where: {
				available: true,
			},
		})
		.then((books) => {
			return NextResponse.json({ books: books }, { status: 200 });
		})
		.catch((error) => {
			return NextResponse.json({ message: error }, { status: 500 });
		})
		.finally(() => {
			prisma.$disconnect();
		});
};
