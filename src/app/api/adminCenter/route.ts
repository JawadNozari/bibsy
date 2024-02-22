// TODO: Check if the user already exists before creating a new user (Error handling)
// TODO: Comment the code

import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

// Function to handle GET requests
export const GET = async () => {
    return NextResponse.json({ message: "Hello World" });
};

const prisma = new PrismaClient();

// Handler function for handling student registration
export const POST = async (req: NextRequest) => {
    try {
        // Get the student data from the request body
        const request = await req.json();
        if (!request) {
            // If request is invalid, return error response
            return NextResponse.json({ message: "Invalid request" }, { status: 400 });
        }

		//* Extract the data from the request
        const { password, firstName, lastName, email, phone, image, classroom, qrCode, admin, role } = request;

		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		const  newUser = await (prisma as any)[role].create({ // Create a new user based on the role
			data: {
				password,
				firstName,
				lastName,
				email,
				phone,
				image: image,
				qrCode,
				...(role === "staff" && {admin}),
				...(role === "student" && {classroom}),
				
			},
		});
        // Return success response with created user data
        return NextResponse.json( newUser, { status: 201 });
    } catch (error) {
        // Handle errors
        console.error(error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    } finally {
        // Disconnect Prisma client
        prisma.$disconnect();
    }
};
