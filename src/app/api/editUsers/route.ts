//* EDIT USERS

// Imports
import { PrismaClient } from "@prisma/client";
import { NextResponse, NextRequest } from "next/server";

// Function if a get request is sent
export const GET = async () => {
	return NextResponse.json({ message: "This method is Not impelemented Yet!" });
};

//* Main function for uppdateing book data in the database
const prisma = new PrismaClient();
export const POST = async (req: NextRequest) => {
	const {
		userType,
		id,
		image,
		firstName,
		lastName,
		password,
		email,
		phone,
		admin,
		studentclass,
	} = await req.json(); // We have to await the request body to get the data
	if (!id || !firstName || !lastName || !password || !email || !phone) {
		return NextResponse.json(
			{
				message: "Missing required data. Please provide all necessary fields.",
			},
			{ status: 400 },
		);
	}
	try {
		// Update for users
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		const updatedUser = await (prisma as any)[userType].update({
			where: { id: Number(id) },
			data: {
				image: image.slice(7),
				firstName: firstName,
				lastName: lastName,
				password: password,
				email: email,
				phone: phone,
				...(userType === "staff" && { admin: Boolean(admin) }),
				...(userType === "staff" && {
					qrCode: firstName + lastName + userType,
				}),
				...(userType === "student" && { classroom: studentclass }),
				...(userType === "student" && {
					qrCode: firstName + lastName + studentclass,
				}),
			},
		});
		return NextResponse.json({ user: updatedUser }, { status: 200 });
	} catch {
		// Extra error checking
		console.error(Error);
		return NextResponse.json(
			{
				message:
					"Type Error. This can be caused because of malformed Data (Check Data Type)",
			},
			{ status: 500 },
		);
	}
};
