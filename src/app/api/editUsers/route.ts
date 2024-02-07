
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

export const GET = async () => {
	return NextResponse.json({ message: "This method is Not impelemented Yet!" });
};

const prisma = new PrismaClient();

export const POST = async () => {
	const staffUsers = await prisma.staff.findMany({
		include: {
			borrowed: true,
		},
	});
	const studentUsers = await prisma.student.findMany({
		include: {
			borrowed: true,
		},
	});
	if (!staffUsers || !studentUsers) {
		prisma.$disconnect();
		return NextResponse.json({ message: "No users found" }, { status: 404 });
	}
	const data = { staffUsers, studentUsers };
	prisma.$disconnect();
	return NextResponse.json(data);
};
