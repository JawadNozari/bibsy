import { Book, PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export const GET = async () => {
	return await prisma.borrowedBooks
		.findMany()
		.then((response: { id: number; regDate: Date; note: string; bookId: number | null; staffId: number | null; studentId: number | null; }[]) => {
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
		return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
	}

	// Check if the userId is undefined
	if (userId === undefined) {
		return NextResponse.json(
			{ message: "Malformed request syntax, Invalid request message framing" },
			{ status: 400 },
		);
	}
	if (Number.isNaN(userId) || userId === undefined) {
		return await prisma.borrowedBooks
			.findMany()
			.then((response: { id: number; regDate: Date; note: string; bookId: number | null; staffId: number | null; studentId: number | null; }[]) => {
				response.sort((a, b) => {
					return b.id - a.id;
				});
				return NextResponse.json({ books: response }, { status: 200 });
			})
			.catch((error: Error) => {
				return NextResponse.json({ message: error }, { status: 500 });
			})
			.finally(() => {
				prisma.$disconnect();
			});
	}
	// Get the borrowed books based on staffId from the database
	return await prisma.borrowedBooks
		.findMany({
			where: {
				staffId: userId,
			},
		})
		.then((Borrowed: { id: number; regDate: Date; note: string; bookId: number | null; staffId: number | null; studentId: number | null; }[]) => {
			Borrowed.sort((a, b) => {
				return b.id - a.id;
			});
			return NextResponse.json({ books: Borrowed }, { status: 200 });
		})
		.catch((error: Error) => {
			return NextResponse.json({ message: error }, { status: 200 });
		});
		try {
			// code inside the finally block
		} catch (error) {
			// handle the error
		}
};
