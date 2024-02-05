import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

export const GET = async () => {
	return NextResponse.json({ message: "Hello World" });
};

const prisma = new PrismaClient();

export const POST = async () => {
	try {
		const allUsers = await prisma.staff.findMany();
		return NextResponse.json(allUsers);
	} catch (error) {
		console.error(error);
		throw error; // Throw the error to be caught in the catch block below
	} finally {
		await prisma.$disconnect();
	}
};
