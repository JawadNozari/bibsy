import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export const GET = async () => {
	return NextResponse.json({ message: "This Method is not Allowed" });
};

const prisma = new PrismaClient();
export const POST = async (req: NextRequest) => {
	const data = await req.json();
	if (data === undefined) {
		return NextResponse.json(
			{ message: "Malformed request syntax, Invalid request message framing" },
			{ status: 400 },
		);
	}
	const { id, title, author, publisher, invNr, price, image, isbn, published } = data;

	if (
		!id ||
		!title ||
		!author ||
		!publisher ||
		!invNr ||
		!price ||
		!image ||
		!isbn ||
		!published
	) {
		return NextResponse.json(
			{
				message: "Missing required data. Please provide all necessary fields.",
			},
			{ status: 400 },
		);
	}

	return await prisma.book
		.update({
			where: { id: id },
			data: {
				title: title,
				author: author,
				publishers: publisher,
				invNr: invNr,
				price: price,
				isbn: isbn, // ISBN Max Length is 9
				bookImg: image,
			},
		})
		.then((edit) => {
			return NextResponse.json(edit, { status: 200 });
		})
		.catch((error:Error) => {
			console.debug(error);
			return NextResponse.json(
				{
					message:
						"Validation Error. This can be cuased becuase of mallformed Data (Check Data Type)",
				},
				{ status: 500 },
			);
		})
		.finally(() => {
			prisma.$disconnect();
		});
};
