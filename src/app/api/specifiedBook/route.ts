import { PrismaClient, borrowedBooks } from "@prisma/client";
import { NextResponse, NextRequest } from "next/server";

const prisma = new PrismaClient();

const fetchbook = async (id: number, bookdata: Array<object>) => {
	try {
		const book = await prisma.book.findUnique({
			where: { id: id },
		});
		if (book !== null) {
			bookdata.push(book);
            prisma.$disconnect();
		} else {
            console.log("Fail");
            prisma.$disconnect();
			return NextResponse.json(
				{
					message:
						"Validation Error. This can be cuased becuase of mallformed Data (Check Data Type)",
				},
				{ status: 500 },
			);
		}
        return(bookdata);
	} catch {
		// Extra error checking
		console.debug(Error);
		return NextResponse.json(
			{
				message:
					"FormData Error. This can be cuased becuase of mallformed Data (Check Data Type)",
			},
			{ status: 500 },
		);
	}
};
export const POST = async (req: NextRequest) => {
	try {
		const { books } = await req.json();
		const bookdata: object[] = [];
		await Promise.all(books.map(async (book: borrowedBooks) => {
            await fetchbook(book.bookId, bookdata);
		}));
		return NextResponse.json(bookdata);
	} catch (error) {
		// If there is an error, return the error
		return NextResponse.json({ error: error });
	} finally {
		// Disconnect from the database
		await prisma.$disconnect();
	}
};
