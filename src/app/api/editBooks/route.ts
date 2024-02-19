//* EDIT BOOK

// Imports
import { PrismaClient, Book } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

// Respons for a get request
export const GET = async () => {
	return NextResponse.json({ message: "This Method is not Allowed" });
};

//* Main function for uppdateing book data in the database
const prisma = new PrismaClient();
type incomingData = Book & { bookImg: File | undefined };
export const POST = async (req: NextRequest) => {
	// Setting upp variables for the data from the post
	const request: incomingData = await req.json();
	const {
		bookImg,
		id,
		author,
		title,
		publishers,
		published,
		isbn,
		invNr,
		price,
	} = request as incomingData;
	// Checks if any variable is null and gives a response
	if (
		!id ||
		!title ||
		!author ||
		!publishers ||
		!invNr ||
		!price ||
		!bookImg ||
		!isbn ||
		!published
	) {
		return NextResponse.json(
			{
				message: "Missing required data. Please provide all necessary fields.",
			},
			{ status: 400 },
		);
	}
	//* Prisma function to uppdate the user
	try {
		return await prisma.book
			.update({
				where: { id: id },
				data: {
					title: title,
					author: author,
					publishers: publishers,
					published: new Date(published),
					invNr: invNr,
					price: price,
					isbn: isbn,
					bookImg: bookImg.slice(7),
				},
			})
			.then((book: Book) => {
				return NextResponse.json({ book: book }, { status: 200 });
			})
			.catch((error: Error) => {
				return NextResponse.json({ message: error }, { status: 500 });
			})
			.finally(() => {
				prisma.$disconnect();
			});
	} catch {
		// Extra error checking
		console.error(Error);
		return NextResponse.json(
			{
				message:
					"Type Error. This can be caused because of malformed Data (Check Data Type)",
			},
			{ status: 500 },
		);
	}
};
