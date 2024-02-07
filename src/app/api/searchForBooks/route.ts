import { Book, PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export const GET = async () => {
	return NextResponse.json({ message: "Hello World" });
};

const prisma = new PrismaClient();

const getMissingBooks = async () => {
	return await prisma.missingBooks
		.findMany()
		.then((missing: []) => {
			return missing;
		})
		.catch((error: Error) => {
			return error;
		});
};

const getBooks = async (bookTitle: string) => {
	return await prisma.book
		.findMany({
			where: {
				title: {
					contains: bookTitle,
					mode: "insensitive",
				},
			},
		})
		.then((books: []) => {
			return books;
		})
		.catch((error: Error) => {
			return error;
		});
};

const getBorrowedBooks = async () => {
	return await prisma.borrowedBooks
		.findMany()
		.then((borrowed: []) => {
			return borrowed;
		})
		.catch((error: Error) => {
			return error;
		});
};

//?? I just made the existing code work. But I think you can make it better!!!!
//TODO Recommendation: separate the code into smaller functions for better readability and maintainability
//TODO Recommendation: We don't need to use the a lot of if statements
//TODO Recommendation: instead you can make smaller functions and call them in the main function
//TODO Recommendation: You can use a switch statement to handle the different list types

export const POST = async (req: NextRequest) => {
	const request = await req.json();
	const missingBooks: Array<[]> = [];
	const fetchedBooks: Array<[]> = [];
	const queriedBooks: Array<[]> = [];
	const borrowedBooks: Array<[]> = [];
	const listType = request.listType;
	const bookTitle = request.bookTitle;

	fetchedBooks.push(await getBooks(bookTitle));

	if (listType === "missing") {
		missingBooks.push(await getMissingBooks());
		fetchedBooks[0].map((book: Book) => {
			missingBooks[0].map((missingBook: Book) => {
				if (book.id === missingBook.bookId) {
					queriedBooks.push(book);
				}
			});
		});
		queriedBooks.sort((a: Book, b: Book) => {
			return b.id - a.id;
		});
		return NextResponse.json({ books: queriedBooks }, { status: 200 });
	}

	if (listType === "borrowed") {
		borrowedBooks.push(await getBorrowedBooks());
		fetchedBooks[0].map((book: Book) => {
			borrowedBooks[0].map((borrowedBook: Book) => {
				if (book.id === borrowedBook.bookId) {
					queriedBooks.push(book);
				}
			});
		});
		queriedBooks.sort((a: Book, b: Book) => {
			return b.id - a.id;
		});
		return NextResponse.json({ books: queriedBooks }, { status: 200 });
	}
	if (listType === "available") {
		fetchedBooks[0].sort((a: Book, b: Book) => {
			return b.id - a.id;
		});
		return NextResponse.json(
			fetchedBooks[0].filter((book: Book) => book.available === true),
			{ status: 200 },
		);
	}
	// if listType is not available, missing, or borrowed
	fetchedBooks[0].sort((a: Book, b: Book) => {
		return b.id - a.id;
	});
	return NextResponse.json({ books: fetchedBooks[0] }, { status: 200 });
};
