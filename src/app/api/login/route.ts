import { PrismaClient } from "@prisma/client";
import { type NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export const POST = async (req: NextRequest) => {
	const secretKey = String(process.env.NEXT_PUBLIC_SECRET_KEY);

	// * Parse from request (../src/login)
	const request = await req.json();
	const { email, password, rememberMe } = request.userData;
	// * Assign credentials to variables
	const isStaff = async () => {
		return await prisma.staff
			.findUnique({
				where: {
					email: email,
				},
			})
			.then((res) => {
				console.debug(`Found Admin with id: ${res.id}`);
				return true;
			})
			.catch(() => {
				return false;
			});
	};

	// * Find user that matches with given credentials
	if (await isStaff()) {
		console.debug("Found Staff");
		return prisma.staff
			.findFirst({
				where: {
					AND: [{ email: email }],
				},
			})
			.then((staffUser) => {
				// * Compare hashed password with stored hashed password
				const passwordMatch = bcrypt.compareSync(password, staffUser.password);
				if (passwordMatch) {
					// * Passwords match, proceed with generating the token
					const role = staffUser.admin ? "Admin" : "Staff";
					const token = jwt.sign(
						{ user: staffUser, role },
						secretKey,
						rememberMe ? { expiresIn: "7d" } : { expiresIn: "1d" },
					);
					return NextResponse.json(
						{ token },
						{
							status: 200,
						},
					);
				}
				return NextResponse.json(
					{ message: "Invalid email or password" },
					{ status: 401 },
				);
			})
			.catch((err: Error) => {
				console.error("Login failed:", err);
				return NextResponse.json(
					{ error: err.message },
					{
						status: 500,
					},
				);
			})
			.finally(() => {
				prisma.$disconnect();
				return NextResponse.json(
					{ error: "Invalid username or password" },
					{ status: 401 },
				);
			});
	}

	// * If not found in staff, check in student * //

	/* This works since you cannot create duplicate/identical (same email/id) 
        accounts with different roles, therefore conflicts will not appear. */

	console.debug("Check Student");
	return prisma.student
		.findFirst({
			where: {
				AND: [{ email: email }],
			},
		})
		.then((studentUser) => {
			// * Compare hashed password with stored hashed password
			const passwordMatch = bcrypt.compareSync(password, studentUser.password);

			if (passwordMatch) {
				// * Passwords match, generate the token
				const token = jwt.sign(
					{ user: studentUser, role: "Student" },
					secretKey,
					rememberMe ? { expiresIn: "7d" } : { expiresIn: "1d" },
				);
				return NextResponse.json(
					{ token },
					{
						status: 200,
					},
				);
			}
			return NextResponse.json(
				{ error: "Invalid username or password" },
				{ status: 401 },
			);
		})
		.catch(() => {
			return NextResponse.json(
				{ error: "Invalid username or password" },
				{ status: 401 },
			);
		})
		.finally(() => {
			prisma.$disconnect();
			return NextResponse.json(
				{ error: "Invalid username or password" },
				{ status: 401 },
			);
		});
};
