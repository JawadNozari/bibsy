import { NextRequest, NextResponse } from "next/server";
import path from "path";
import { writeFile, mkdir } from "fs/promises";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const POST = async (req: NextRequest) => {
	// Get form data from the request
	const formData = await req.formData();
	const file = formData.get("file");

	let bookImgPath = "noBookCover/no-cover.jpg";

	if (file) {
		const buffer = Buffer.from(await (file as File).arrayBuffer());
		const filename = (file as File).name.replaceAll(" ", "_");

		// Directory where the file will be uploaded
		const uploadedBookImage = path.join(process.cwd(), "public/uploadedBookImage");

		// Create the directory if it doesn't exist
		await mkdir(uploadedBookImage, { recursive: true });
		// Write the file to the directory
		await writeFile(path.join(uploadedBookImage, filename), buffer);

		// Update the book image path
		bookImgPath = `uploadedBookImage/${filename}`;
	} else if (!file && formData.get("imageUrl")) {
		// If no file is received but there is a URL, use the URL as the book cover
		bookImgPath = formData.get("imageUrl") as string;
	} else {
		// use this as default image if no file or URL is received
		bookImgPath = "noBookCover/no-cover.jpg";
	}

	const title = formData.get("title") as string;
	const author = formData.get("author") as string;
	const publishers = formData.get("publishers") as string;
	const published = new Date(formData.get("published") as unknown as string);
	const isbn = formData.get("isbn");
	const invNr = Number(formData.get("invNr"));
	const price = Number(formData.get("price"));

	// Save file and form data to the database
	const resp = await prisma.book
		.create({
			data: {
				bookImg: bookImgPath,
				title,
				author,
				publishers,
				published,
				isbn: isbn?.toString() || "",
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
		.catch((error: unknown) => {
			// Handle errors
			return { Message: error, status: 500 };
		})
		.finally(() => {
			prisma.$disconnect();
		});

	console.log(resp);

	return NextResponse.json(resp);
};
