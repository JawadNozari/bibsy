import { PrismaClient } from "@prisma/client";
import { NextResponse, type NextRequest } from "next/server";
const prisma = new PrismaClient();

// This way you can use the same function to fetch both staff and student users
const fetchUsersList = async () => {
	// This way you can use the same function to fetch both staff and student users
	try {
		const users = await prisma.users.findMany({});
		return users;
	} catch (error) {
		console.error(error);
		throw error;
	}
};
const findUser = async (id: number) => {
	try {
		const user = await prisma.users.findUnique({
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
		const Users = await fetchUsersList(); // Fetch staff users
		const data = { Users: Users }; // Combine the data
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
		const request = await req.json();
		const id = request.id;
		const userdata = await findUser(id);
		return NextResponse.json(userdata);
	} catch (error) {
		// If there is an error, return the error
		return NextResponse.json({ error: error });
	} finally {
		// Disconnect from the database
		await prisma.$disconnect();
	}
};
