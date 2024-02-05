import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

export const GET = async () => {
	return NextResponse.json({ message: "Hello World" });
};

const prisma = new PrismaClient();
//!! This API does look like BorrowedBooks API
//!! Looks like fredrik is working on this so I will leave it to him
export const POST = async () => {
	// get the userId and userType from the request body

	// Make sure the user is a staff
	// if (userType !== "staff") {
	// 	return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
	// }
	// // Check if the userId is undefined
	// if (Object.keys(data).length === 0) {
	// 	return NextResponse.json(
	// 		{ message: "Malformed request syntax, Invalid request message framing" },
	// 		{ status: 400 },
	// 	);
	// }

	// Get the borrowed books based on staffId from the database
	return await prisma.missingBooks
		.findMany({
			// where: {
			// 	missing: true,
			// },
		})
		.then((missing) => {
			return NextResponse.json(missing, { status: 200 });
		})
		.catch((error) => {
			return NextResponse.json({ message: error }, { status: 500 });
		})
		.finally(() => {
			prisma.$disconnect();
		});
};
