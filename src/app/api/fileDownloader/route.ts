import { NextRequest, NextResponse } from "next/server";
import path from "path";
import { writeFile, mkdir } from "fs/promises";
import { PrismaClient, Book } from "@prisma/client";
import axios from "axios";
import fs from "fs";
import { promisify } from "util";

const writeFileAsync = promisify(fs.writeFile);
export const POST = async (req: NextRequest) => {
	// const request = await req.formData();
	// const file = request.get("file") as File;
	const { filename, url }: { filename: string; url: string } = await req.json();
	let path = "";
	// if (!file && url === "") {
	// 	return NextResponse.json({ message: "No file received" });
	// }
	// if (file) {
	// 	path = await downloader(file, "");
	// }
	if (url !== "") {
		path = await downloader(undefined, { filename, url });
	}

	// Update the book image path
	return NextResponse.json({ path: path }, { status: 200 });
};

async function downloader(
	userfile: File | undefined,
	{ filename, url }: { filename: string; url: string },
) {
	// Directory where the file will be uploaded
	const uploadedBookImage = path.join(
		process.cwd(),
		"public/uploadedBookImage",
	);
	// let buffer;

	console.log(url);
	const imageBuffer = await axios.get(url, {
		responseType: "arraybuffer",
	});

	// Determine the file extension based on the content type or add .png by default
	const contentType = imageBuffer.headers["content-type"];
    const fileExtension = 'png';

	const filePath = `public/uploadedBookImage/${filename}.${fileExtension}`;

	// const filePath = `public/uploadedBookImage/${filename}`;
	await writeFileAsync(filePath, imageBuffer.data, "binary");
	// const response = await axios
	// 	.get(url, { responseType: "arraybuffer" })
	// 	.then(async (res) => {
	// 		buffer = Buffer.from(await (res.data as File).arrayBuffer());
	// 		filename = (userfile as File).name.replaceAll(" ", "_");
	// 		await mkdir(uploadedBookImage, { recursive: true });
	// 		// Write the file to the directory
	// 		await writeFile(path.join(uploadedBookImage, filename), buffer);
	// 	});
	// if (userfile) {
	// 	buffer = Buffer.from(await (userfile as File).arrayBuffer());
	// 	filename = (userfile as File).name.replaceAll(" ", "_");
	// }

	// // Create the directory if it doesn't exist
	// await mkdir(uploadedBookImage, { recursive: true });
	// // Write the file to the directory
	// await writeFile(path.join(uploadedBookImage, filename), buffer);
	// return `uploadedBookImage/${filename}`;
	return `uploadedBookImage/${filename}.${fileExtension}`;
}
