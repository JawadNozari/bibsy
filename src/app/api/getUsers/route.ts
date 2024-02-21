import { PrismaClient, Staff, Student } from "@prisma/client";
import { NextResponse, NextRequest } from "next/server";

const prisma = new PrismaClient();

type UserModel = Staff | Student;
// This way you can use the same function to fetch both staff and student users
const fetchUsers = async (model: keyof PrismaClient): Promise<UserModel[]> => {
	// This way you can use the same function to fetch both staff and student users
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
const fetchUser = async (id: number, userType: string) => {
	try {
			const user = await (prisma as any)[userType]
				.findUnique({
					where: { id: id },
				});
				return user;
	} catch {
		// Extra error checking
		console.debug(Error);
		return NextResponse.json(
			{
				message:
					"FormData Error. This can be cuased becuase of mallformed Data (Check Data Type)",
			},
			{ status: 500 },
		);
	}
};

// This is the GET method
export const GET = async () => {
	try {
		// Fetch staff and student users
		const staffUsers = await fetchUsers("staff"); // Fetch staff users
		const studentUsers = await fetchUsers("student"); // Fetch student users
		const data = { staffUsers: staffUsers, studentUsers: studentUsers }; // Combine the data
		return NextResponse.json(data);
	} catch (error) {
		// If there is an error, return the error
		return NextResponse.json({ error: error });
	} finally {
		// Disconnect from the database
		await prisma.$disconnect();
	}
};
// This is the POST method
export const POST = async (req: NextRequest) => {
	try {
		const { id, type } = await req.json();
        const userType = type === "staffUsers" ? "staff" : "student";
		const userdata = await fetchUser(id, userType);
		return NextResponse.json(userdata);
	} catch (error) {
		// If there is an error, return the error
		return NextResponse.json({ error: error });
	} finally {
		// Disconnect from the database
		await prisma.$disconnect();
	}
};