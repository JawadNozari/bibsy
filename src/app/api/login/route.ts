import { PrismaClient,Staff } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export const POST = async () => {
	//TODO Property user does not exist on type PrismaClient right now. We can use staff for now for testing purposes
	return await prisma.staff
		.findMany({
			include: {
				//TODO Password check ?
				//TODO Username check ?
			},
		})
		.then((users:Staff) => {
			//TODO Maybe return usertype and a session token ?
			return NextResponse.json(users, { status: 200 });
		})
		.catch((error:Error) => {
			return NextResponse.json({ message: error }, { status: 500 });
		})
		.finally(() => {
			prisma.$disconnect();
		});
};
export const GET = async () => {
	return NextResponse.json({ message: "This method is not implemented yet" });
};
