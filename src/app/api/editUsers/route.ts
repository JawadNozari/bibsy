//* EDIT USERS

// Imports
import { PrismaClient } from "@prisma/client";
import { NextResponse, NextRequest } from "next/server";

// Function if a get request is sent
export const GET = async () => {
	return NextResponse.json({ message: "This method is Not impelemented Yet!" });
};

//* Main function for uppdateing book data in the database
const prisma = new PrismaClient();
export const POST = async (req: NextRequest) => {
	try {
		const data = await req.json();
		console.log(req.body);
		const { id, first, last, password, email, phone, qrCode, studentclass } =
			data;
		const admin = Boolean(data.Admin);
		if (
			!id ||
			!first ||
			!last ||
			!password ||
			!email ||
			!phone ||
			!qrCode ||
			!studentclass
		) {
			return NextResponse.json(
				{
					message:
						"Missing required data. Please provide all necessary fields.",
				},
				{ status: 400 },
			);
		}
		if (data.userType === undefined) {
			return NextResponse.json(
				{ message: "User Type is not defined." },
				{ status: 400 },
			);
		}
		if (data.userType === "staff") {
			console.log("Staff");
			await prisma.staff.update({
				where: { id: id },
				data: {
					firstName: first,
					lastName: last,
					password: password,
					email: email,
					phone: phone,
					qrCode: qrCode,
					admin: admin,
				},
			});
			prisma.$disconnect();
			return NextResponse.json({ message: "Staff Edited, " });
		}
		if (data.userType === "student") {
			console.log("Student");
			await prisma.student.update({
				where: { id: id },
				data: {
					firstName: first,
					lastName: last,
					password: password,
					email: email,
					phone: phone,
					qrCode: qrCode,
					classroom: studentclass,
				},
			});
			prisma.$disconnect();
			return NextResponse.json({ message: "Stundent Edited, " });
		}
	} catch {
		console.log(Error);
		prisma.$disconnect();
	}
};
