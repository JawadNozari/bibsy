//TODO: Check if the user already exists before creating a new user (ERROR handling)
//TODO: Comment the code

import { PrismaClient, Staff } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export const GET = async () => {
	return NextResponse.json({ message: "Hello World" });
};

const prisma = new PrismaClient();

// Handler function for handling Staff registration
export const POST = async (req: NextRequest) => {
	// Get the Staff data from the request body
	const { password, firstName, lastName, email, phone, image, qrCode, admin} =
		(await req.json()) as Staff; // We have to await the request body to get the data

	return await prisma.staff
		.create({
			data: {
				password,
				firstName,
				lastName,
				email,
				phone,
				image,
				admin,
				qrCode // Add the qrCode property with a default value
			} as Staff,
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