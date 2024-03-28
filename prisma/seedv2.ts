// File: seed.ts

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
	// Create users
	await prisma.users.createMany({
		data: [
			{
			
				firstName: "John",
				lastName: "Doe",
				username: "johndoe",
				password: "password",
				email: "aa@aa.com",
				phone: "11111111",
				isAdmin: false,
				isStaff: true,
				isStudent: false,
				image: "users/img.png",
				qrCode: "123456789",
			},
			{
				
				firstName: "Jane",
				lastName: "Smith",
				username: "janesmith",
				password: "password",
				email: "aa1@aa.com",
				phone: "111431111",
				isAdmin: false,
				isStaff: false,
				isStudent: true,
				image: "users/img.png",
				qrCode: "12345556789",
			},
			// Add more users as needed
		],
	});

	// Create books
	await prisma.book.createMany({
		data: [
			{
				id: 1,
				bookImg: "image1.jpg",
				title: "Book Title 1",
				author: "Author 1",
				publisher: "Publisher 1",
				publishedDate: new Date(),
				regDate: new Date(),
				isbn: "123456789",
				inventoryNumber: 1,
				price: 10,
				available: true,
				isBorrowed: false,
				isMissing: false,
			},
			{
				id: 2,
				bookImg: "image2.jpg",
				title: "Book Title 2",
				author: "Author 2",
				publisher: "Publisher 2",
				publishedDate: new Date(),
				regDate: new Date(),
				isbn: "987654321",
				inventoryNumber: 2,
				price: 15,
				available: true,
				isBorrowed: false,
				isMissing: false,
			},
			// Add more books as needed
		],
	});

	// Create book history
	await prisma.bookHistory.createMany({
		data: [
			{ id: 1, regDate: new Date(), bookId: 1, returnedDate: 0 },
			{ id: 2, regDate: new Date(), bookId: 2, returnedDate: 0 },
			// Add more book history entries as needed
		],
	});

	// Create borrowed books
	await prisma.borrowedBooks.createMany({
		data: [
			{
				id: 1,
				borrowedDate: new Date(),
				note: "Note 1",
				bookId: 1,
				borrowedBy: 1,
				borrowedTo: 2,
			},
			{
				id: 2,
				borrowedDate: new Date(),
				note: "Note 2",
				bookId: 2,
				borrowedBy: 2,
				borrowedTo: 1,
			},
			// Add more borrowed books as needed
		],
	});

	// Create class rooms
	await prisma.classRoom.createMany({
		data: [
			{
				id: 1,
				password: "classroom123",
				firstName: "Teacher",
				lastName: "One",
				email: "teacher@example.com",
				phone: "5551234567",
				image: "teacher.jpg",
				qrCode: "classroom1_qr",
				classroom: "Classroom 1",
			},
			{
				id: 2,
				password: "classroom456",
				firstName: "Teacher",
				lastName: "Two",
				email: "teacher2@example.com",
				phone: "5559876543",
				image: "teacher2.jpg",
				qrCode: "classroom2_qr",
				classroom: "Classroom 2",
			},
			// Add more class rooms as needed
		],
	});

	// Create missing books
	await prisma.missingBooks.createMany({
		data: [
			{
				id: 1,
				regDate: new Date(),
				note: "Missing note 1",
				staffId: 1,
				studentId: 2,
				bookId: 1,
			},
			{
				id: 2,
				regDate: new Date(),
				note: "Missing note 2",
				staffId: 2,
				studentId: 1,
				bookId: 2,
			},
			// Add more missing books as needed
		],
	});
	// Create administrative users
	await prisma.administrative.createMany({
		data: [
			{ id: 1, canEditLibrary: true, canEditUsers: true, fullAcess: true },
			{ id: 2, canEditLibrary: false, canEditUsers: true, fullAcess: false },
			// Add more administrative users as needed
		],
	});
}

main()
	.catch((e) => console.error(e))
	.finally(async () => {
		await prisma.$disconnect();
	});
