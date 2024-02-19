//* EDIT USERS

// Imports 
import { PrismaClient } from "@prisma/client";
import { NextResponse, NextRequest} from "next/server";

// Function if a get request is sent
export const GET = async () => {
	return NextResponse.json({ message: "This method is Not impelemented Yet!" });
};

//* Main function for uppdateing book data in the database
const prisma = new PrismaClient();
export const POST = async (req: NextRequest) => {
	const {userType, id, image, firstName, lastName, email, phone, admin, studentclass} =
	(await req.json()) ; // We have to await the request body to get the data

	if (
		!id ||
		!firstName ||
		!lastName ||
		!email ||
		!phone
	) {
		return NextResponse.json(
			{
				message: "Missing required data. Please provide all necessary fields.",
			},
			{ status: 400 },
		);
	}
	try {
			// Update for staff
			await (prisma as any)[userType]
			.update({
				where: { id: Number(id) },
				data: {
					image: `UploadedImage/${image}`,
					firstName: firstName,
					lastName: lastName,
					email: email,
					phone: phone, 
					qrCode: firstName + firstName + studentclass,
					...(userType === "staff" && {admin: Boolean(admin)}),
					...(userType === "student" && {classroom: studentclass}),
				},
			});
	}catch {
		// Extra error checking
		console.error(Error);
		return NextResponse.json(
			{
				message:
					"Type Error. This can be caused because of malformed Data (Check Data Type)",
			},
			{ status: 500 },
		);

  }finally{
	prisma.$disconnect();
	return NextResponse.json({ status: 200 });
  }
};