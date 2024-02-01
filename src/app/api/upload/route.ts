// !! Note to Backend: I have to change the path of api folder to src/app/api/upload/route.ts to make it work
// TODO Everything in /Pages/api need to be moved to /src/app/api/foldername/route.ts
// * For example: /Pages/api/getStaff.ts have to be moved to /src/app/api/getStaff/route.ts
// ?? There would be some small changes in the code to make it work when moving to /src/app/api/foldername/route.ts
// The code below is the example of the code that have to be changed to make it work

import { NextRequest, NextResponse } from "next/server";
import path from "path";
import { writeFile } from "fs/promises";
// Define the configuration for the endpoint
// The runtime is set to "edge" to allow for larger file uploads
// export const config = {
// 	api: {
// 		bodyParser: {
// 			sizeLimit: "15mb",
// 		},
// 	},
// };
// Define the POST handler for the file upload
export const POST = async (req: NextRequest) => {
	const formData = await req.formData();
	const file = formData.get("file");

	if (!file) {
		return NextResponse.json({ error: "No files received." }, { status: 400 });
	}
	// Convert the file data to a Buffer
	const buffer = Buffer.from(await (file as File).arrayBuffer());

	// Replace spaces in the file name with underscores
	const filename = (file as File).name.replaceAll(" ", "_");
	console.log(filename);

	try {
		await writeFile(
			path.join(process.cwd(), `public/userUploadedFile/${filename}`),
			buffer,
		);
		return NextResponse.json({
			Message: `${filename} saved successfully`,
			status: 201,
		});
	} catch (error) {
		console.log("Error occurred ", error);
		return NextResponse.json({ Message: "API Error", status: 500 });
	}
};
