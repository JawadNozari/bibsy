import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

export const GET = async () => {
	return NextResponse.json({ message: "GET Method is NOT Allowed" });
};

const prisma = new PrismaClient();

//* A temporary type for the data that is sent from the client to the server
type TempStudents = {
	firstName: string;
	lastName: string;
	phone: string;
	password: string;
	email: string;
	image: string;
	qrCode: string;
	classroom: string | null;
};

//* The staff type is the same as the student type, but with an admin boolean instead of a classroom
type TempStaff = {
	firstName: string;
	lastName: string;
	phone: string;
	password: string;
	email: string;
	image: string;
	qrCode: string;
	admin: boolean;
};

//* If the request is a POST request, then create the users in the database
export const POST = async (req: NextRequest) => {
	//* Get the data from the request
	const request = await req.json();

	//* Create an empty array for the students and staff
	const students = <TempStudents[]>[];
	const staff = <TempStaff[]>[];

	//* Get the userType from the request
	const userType = request.userType;

	//* Switch on the userType
	switch (userType) {
		//* If the userType is students, then create the students
		case "students":
			await request.data.map((user: Array<string>) => {
				const email = `${user[0]}.${user[1]}@elev.ntig.se`;
				const qrCode = `${user[0]}${user[1]}${user[3]}`;
				students.push({
					firstName: user[0],
					lastName: user[1],
					phone: user[2],
					password: "changeMe!",
					email: email,
					image: "StudentPFP/baseImage",
					qrCode: qrCode,
					classroom: user[3] === "null" ? null : user[3],
				});
			});

			await prisma.student
				.createMany({
					data: students,
					skipDuplicates: true,
				})
				.then(() => {
					return NextResponse.json({ message: "Students have been created" });
				})
				.catch((error: Error) => {
					return NextResponse.json({ message: error });
				});
			return NextResponse.json({ message: "Students have been created" });

		//* If the userType is staff, then create the staff
		case "staff":
			await request.data.map((user: Array<string>) => {
				const email = `${user[0]}.${user[1]}@ntig.se`;
				const qrCode = `${user[0]}${user[1]}Staff`;
				staff.push({
					firstName: user[0],
					lastName: user[1],
					phone: user[2],
					password: "changeMe!",
					email: email,
					image: "StaffPFP/baseImage",
					qrCode: qrCode,
					admin: false,
				});
			});

			await prisma.staff
				.createMany({
					data: staff,
					skipDuplicates: true,
				})
				.then(() => {
					return NextResponse.json({ message: "Staff have been created" });
				})
				.catch((error: Error) => {
					return NextResponse.json({ message: error });
				});
			return NextResponse.json({ message: "Staff have been created" });
	}
	// console.log(staff, students);
	return NextResponse.json({ message: `${userType} have been created` });
};