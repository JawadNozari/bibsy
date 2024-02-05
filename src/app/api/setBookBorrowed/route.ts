//TODO: This code needs cleanup
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

export const GET = async () => {
	return NextResponse.json({ message: "Hello World" });
};

const prisma = new PrismaClient();

export const POST = async () => {
	const userInvNr = 2131534756;
	const selectedUser = { userType: "studentUser", id: 4 };
	const currentStaff = { id: 3 };

	// if the teacher is borrowing a book for self.
	if (selectedUser.userType === "staffUser") {
		try {
			const updateBook = await prisma.book.update({
				where: {
					invNr: userInvNr,
				},
				data: {
					available: false,
				},
			});
			const loanOut = await prisma.borrowedBooks.create({
				data: {
					bookId: updateBook.id,
					studentId: null,
					note: "Borrowed by staff for self",
					staffId: currentStaff.id,
				},
			});
			const userUpdate = await prisma.staff.update({
				where: {
					id: currentStaff.id,
				},
				data: {
					borrowed: {
						connect: {
							id: loanOut.id,
						},
					},
				},
			});
			const historyUpdate = await prisma.bookHistory.create({
				data: {
					Book: {
						connect: {
							id: updateBook.id,
						},
					},
					Staff: {
						connect: {
							id: currentStaff.id,
						},
					},
				},
			});
			return NextResponse.json({ historyUpdate, userUpdate, loanOut });
		} catch (error) {
			console.log(error);
			return NextResponse.json({ message: error });
		}
	} else if (selectedUser.userType === "studentUser") {
		try {
			const updateBook = await prisma.book.update({
				where: {
					invNr: userInvNr,
				},
				data: {
					available: false,
				},
			});
			const loanOut = await prisma.borrowedBooks.create({
				data: {
					bookId: updateBook.id,
					studentId: selectedUser.id,
					note: "Borrowed by student",
					staffId: currentStaff.id,
				},
			});
			const userUpdate = await prisma.student.update({
				where: {
					id: selectedUser.id,
				},
				data: {
					borrowed: {
						connect: {
							id: loanOut.id,
						},
					},
				},
			});
			const historyUpdate = await prisma.bookHistory.create({
				data: {
					Book: {
						connect: {
							id: updateBook.id,
						},
					},
					Staff: {
						connect: {
							id: currentStaff.id,
						},
					},
					Student: {
						connect: {
							id: selectedUser.id,
						},
					},
				},
			});
			return NextResponse.json({ historyUpdate, userUpdate, loanOut });
		} catch (error) {
			console.log(error);
			return NextResponse.json({ message: error });
		}
	}
};
