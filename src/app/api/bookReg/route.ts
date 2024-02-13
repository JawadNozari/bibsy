//suggestion: make a seperate resuable component to save files. instead of just doning it here!!

import { NextRequest, NextResponse } from "next/server";
import path from "path";
import { writeFile, mkdir } from "fs/promises";
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

	let bookImgPath = "noBookCover/no-cover.jpg";
	const file = request.file;
	if (file) {
		const buffer = Buffer.from(await (file as File).arrayBuffer());
		const filename = (file as File).name.replaceAll(" ", "_");
		// Directory where the file will be uploaded
		const uploadedBookImage = path.join(
			process.cwd(),
			"public/uploadedBookImage",
		);

		// Create the directory if it doesn't exist
		await mkdir(uploadedBookImage, { recursive: true });
		// Write the file to the directory
		await writeFile(path.join(uploadedBookImage, filename), buffer);

		// Update the book image path
		bookImgPath = `uploadedBookImage/${filename}`;
	} else if (!file && bookImg) {
		// If no file is received but there is a URL, use the URL as the book cover
		bookImgPath = request.bookImg;
	} else {
		// use this as default image if no file or URL is received
		bookImgPath = "noBookCover/no-cover.jpg";
	}

	// Save file and form data to the database
	const resp = await prisma.book
		.create({
			data: {
				bookImg: bookImgPath,
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
			console.debug("Got the Error from here");
			return NextResponse.json({ Message: error }, { status: 500 });
		})
		.finally(() => {
			prisma.$disconnect();
		});

	console.log(resp);

	return NextResponse.json(resp);
};
