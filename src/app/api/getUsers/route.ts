import { PrismaClient, Staff, Student } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

type UserModel = Staff | Student;
// This way you can use the same function to fetch both staff and student users
const fetchUsers = async (model: keyof PrismaClient): Promise<UserModel[]> => {
	try {
		const users = await prisma[model as keyof PrismaClient & "staff"].findMany({
			include: {
				borrowed: true,
			},
		});
		return users;
	} catch (error) {
		console.error(error);
		throw error;
	}
};

export const GET = async () => {
	try {
		const staffUsers = await fetchUsers("staff"); // Fetch staff users
		const studentUsers = await fetchUsers("student"); // Fetch student users
		const data = { "Staff Users": staffUsers, "Student Users": studentUsers }; // Combine the data
		return NextResponse.json(data);
	} catch (error) {
		return NextResponse.json({ error: error });
	} finally {
		await prisma.$disconnect();
	}
};
export const POST = async () => {
	// Maybe use this to get specific user
	return NextResponse.json({ message: "This Method is not impelemented yet!" });
};
