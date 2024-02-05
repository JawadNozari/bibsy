import { NextRequest, NextResponse } from "next/server";
import path from "path";
import { writeFile, mkdir } from "fs/promises";
import { PrismaClient } from "@prisma/client";

export const GET = async () => {
    return NextResponse.json({ message: "Hello World" });
};

const prisma = new PrismaClient();

export const POST = async (req: NextRequest) => {
	const formData = await req.formData();
	const file = formData.get("file");

	if (!file) {
		return NextResponse.json({ error: "No files received." }, { status: 400 });
	}

	const buffer = Buffer.from(await (file as File).arrayBuffer());
	const filename = (file as File).name.replaceAll(" ", "_");

	const title = formData.get("title") as string;
	const author = formData.get("author") as string;
	const publishers = formData.get("publishers") as string;
	const published = new Date(formData.get("published") as unknown as string);
	const isbn = Number(formData.get("isbn"));
	const invNr = Number(formData.get("invNr"));
	const price = Number(formData.get("price"));
	const uploadDirectory = path.join(process.cwd(), "public/UploadedImage");

	// Create the directory if it doesn't exist
	await mkdir(uploadDirectory, { recursive: true });
	await writeFile(path.join(uploadDirectory, filename), buffer);
	// Save file and form data to the database using Prisma
	const resp = await prisma.book
		.create({
			data: {
				bookImg: `UploadedImage/${filename}`,
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
			return {
				Message: `${filename} and form data saved successfully`,
				status: 201,
				book,
			};
		})
		.catch((error: unknown ) => {
			return { Message: error, status: 500 };
		});
	return NextResponse.json(resp);
};
