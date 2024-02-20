import { PrismaClient } from "@prisma/client";
import { NextResponse, NextRequest } from "next/server";

const prisma = new PrismaClient();

const fetchUser = async (qrCode: string, userType: string) => {
	try {
		const user = await (prisma as any)[userType].findUnique({
			where: { qrCode: qrCode },
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
export const POST = async (req: NextRequest) => {
	try {
		const { qrCode } = await req.json();
		const userType = qrCode.slice(-5) === "staff" ? "staff" : "student";
		const userdata = await fetchUser(qrCode, userType);
		return NextResponse.json(userdata);
	} catch (error) {
		// If there is an error, return the error
		return NextResponse.json({ error: error });
	} finally {
		// Disconnect from the database
		await prisma.$disconnect();
	}
};
