import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
const prisma = new PrismaClient();

//* If request is GET runs this
export const GET = async () => {
	return await prisma.food
		.findMany({})
		.then((response) => {
			// Sorts book by largest id
			response.sort((a, b) => {
				return b.id - a.id;
			});
			//* Sends the books back to the client
			return NextResponse.json({ food: response }, { status: 200 });
		})
		//* Catch the error
		.catch((error: Error) => {
			return NextResponse.json({ message: error }, { status: 500 });
		})
		//* Disconnect from prisma
		.finally(() => {
			prisma.$disconnect();
		});
};

//* If request is POST runs this function that sends the data to the database
export const POST = async (req: NextRequest) => {
	const { firstName, lastName, usertype } = await req.json();
	console.debug(firstName, lastName, usertype);
	return await prisma.food
		.create({
			data: {
				name: `${firstName} ${lastName}`,
				usertype: usertype,
			},
		})
		.then((response) => {
			return NextResponse.json({ message: "POST request", response });
		})
		.catch((error: Error) => {
			return NextResponse.json({ message: error }, { status: 500 });
		})
		.finally(() => {
			prisma.$disconnect();
		});
};
