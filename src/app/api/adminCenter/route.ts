//TODO: Check if the user already exists before creating a new user (ERROR handling)
//TODO: Comment the code

import { PrismaClient, Student } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export const GET = async () => {
	return NextResponse.json({ message: "Hello World" });
};

const prisma = new PrismaClient();

// Handler function for handling student registration
export const POST = async (req: NextRequest) => {
	// Get the student data from the request body
	const { password, firstName, lastName, email, phone, image, classroom, qrCode } =
		(await req.json()) as Student; // We have to await the request body to get the data

	return await prisma.student
		.create({
			data: {
				password,
				firstName,
				lastName,
				email,
				phone,
				image,
				classroom,
				qrCode,
			} as Student,
		})
		.then((student) => {
			return NextResponse.json(student, { status: 201 });
		})
		.catch((error: Error) => {
			console.log(error);
			return NextResponse.json(error, { status: 500 });
		})
		.finally(() => {
			prisma.$disconnect();
		});
}; 