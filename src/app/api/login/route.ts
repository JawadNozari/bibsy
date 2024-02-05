import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

const POST = async () => {
	// try {
	// 	const allUsers = await prisma.user.findMany({
	// 		include: {},
	// 	});
	// 	return allUsers;
	// } catch (error) {
	// 	console.error(error);
	// 	throw error; // Throw the error to be caught in the catch block below
	// } finally {
	// 	await prisma.$disconnect();
	// }
	NextResponse.json({ message: "Jonatan this is for you" });
};

// Call the main function
