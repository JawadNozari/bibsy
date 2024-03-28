//TODO: Save the user to the database
import { PrismaClient } from "@prisma/client";

import { NextResponse, type NextRequest } from "next/server";
import QRCode from "qrcode";

export const GET = async () => {
	return NextResponse.json({ status: 405, message: "Method is not allowed" });
};
export const POST = async (req: NextRequest) => {
	const request = await req.json();
	const {
		firstName,
		lastName,
		username,
		email,
		password,
		image,
		phoneNumber,
		isAdmin,
		isStaff,
		isStudent,
		qrCode,
	} = request;

	// if (
	// 	!firstName ||
	// 	!lastName ||
	// 	!email ||
	// 	!password ||
	// 	!image ||
	// 	!phoneNumber ||
	// 	!isAdmin ||
	// 	!isStaff ||
	// 	!isStudent
	// ) {
	// 	return NextResponse.json({
	// 		status: 400,
	// 		message: "Missing required data. Please provide all necessary fields.",
	// 	});
	// }
	// store the user in the database
	const prisma = new PrismaClient();

	return prisma.users
		.create({
			data: {
				// Add the missing properties
				firstName,
				lastName,
				username,
				email,
				password,
				image,
				phone: phoneNumber,
				isAdmin,
				isStaff,
				isStudent,
				qrCode,
				Administrative: {
					create: {
						canEditLibrary: true,
						canEditUsers: true,
						fullAcess: true,
					},
				},
			},
		})
		.then((user) => {
			// return the user data
			console.log(user);
			return NextResponse.json({
				status: 200,
				message: "User created successfully",
				data: user,
			});
		})
		.catch((error) => {
			console.log(error);
			return NextResponse.json({
				status: 500,
				message: "Error creating user",
			});
		});
};
