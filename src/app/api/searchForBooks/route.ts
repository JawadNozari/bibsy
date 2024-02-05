import { Book, PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export const GET = async () => {
	return NextResponse.json({ message: "Hello World" });
};

const prisma = new PrismaClient();

//?? I just made the existing code work. But I think you can make it better!!!!
//TODO Recommendation: separate the code into smaller functions for better readability and maintainability
//TODO Recommendation: We don't need to use the a lot of if statements
//TODO Recommendation: instead you can make smaller functions and call them in the main function
export const POST = async (req: NextRequest) => {
	const request = await req.json();
	const listType = request.listType;
	const bookTitle = request.bookTitle;

	if (listType === "missing") {
		return await prisma.missingBooks
			.findMany({
				// where: {
				// 	//missing: true,
				// 	bookId: book.id,
				// },
			})
			.then((missing) => {
				return NextResponse.json(missing, { status: 200 });
			})
			.catch((error) => {
				return NextResponse.json({ message: error }, { status: 500 });
			})
			.finally(() => {
				prisma.$disconnect();
			});

		//!!!! Danger ZONE !!!!
		//!!!! The code below is not efficient
		//!!!! This will hammer down the server if the database is large
		//!!!! We should not go through the whole database to check if the book is missing or not
		//TODO add missing column in book table with type boolean and default value false

		// try {
		// 	queriedBooks.map(async (book: any) => {
		// 		const borrowedBook = await prisma.missingBooks.findMany({
		// 			where: {
		// 				bookId: book.id,
		// 			},
		// 		});
		// 		if (borrowedBook.length === 0) {
		// 			const index = queriedBooks.indexOf(book);
		// 			queriedBooks.splice(index, 1);
		// 		}
		// 	});
		// 	res.status(200).json({ books: queriedBooks });
		// 	prisma.$disconnect();
		// } catch (error) {
		// 	console.log(error);
		// 	res.status(404).json({ message: error });
		// 	prisma.$disconnect();
		// }
	}
	return await prisma.book
		.findMany({
			where: {
				title: {
					contains: bookTitle,
					mode: "insensitive",
				},
			},
		})
		.then((books) => {
			console.log(books);
			if (listType === "available") {
				return NextResponse.json(
					books.filter((book: Book) => book.available === true),
					{ status: 200 },
				);
				// console.log(
				// 	`THIS COMES FROM CONSOLE: ${books.filter(
				// 		(book: Book) => book.available === true,
				// 	)}`,
				// );
				// try {
				// 	queriedBooks.map((book: Book) => {
				// 		if (book.available !== false) {
				// 			sendableBooks.push(book);
				// 		}
				// 	});
				// 	res.status(200).json({ books: sendableBooks });
				// } catch (error) {
				// 	console.log(error);
				// 	res.status(404).json({ message: error });
				// 	prisma.$disconnect();
				// }
			}
			
			if (listType === "borrowed") {
				return NextResponse.json(
					books.filter((book: Book) => book.available === false),
					{ status: 200 },
				);
				// queriedBooks.map(async (book: any) => {
				// 	const borrowedBook = await prisma.borrowedBooks.findMany({
				// 		where: {
				// 			bookId: book.id,
				// 		},
				// 	});
				// 	if (borrowedBook.length === 0) {
				// 		const index = queriedBooks.indexOf(book);
				// 		queriedBooks.splice(index, 1);
				// 	}
				// });
				// res.status(200).json({ books: queriedBooks });
				// prisma.$disconnect();
			}
		})
		.catch((error) => {
			return NextResponse.json({ message: error }, { status: 500 });
		})
		.finally(() => {
			prisma.$disconnect();
		});
};
