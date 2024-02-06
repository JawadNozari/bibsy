//TODO: Check if the user already exists before creating a new user (ERROR handling)

import { PrismaClient, Student } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export const GET = async () => {
	return NextResponse.json({ message: "GET METHOD IS NOT ALLOWED" });
};

const prisma = new PrismaClient();

// Handler function for handling student registration
export const POST = async (req: NextRequest) => {
	// Get the student data from the request body
	const { password, firstName, lastName, email, phone, image, classroom } =
		(await req.json()) as Student; // We have to await the request body to get the data

	console.log(` \n\n\nUsers Email:${email}`); 
	// Create a new student record using Prisma client
	
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
				qrCode: "6456", // Add the qrCode property with a default value
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
