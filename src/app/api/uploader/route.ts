import { NextRequest, NextResponse } from "next/server";
import path from "path";
import { writeFile, mkdir } from "fs/promises";

export const POST = async (req: NextRequest) => {
	const request = await req.formData();
	const file = request.get("file");
	const uploadPath = request.get("path");
	if (!file) {
		return NextResponse.json({ error: "No files received." }, { status: 400 });
	}
	const buffer = Buffer.from(await (file as File).arrayBuffer());
	const filename = (file as File).name.replaceAll(" ", "_");
	console.log(`I got Path here: ${uploadPath}`);
	const uploadDirectory = path.join(`public/${uploadPath}`);

	// Create the directory if it doesn't exist
	await mkdir(uploadDirectory, { recursive: true });
	await writeFile(path.join(uploadDirectory, filename), buffer);
	return NextResponse.json({ path: `${uploadDirectory}/${filename}` });
};
