import { type NextRequest, NextResponse } from "next/server";

import { PrismaClient, type Book } from "@prisma/client";

const prisma = new PrismaClient();
type incomingData = Book & { file: File | undefined };

export const POST = async (req: NextRequest) => {
	// Get form data from the request
	const request: incomingData = await req.json();
	if (!request)
		return NextResponse.json({ message: "Invalid request" }, { status: 400 });
	const {
		bookImg,
		title,
		publisher,
		author,
		publishedDate,
		isbn,
		inventoryNumber,
		price,
	} = request as incomingData;

	// Save file and form data to the database
	const resp = await prisma.book
		.create({
			data: {
				id: 0, // Add the 'id' property with a default value
				regDate: new Date(), // Add the 'regDate' property with the current date
				bookImg: bookImg.slice(7),
				title,
				author,
				publisher,
				publishedDate,
				isbn,
				inventoryNumber,
				price,
				available: true,
				isBorrowed: false,
				isMissing: false,
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
