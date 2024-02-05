import { PrismaClient, Student } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export const GET = async () => {
	return NextResponse.json({ message: "Hello World" });
};

const prisma = new PrismaClient();

// Handler function for handling student registration
export const POST = async (req: NextRequest) => {
	// Get the student data from the request body
	const {
		password,
		firstName,
		lastName,
		email,
		phone,
		image,
		class: studentClass,
	} = (await req.json()) as Student; // We have to await the request body to get the data

	console.log(` \n\n\nUsers Email:${email}`); // Data is coming through as expected you need a way to prosses it JONATAN!!

	// Create a new student record using Prisma client
	// This method is not working as expected
	return await prisma.student
		.create({
			data: {
				password,
				firstName,
				lastName,
				email,
				phone,
				image,
				class: studentClass,
				qrCode: "", // Add the qrCode property with a default value
			},
		})
		.then((student) => {
			return NextResponse.json(student, { status: 201 });
		})
		.catch((error) => {
			return NextResponse.json(error, { status: 500 });
		})
		.finally(() => {
			prisma.$disconnect();
		});
};
