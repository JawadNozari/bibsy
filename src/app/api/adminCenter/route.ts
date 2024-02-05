import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export const GET = async () => {
	return NextResponse.json({ message: "Hello World" });
};

const prisma = new PrismaClient();
type Data = {
	password: string;
	firstName: string;
	lastName: string;
	email: string;
	phone: string;
	image: string;
	class: string;
};

// Handler function for handling student registration
export const POST = async (req: NextRequest, res: NextResponse) => {
	// Check if the request method is POST
	// console.log(req.body);
	// try {
	//     // Create a new student record using Prisma client
	//     // const student = await prisma.student.create({
	//     //     data: {
	//     //         password,
	//     //         firstName,
	//     //         lastName,
	//     //         email,
	//     //         phone,
	//     //         image,
	//     //         class: studentClass,
	//     //         qrCode: "", // Add the qrCode property with a default value
	//     //     },
	//     // });
	//     // Send a 201 Created response with the created student
	//     // res.status(201).json(student);
	// } catch (error) {
	//     // Log and send a 500 Internal Server Error response if an error occurs
	//     console.error(error);
	//     res.status(500).json({ error: error });
	// }
	return NextResponse.json({ message: "Jonatan fix this" });
};
