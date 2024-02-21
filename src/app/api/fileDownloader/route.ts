import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import fs from "fs";
import { promisify } from "util";

const writeFileAsync = promisify(fs.writeFile);

export const POST = async (req: NextRequest) => {
	const request = await req.json();
	const { filename, url }: { filename: string; url: string } = request;
	let path = "";

	// path = await downloader({ filename, url });
	// Directory where the file will be uploaded

	const imageBuffer = await axios.get(url, {
		responseType: "arraybuffer",
	});

	// Determine the content type and extract file extension
	const firstBytes = imageBuffer.data.slice(0, 4).toString("hex");
	let extension = "";

	// Match the file signature with known image formats
	if (firstBytes.startsWith("89504e47")) {
		extension = "png";
	} else if (
		firstBytes.startsWith("ffd8ffe0") ||
		firstBytes.startsWith("ffd8ffe1")
	) {
		extension = "jpg";
	} else if (firstBytes.startsWith("47494638")) {
		extension = "gif";
	} else if (firstBytes.startsWith("49492a00")) {
		extension = "tif";
	} else if (firstBytes.startsWith("424d")) {
		extension = "bmp";
	} else {
		extension = "png";
	}

	// Determine the file extension based on the content type or add .png by default
	const filePath = `public/bookImage/${filename}.${extension}`;

	// const filePath = `public/uploadedBookImage/${filename}`;
	await writeFileAsync(filePath, imageBuffer.data, "binary");

	path = `public/bookImage/${filename}.${extension}`;
	// Update the book image path
	return NextResponse.json({ path: path }, { status: 200 });
};

// async function downloader({
// 	filename,
// 	url,
// }: { filename: string; url: string }) {
// 	console.log("We are inside Download ");
// 	// Directory where the file will be uploaded

// 	const imageBuffer = await axios.get(url, {
// 		responseType: "arraybuffer",
// 	});

// 	// Determine the content type and extract file extension
// 	const firstBytes = imageBuffer.data.slice(0, 4).toString("hex");
// 	console.log(`Your buffer is: ${firstBytes}`);
// 	let extension = "";

// 	// Match the file signature with known image formats
// 	if (firstBytes.startsWith("89504e47")) {
// 		extension = ".png";
// 	} else if (
// 		firstBytes.startsWith("ffd8ffe0") ||
// 		firstBytes.startsWith("ffd8ffe1")
// 	) {
// 		extension = ".jpg";
// 	} else if (firstBytes.startsWith("47494638")) {
// 		extension = ".gif";
// 	} else if (firstBytes.startsWith("49492a00")) {
// 		extension = ".tif";
// 	} else if (firstBytes.startsWith("424d")) {
// 		extension = ".bmp";
// 	} else {
// 		throw new Error("Unknown file format");
// 	}

// 	// Determine the file extension based on the content type or add .png by default
// 	const filePath = `public/bookImage/${filename}.${extension}`;

// 	// const filePath = `public/uploadedBookImage/${filename}`;
// 	await writeFileAsync(filePath, imageBuffer.data, "binary");

// 	return `bookImage/${filename}.${extension}`;
// }
