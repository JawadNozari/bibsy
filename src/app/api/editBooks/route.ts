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
console.log("Tetet");
export const POST = async (req: NextRequest) => {
	

	// Setting upp variables for the data from the post
	const request: incomingData = await req.json();
	const {bookImg ,id ,author  ,title  ,publishers  ,published  ,isbn  ,invNr  ,price } = (request as incomingData);

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
	return await prisma.book
		.update({
			where: { id: id },
			data: {
				title: title,
				author: author,
				publishers: publishers,
				published: published,
				invNr: invNr,
				price: price,
				isbn: isbn,
				bookImg: `UploadedImage/${bookImg}`,
			},
		}) // gives a satus 200 response
		.then((edit) => {
			return NextResponse.json(edit, { status: 200 });
		}) // Error handling
		.catch((error:Error) => {
			console.debug(error);
			return NextResponse.json(
				{
					message:
						"Validation Error. This can be cuased becuase of mallformed Data (Check Data Type)",
				},
				{ status: 500 },
			);
		}) // Closes the prisma session
		.finally(() => {
			prisma.$disconnect();
		});
};
