import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export const GET = async () => {
	return NextResponse.json({ message: "Hello World" });
};

const prisma = new PrismaClient();

export const POST = async (req: NextRequest, res: NextResponse) => {
	try {
		const response = await prisma.book.findMany({
			where: {
				available: true,
			},
		});
		NextResponse.json({ books: response });
		prisma.$disconnect();
	} catch (error) {
		console.log(error);
		NextResponse.json({ message: error });
		prisma.$disconnect();
	}
};
