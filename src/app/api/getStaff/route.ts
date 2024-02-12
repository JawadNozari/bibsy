import { PrismaClient, Staff} from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export const GET = async () => {
	return await prisma.staff
		.findMany()
		.then((staff) => { // Remove the type annotation for staff
			return NextResponse.json(staff, { status: 200 });
		})
		.catch((error: Error) => {
			return NextResponse.json({ error: error }, { status: 500 });
		})
		.finally(() => {
			prisma.$disconnect();
		});
};
export const POST = async () => {
	// Maybe use this to get specific user
	return NextResponse.json({ message: "This Method is not impelemented YET!" });
};
