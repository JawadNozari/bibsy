import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export const GET = async () => {
	return NextResponse.json({ message: "Hello World" });
};

const prisma = new PrismaClient();

export const POST = async (req: NextRequest, res: NextResponse) => {
	try {
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
		const data = { staffUsers, studentUsers };
		prisma.$disconnect();
		return NextResponse.json(data);
	} catch (error) {
		console.error(error);
		prisma.$disconnect();
		return NextResponse.json({ error: error });
	}
};
