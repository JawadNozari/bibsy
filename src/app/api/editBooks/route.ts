//* EDIT BOOK 

// Imports
import  path  from "path";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";


// Respons for a get request
export const GET = async () => {
	return NextResponse.json({ message: "This Method is not Allowed" });
};


//* Main function for uppdateing book data in the database
const prisma = new PrismaClient();
export const POST = async (req: NextRequest) => {
	// Geting the post request formData
	const formData = await req.formData();
	// Checking if it's empty and giving a response
	if (formData === undefined) {
		return NextResponse.json(
			{ message: "Malformed request syntax, Invalid request message framing" },
			{ status: 400 },
		);
	}
	
	// Setting upp variables for the data from the post
		//Makeing the numbers get saved as numbers
		//Fixing the published date
	const file = formData.get("file");
	const id = Number(formData.get("id") as string);
	const author = formData.get("author") as string;
	const title = formData.get("title") as string;
	const publisher = formData.get("publishers") as string;
	const published = new Date(formData.get("published") as unknown as string);
	const isbn = Number(formData.get("isbn") as string);
	const invNr = Number(formData.get("invNr") as string);
	const price = Number(formData.get("price") as string);


	//* Makeing the image get saved in the image folder
	const buffer = Buffer.from(await (file as File).arrayBuffer());
		// Removes the empty spaces in the filename
	const filename = (file as File).name.replaceAll(" ", "_");
		// Creates the imagefolder if it doesn't exist
	const uploadDirectory = path.join(process.cwd(), "public/UploadedImage");
	await mkdir(uploadDirectory, { recursive: true });
	await writeFile(path.join(uploadDirectory, filename), buffer);

	// Checks if any variable is null and gives a response
	if (
		!id ||
		!title ||
		!author ||
		!publisher ||
		!invNr ||
		!price ||
		!filename ||
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
				publishers: publisher,
				published: published,
				invNr: invNr,
				price: price,
				isbn: isbn,
				bookImg: `UploadedImage/${filename}`,
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
