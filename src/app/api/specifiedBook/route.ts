import { PrismaClient } from "@prisma/client";
import { NextResponse, NextRequest } from "next/server";

const prisma = new PrismaClient();

const fetchbook = async (id: number) => {
	try {
			const book = await prisma.book
				.findUnique({
					where: { id: id },
				});
				return book;
	} catch {
		// Extra error checking
		console.debug(Error);
		return NextResponse.json(
			{
				message:
					"FormData Error. This can be cuased becuase of mallformed Data (Check Data Type)",
			},
			{ status: 500 },
		);
	}
};
export const POST = async (req: NextRequest) => {
	try {
		const { id } = await req.json();
		const bookdata = await fetchbook(id);
		return NextResponse.json(bookdata);
	} catch (error) {
		// If there is an error, return the error
		return NextResponse.json({ error: error });
	} finally {
		// Disconnect from the database
		await prisma.$disconnect();
	}
};
