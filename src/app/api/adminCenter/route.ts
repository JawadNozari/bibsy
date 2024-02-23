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
        const { password, firstName, lastName, phone, image, classroom, admin, role } = request;
        let last = lastName;
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
        const response = await (prisma as any)[role].findUnique({
            where: {
                ...(role === "Staff" && {
					email: `${firstName}.${lastName}@ntig.se`,
				}),
				...(role === "Student" && {
					email: `${firstName}.${lastName}@elev.ntig.se`,
				}),
            }
        });
        if(response?.firstName === firstName && response?.lastName === lastName){
            last = `${lastName}2`;
        };
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		const  newUser = await (prisma as any)[role].create({ // Create a new user based on the role
			data: {
				password,
				firstName,
				lastName: lastName,
				phone,
				image: image,
				...(role === "staff" && {admin}),
				...(role === "student" && {classroom}),
				...(role === "Staff" && {
					qrCode: firstName + last + role,
				}),
				...(role === "Student" && {
					qrCode: firstName + last + classroom,
				}),
				...(role === "Staff" && {
					email: `${firstName}.${last}@ntig.se`,
				}),
				...(role === "Student" && {
					email: `${firstName}.${last}@elev.ntig.se`,
				}),
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
