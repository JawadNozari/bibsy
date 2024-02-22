//TODO: Check if the user already exists before creating a new user (ERROR handling)
//TODO: Comment the code

import { PrismaClient, Student } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export const GET = async () => {
	return NextResponse.json({ message: "Hello World" });
};

const prisma = new PrismaClient();
type incomingData = Student & { file: File | undefined };

// Handler function for handling student registration
export const POST = async (req: NextRequest) => {
	// Get the student data from the request body
	const request: incomingData = await req.json();
	if (!request)
		return NextResponse.json({ message: "Invalid request" }, { status: 400 });
	const { password, firstName, lastName, email, phone, image, classroom, qrCode } =
		request as incomingData;
	// We have to await the request body to get the data
	

	return await prisma.student
		.create({
			data: {
				password,
				firstName,
				lastName,
				email,
				phone,
				image: image,
				classroom,
				qrCode, // Add the qrCode property with a default value
			} as incomingData,
		})
		.then((student) => {
			return NextResponse.json(student, { status: 201 });
		})
		.catch((error: Error) => {
			return NextResponse.json(error, { status: 500 });
		})
		.finally(() => {
			prisma.$disconnect();
		});
}; 