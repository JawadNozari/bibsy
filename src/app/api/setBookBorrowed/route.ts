//TODO: This code needs cleanup
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

//* Declare Prisma Client
const prisma = new PrismaClient();

//* Export POST method, mainly for setting a book as borrowed
export const POST = async (req:NextRequest) => {
	console.log("grpae");
	//* Data from the request (form data)
	const data = await req.json();
	// Convert the invNr to a number
	const userInvNr = parseInt(data.invNr);
	const selectedUser = { userType: "", id: data.user.id };

	//* Determine the user type
	if(Object.hasOwn(data.user, "admin")) {
		selectedUser.userType = "staffUser";
		console.log("userType",selectedUser.userType);
	} else {
		selectedUser.userType = "studentUser";
	}

	//* Current staff member, (for now hardcoded)
	//TODO: Change this to the staff member that is currently logged in
	const currentStaff = { id: 3 };
	let staff = undefined;

	// Find the staff member that is currently logged in
	try {
		staff = await prisma.staff.findUnique({
			where: {
				id: currentStaff.id,
			},
		});
	} catch (error) {
		return NextResponse.json({ "Error on location the saff member": error });
	}

	// if the teacher is borrowing a book for self.
	if (selectedUser.userType === "staffUser") {
		try {
			// Update the book to be unavailable
			const updateBook = await prisma.book.update({
				where: {
					invNr: userInvNr,
				},
				data: {
					available: false,
				},
			});
			// Create a new borrowedBooks entry
			const loanOut = await prisma.borrowedBooks.create({
				data: {
					bookId: updateBook.id,
					staffId: currentStaff.id,
					note: `${staff.firstName} ${staff.lastName} id:${staff.id} has successfully loaned out a book.`,	
				},
			});
			// Update the staff member to have the borrowed book, connect the borrowed book to the staff member
			await prisma.staff.update({
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
			// Create a new bookHistory entry, connect the book and the staff member
			await prisma.bookHistory.create({
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

			//* Return a response, with the success message
			return NextResponse.json({ message: `Staff member: ${staff.firstName} ${staff.lastName} has successfully loaned a book.` });

			//! If there is an error, return the error message
			} catch (error) {
				console.log(error);
				return NextResponse.json({ message: error },{ status: 500 });
			} finally {
				// Disconnect from the database
				await prisma.$disconnect();
			}
	} 
	// If the staff member is borrowing a book for a student
	else if (selectedUser.userType === "studentUser") {
		try {
			// Update the book to be unavailable
			const updateBook = await prisma.book.update({
				where: {
					invNr: userInvNr,
				},
				data: {
					available: false,
				},
			});
			// Create a new borrowedBooks entry
			const loanOut = await prisma.borrowedBooks.create({
				data: {
					bookId: updateBook.id,
					studentId: selectedUser.id,
					note: `${staff.firstName} ${staff.lastName} loaned a book to ${data.user.firstName} ${data.user.lastName}.`,
					staffId: currentStaff.id,
				},
			});
			// Update the student to have the borrowed book, connect the borrowed book to the student
			await prisma.student.update({
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
			// Create a new bookHistory entry, connect the book, the staff member and the student
			await prisma.bookHistory.create({
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
			//* Return a response, with the success message
			return NextResponse.json({ message: `${staff.firstName} ${staff.lastName} has successfully loaned out a book to ${data.user.firstName} ${data.user.lastName}.` });
		} 
		//! If there is an error, return the error message
		catch (error) {
			console.log(error);
			return NextResponse.json({ message: error },{ status: 500 });
		} finally {
			// Disconnect from the database
			await prisma.$disconnect();
		}
	}
};