import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export const GET = async () => {
	return await prisma.borrowedBooks
		.findMany()
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

const prisma = new PrismaClient();

export const POST = async (req: NextRequest) => {
	// get the userId and userType from the request body
	const { userId, userType } = await req.json();

	// Make sure the user is a staff
	if (userType !== "staff") {
		return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
	}
	// Check if the userId is undefined
	if (userId === undefined) {
		return NextResponse.json(
			{ message: "Malformed request syntax, Invalid request message framing" },
			{ status: 400 },
		);
	}
	// Get the borrowed books based on staffId from the database
	return await prisma.borrowedBooks
		.findMany({
			where: {
				staffId: userId,
			},
		})
		.then((Borrowed) => {
			return NextResponse.json(Borrowed, { status: 200 });
		})
		.catch((error) => {
			return NextResponse.json({ message: error }, { status: 500 });
		})
		.finally(() => {
			prisma.$disconnect();
		});
};
