import { missingBooks, Book, PrismaClient, borrowedBooks } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export const GET = async () => {
	return NextResponse.json({ message: "Hello World" });
};

const prisma = new PrismaClient();

const getMissingBooks = async (): Promise<missingBooks[]>  => {
	return await prisma.missingBooks
		.findMany()
		.then((missing) => {
			return missing;
		})
		.catch((error: Error) => {
			console.log(error);
			return [];
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
		.then((books) => {
			return books;
		})
		.catch((error: Error) => {
			console.log(error);
			return [];
		});
};

const getBorrowedBooks = async () => {
	return await prisma.borrowedBooks
		.findMany()
		.then((borrowed) => {
			return borrowed;
		})
		.catch((error: Error) => {
			console.log(error);
			return [];
		});
};

//?? I just made the existing code work. But I think you can make it better!!!!
//TODO Recommendation: separate the code into smaller functions for better readability and maintainability
//TODO Recommendation: We don't need to use the a lot of if statements
//TODO Recommendation: instead you can make smaller functions and call them in the main function
//TODO Recommendation: You can use a switch statement to handle the different list types
//TODO Add a check for missing input requirements

//type queriedBooks = Book[]| missingBooks[]| borrowedBooks[];


export const POST = async (req: NextRequest) => {
	const request = await req.json();
	const missingBooks: missingBooks[] = [];
	const fetchedBooks: Book[] = [];
	const queriedBooks: Book[] = [];
	const borrowedBooks: borrowedBooks[] = [];
	const listType = request.listType;
	const bookTitle = request.bookTitle;
	
	try {
		const books = await getBooks(bookTitle);
		books.map((book) => {
			console.log(book);
			fetchedBooks.push(book);
		});

	} catch (error) {
		console.error(error);
		fetchedBooks.push();
	}

	if (listType === "missing") {
		try{
			const missing = await getMissingBooks();
			missing.map((book) => {
				missingBooks.push(book);
			});
		}
		catch(error){
			console.log(error);
		}
		fetchedBooks.map((book) => {
			missingBooks.map((missingBook) => {
				if (book.id === missingBook.bookId) {
					queriedBooks.push(book);
				}
			});
		});
		queriedBooks.sort((a, b) => {
			return b.id - a.id;
		});
		return NextResponse.json({ books: queriedBooks }, { status: 200 });
	}

	if (listType === "borrowed") {
		try{
			const borrowed = await getBorrowedBooks();
			borrowed.map((book) => {
				borrowedBooks.push(book);
			});
		}
		catch(error){
			console.log(error);
		}
		fetchedBooks.map((book) => {
			borrowedBooks.map((borrowedBook) => {
				if (book.id === borrowedBook.bookId) {
					queriedBooks.push(book);
				}
			});
		});
		queriedBooks.sort((a, b) => {
			return b.id - a.id;
		});
		return NextResponse.json({ books: queriedBooks }, { status: 200 });
	}
	if (listType === "available") {
		fetchedBooks.sort((a, b) => {
			return b.id - a.id;
		});
		return NextResponse.json(
			fetchedBooks.filter((book) => book.available === true),
			{ status: 200 },
		);
	}
	// if listType is not available, missing, or borrowed
	fetchedBooks.sort((a, b) => {
		return b.id - a.id;
	});
	return NextResponse.json({ books: fetchedBooks }, { status: 200 });
};


/* 
import {
	Book,
	PrismaClient,
	borrowedBooks,
	missingBooks,
} from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

const getMissingBooks = async (): Promise<missingBooks[]> => {
	try {
		return await prisma.missingBooks.findMany();
	} catch (error) {
		console.error("Error fetching missing books:", error);
		throw error;
	}
};

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

const getBorrowedBooks = async (): Promise<borrowedBooks[]> => {
	try {
		return await prisma.borrowedBooks.findMany();
	} catch (error) {
		console.error("Error fetching borrowed books:", error);
		throw error;
	}
}; */

// export const POST = async (req: NextRequest): Promise<NextResponse> => {
// 	const request = await req.json();
// 	const { listType, bookTitle } = request;

// 	if (!listType || !bookTitle) {
// 		return NextResponse.json(
// 			{ message: "Missing one or more requirements" },
// 			{ status: 400 },
// 		);
// 	}
// 	try {
// 		let queriedBooks: Book[] = [];

// 		if (listType === "missing") {
// 			const missingBooks = await getMissingBooks();
// 			const fetchedBooks = await getBooks(bookTitle);
// 			queriedBooks = fetchedBooks.filter((book: Book) =>
// 				missingBooks.some((missingBook) => book.id === missingBook.bookId),
// 			);
// 		} else if (listType === "borrowed") {
// 			const borrowedBooks = await getBorrowedBooks();
// 			const fetchedBooks = await getBooks(bookTitle);
// 			queriedBooks = fetchedBooks.filter((book: Book) =>
// 				borrowedBooks.some((borrowedBook) => book.id === borrowedBook.bookId),
// 			);
// 		} else if (listType === "available") {
// 			queriedBooks = await getBooks(bookTitle);
// 			queriedBooks = queriedBooks.filter(
// 				(book: Book) => book.available === true,
// 			);
// 		} else {
// 			queriedBooks = await getBooks(bookTitle);
// 		}

// 		queriedBooks.sort((a: Book, b: Book) => b.id - a.id);
// 		return NextResponse.json({ books: queriedBooks }, { status: 200 });
// 	} catch (error) {
// 		console.error("Error:", error);
// 		return NextResponse.json(
// 			{ message: "Internal server error" },
// 			{ status: 500 },
// 		);
// 	} finally {
// 		await prisma.$disconnect();
// 	}
// };

// export const GET = async (): Promise<NextResponse> => {
// 	return NextResponse.json({ message: "GET Method is not allowed" });
// };