import { NextRequest, NextResponse } from "next/server";

import { PrismaClient, Book } from "@prisma/client";

const prisma = new PrismaClient();
type incomingData = Book & { file: File | undefined };

export const POST = async (req: NextRequest) => {
	// Get form data from the request
	const request: incomingData = await req.json();
	if (!request)
		return NextResponse.json({ message: "Invalid request" }, { status: 400 });
	const { bookImg, title, publishers, author, published, isbn, invNr, price } =
		request as incomingData;

	// Save file and form data to the database
	const resp = await prisma.book
		.create({
			data: {
				bookImg: bookImg.slice(7),
				title,
				author,
				publishers,
				published,
				isbn,
				invNr,
				price,
			},
		})
		.then((book) => {
			// Disconnect Prisma client after successful creation
			prisma.$disconnect();
			return {
				Message: "Form data saved successfully",
				status: 201,
				book,
			};
		})
		.catch((error: Error) => {
			// Handle errors
			console.debug(error);
			return {
				Message: "Looks like this invNr is already Registered",
				status: 405,
			};
		})
		.finally(() => {
			prisma.$disconnect();
		});

	return NextResponse.json(resp);
};
