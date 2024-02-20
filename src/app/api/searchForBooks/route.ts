import {
	missingBooks,
	Book,
	PrismaClient,
	borrowedBooks,
} from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

//* Function that gets all of the missing books from the DB and sends it back
const getMissingBooks = async (): Promise<missingBooks[]> => {
	try {
		return await prisma.missingBooks.findMany();
	} catch (error) {
		console.error("Error fetching missing books:", error);
		throw error;
	}
};

//* Function that gets all of the registered books from the DB and sends them back
const getBooks = async (bookTitle: string): Promise<Book[]> => {
	try {
		return await prisma.book.findMany({
			where: {
				title: {
					contains: bookTitle,
					mode: "insensitive",
				},
			},
		});
	} catch (error) {
		console.error("Error fetching books:", error);
		throw error;
	}
};

//* Function that gets all of the borrowed books from the DB and sends them all back
const getBorrowedBooks = async (): Promise<borrowedBooks[]> => {
	try {
		return await prisma.borrowedBooks.findMany();
	} catch (error) {
		console.error("Error fetching borrowed books:", error);
		throw error;
	}
};

//* If the request is POST then run this
export const POST = async (req: NextRequest) => {
	const request = await req.json();

	//* Declares the needed arrays
	const missingBooks: missingBooks[] = [];
	const fetchedBooks: Book[] = [];
	let queriedBooks: Book[] = [];
	const borrowedBooks: borrowedBooks[] = [];

	//* Declares the inputted values
	const listType = request.listType;
	const bookTitle = request.bookTitle;

	//* Checks if the listType exist
	if (!listType) {
		return NextResponse.json(
			{ message: "Missing one or more requirements" },
			{ status: 400 },
		);
	}

	//* Fetch all registered books
	try {
		const books = await getBooks(bookTitle);
		books.map((book) => {
			fetchedBooks.push(book);
		});
	} catch (error) {
		console.error(error);
		fetchedBooks.push();
	}

	//* Switch that runs functions depending on value
	try {
		switch (listType) {
			case "missing":
				try {
					const missing = await getMissingBooks();

					missing.map((book) => {
						missingBooks.push(book);
					});
				} catch (error) {
					console.log(error);
				}

				//* Filters through the array and compares id's, if matching add to queriedBooks
				queriedBooks = fetchedBooks.filter((book: Book) =>
					missingBooks.some((missingBook) => book.id === missingBook.bookId),
				);

				//* Sorts the array by largest id
				queriedBooks.sort((a, b) => {
					return b.id - a.id;
				});
				return NextResponse.json({ books: queriedBooks }, { status: 200 });

			case "borrowed":
				try {
					const borrowed = await getBorrowedBooks();
					borrowed.map((book) => {
						borrowedBooks.push(book);
					});
				} catch (error) {
					console.log(error);
				}

				//* Filters through the array and compares id's, if matching add to queriedBooks
				queriedBooks = fetchedBooks.filter((book: Book) =>
					borrowedBooks.some((borrowedBook) => book.id === borrowedBook.bookId),
				);

				//* Sorts the array by largest ID
				queriedBooks.sort((a, b) => {
					return b.id - a.id;
				});
				return NextResponse.json({ books: queriedBooks }, { status: 200 });

			case "available":
				//* Sorts by largest ID
				fetchedBooks.sort((a, b) => {
					return b.id - a.id;
				});

				//* Returns the books that are available
				return NextResponse.json(
					fetchedBooks.filter((book) => book.available === true),
					{ status: 200 },
				);

			default:
				//* Sorts by largest ID
				fetchedBooks.sort((a, b) => {
					return b.id - a.id;
				});
				return NextResponse.json({ books: fetchedBooks }, { status: 200 });
		}
	} catch (error) {
		//* If error, catch and send an error message to the client
		console.error("Error:", error);
		return NextResponse.json(
			{ message: "Internal server error" },
			{ status: 500 },
		);
	}
};

//* If the request is GET then send an error message, because this is only POST
export const GET = async (): Promise<NextResponse> => {
	return NextResponse.json({ message: "GET Method is not allowed" });
};
