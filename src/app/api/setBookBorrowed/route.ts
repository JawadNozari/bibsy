import { PrismaClient } from "@prisma/client";
import { NextResponse, NextRequest } from "next/server";

/* export const GET = async () => {
	return NextResponse.json({ message: "Hello World" });
}; */

// Declare Prisma Client
const prisma = new PrismaClient();

export const POST = async (req: NextRequest) => {
	// Extract data from the request
	const data = await req.json();
	const userInvNr = parseInt(data.invNr);
	const selectedUserType = data.user.admin ? "staffUser" : "studentUser";

	// Get current staff member
	const currentStaffId = 1; // Hardcoded for now
	//! MAX FIX THIS!!!!
	// biome-ignore lint/suspicious/noImplicitAnyLet: <explanation>
	let staff;

	try {
		staff = await prisma.staff.findUnique({
			where: { id: currentStaffId },
		});
	} catch (error) {
		return NextResponse.json(
			{ message: "Error locating staff member", error },
			{ status: 500 },
		);
	}

	try {
		// Update the book to be unavailable
		const updatedBook = await prisma.book.update({
			where: { invNr: userInvNr },
			data: { available: false },
		});

		// Create a new borrowedBooks entry
		const loanOut = await prisma.borrowedBooks.create({
			data: {
				bookId: updatedBook.id,
				staffId: currentStaffId,
				studentId:
					selectedUserType === "studentUser" ? data.user.id : undefined,
				note: `${staff?.firstName} ${staff?.lastName} has successfully loaned out a book.`,
			},
		});

		// Update the user (staff or student) to have the borrowed book
		const connectField = selectedUserType === "staffUser" ? "staff" : "student";
		//! MAX FIX THIS!!!!
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		await (prisma as any)[connectField].update({
			where: { id: data.user.id },
			data: { borrowed: { connect: { id: loanOut.id } } },
		});

		// Create a new bookHistory entry
		await prisma.bookHistory.create({
			data: {
				Book: { connect: { id: updatedBook.id } },
				Staff: { connect: { id: currentStaffId } },
				...(selectedUserType === "studentUser" && {
					Student: { connect: { id: data.user.id } },
				}),
			},
		});

		// Return success response
		return NextResponse.json({
			message: `Successfully loaned out a book to ${
				selectedUserType === "studentUser" ? "student" : "staff"
			} ${data.user.firstName} ${data.user.lastName}.`,
		});
	} catch (error) {
		console.error("Error:", error);
		return NextResponse.json(
			{ message: "Internal server error", error },
			{ status: 500 },
		);
	} finally {
		// Disconnect from the database
		await prisma.$disconnect();
	}
};
