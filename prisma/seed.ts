/* eslint-disable no-unused-vars */
import { PrismaClient } from "@prisma/client";

//! Albin, snälla kör yarn lint och yarn build. Sen också sätt biome som default formatter, var typ 20 format fel i denna filen

const prisma = new PrismaClient();
async function seed() {
	const admin = await prisma.users.upsert({
		where: { id: 1 },
		update: {},
		create: {
			id: 1,
			firstName: "Admin",
			lastName: "Admin",
			username: "admin11",
			password: "123",
			email: "admin@admin.se",
			phone: "12233",
			image: "UploadedImage/testBild.png",
			qrCode: "123456789",
			isAdmin: true,
			isStaff: true,
			isStudent: false,
			Administrative: {
				create: {
					canEditLibrary: true,
					canEditUsers: true,
					fullAcess: true,
				},
			},
		},
	});

	const book = await prisma.book.upsert({
		where: { id: 1 },
		update: {},
		create: {
			id: 1,
			bookImg: "UploadedImage/testBild.png",
			title: "The King In Yellow",
			author: "You",
			publisher: "Me",
			publishedDate: new Date("2022-09-27 18:00:00.000"),
			regDate: new Date("2022-09-27 18:00:00.000"),
			isbn: "123456",

			inventoryNumber: 1,
			price: 123,
			available: false,
			isBorrowed: false,
			isMissing: false,
		},
	});
	const borrowed = await prisma.borrowedBooks.upsert({
		where: { id: 1 },
		update: {},
		create: {
			id: 1,
			bookId: 1,
			borrowedDate: new Date("2022-09-27 18:00:00.000"),
			note: "This is a test",
      borrowedBy: 1,
      borrowedTo: 1,
		},
	});
}
seed()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
