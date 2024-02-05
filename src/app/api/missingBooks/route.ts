import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export const GET = async () => {
	return NextResponse.json({ message: "Hello World" });
};

const prisma = new PrismaClient();

export const POST = async (req: NextRequest, res: NextResponse) => {
	// try {
	//   if (req.body.userId !== 0 && req.body.userId !== null) {
	//     if (req.body.userType === "staff") {
	//       const response = await prisma.missingBooks.findMany({
	//         where: {
	//           staffId: req.body.userId,
	//         },
	//       });
	//       res.status(200).json({ books: response });
	//     } else {
	//       const response = await prisma.missingBooks.findMany({
	//         where: {
	//           studentId: req.body.userId,
	//         },
	//       });
	//       res.status(200).json({ books: response });
	//     }
	//   } else {
	// const response = await prisma.missingBooks.findMany();
	// res.status(200).json({ books: response });
	//   }
	// } catch (error) {
	//   console.log(error);
	//   res.status(404).json({ message: error });
	// }
	NextResponse.json({ message: "Convert this" });
};
