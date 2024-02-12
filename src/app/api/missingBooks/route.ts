import { PrismaClient } from "@prisma/client";
import { NextResponse, NextRequest } from "next/server";

export const GET = async () => {
	return await prisma.missingBooks
		.findMany()
		.then((response) => {
			console.log("response", response);
			return NextResponse.json({ books: response }, { status: 200 });
		})
		.catch((error: Error) => {
			return NextResponse.json({ message: error }, { status: 500 });
		})
		.finally(() => {
			prisma.$disconnect();
		});
};

const prisma = new PrismaClient();

export const POST = async (req: NextRequest) => {
	// get the userId and userType from the request body
	const request = await req.json();
	const userId: number = parseInt(request.userId);
	const userType: string = request.userType;

	// Make sure the user is a staff
	if (userType !== "staff") {
		return NextResponse.json({ message: "Unauthorized" }, { status: 200 });
	}

	// Check if the userId is undefined
	if (userId === undefined) {
		return NextResponse.json(
			{ message: "Malformed request syntax, Invalid request message framing" },
			{ status: 400 },
		);
	}
	if (Number.isNaN(userId) || userId === undefined) {
		return await prisma.missingBooks
			.findMany()
			.then((missing) => {
				return NextResponse.json({ books: missing }, { status: 200 });
			})
			.catch((error: Error) => {
				return NextResponse.json({ message: error }, { status: 500 });
			})
			.finally(() => {
				prisma.$disconnect();
			});
	}
	// Get the borrowed books based on staffId from the database
	return await prisma.missingBooks
		.findMany({
			where: {
				staffId: userId,
			},
		})
		.then((Borrowed) => {
			return NextResponse.json({ books: Borrowed }, { status: 200 });
		})
		.catch((error: Error) => {
			return NextResponse.json({ message: error }, { status: 200 });
		})
		.finally(() => {
			prisma.$disconnect();
		});
};
