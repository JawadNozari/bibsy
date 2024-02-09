//* EDIT USERS

// Imports 
import { PrismaClient } from "@prisma/client";
import { NextResponse, NextRequest} from "next/server";
import path from "path";
import { writeFile, mkdir } from "fs/promises";

// Function if a get request is sent
export const GET = async () => {
	return NextResponse.json({ message: "This method is Not impelemented Yet!" });
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
	const Id = formData.get("id");
	const userType = formData.get("userType") as string;
	const first = formData.get("first") as string;
	const last = formData.get("last") as string;
	const password = formData.get("password") as string;
	const email = formData.get("email") as string;
	const phone = formData.get("phone") as string;
	const studentclass = formData.get("studentclass") as string;
	const Admin = formData.get("Admin") as string;
	const admin = Boolean(Admin);
	const id = Number(Id);
	const qrCode = first + last + studentclass;
	const buffer = Buffer.from(await (file as File).arrayBuffer());
	const filename = (file as File).name.replaceAll(" ", "_");
	
	// Create the directory if it doesn't exist
	const uploadDirectory = path.join(process.cwd(), "public/UploadedImage");
	await mkdir(uploadDirectory, { recursive: true });
	await writeFile(path.join(uploadDirectory, filename), buffer);

	// If statments to check if it's a staff or not
	try {
		if (userType === "staff") {
			// Update for staff
			await prisma.staff
			.update({
				where: { id: id },
				data: {
					image: `UploadedImage/${filename}`,
					firstName: first,
					lastName: last,
					password: password,
					email: email,
					phone: phone, 
					qrCode: qrCode,
					admin: admin
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
		prisma.$disconnect();
		return NextResponse.json({ message: "Staff Edited, "});
		}else {
			// Update for students
			await prisma.student
			.update({
				where: { id: id },
				data: {
					image: `UploadedImage/${filename}`,
					firstName: first,
					lastName: last,
					password: password,
					email: email,
					phone: phone, 
					qrCode: qrCode,
					classroom: studentclass
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
	}catch {
		// Extra error checking
		console.debug(Error);
		return NextResponse.json(
			{
				message:
					"FormData Error. This can be cuased becuase of mallformed Data (Check Data Type)",
			},
			{ status: 500 },
		);
  }
};
