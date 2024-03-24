//TODO: Save the user to the database
import { NextResponse, type NextRequest } from "next/server";

export const GET = async () => {
	return NextResponse.json({ status: 405, message: "Method is not allowed" });
};
export const POST = async (req: NextRequest) => {
	const request = await req.json();
	const { firstName, lastName, email, password, image } = request;
	console.log("recived NextRequest");
	console.log(request);
	return NextResponse.json({
		status: 200,
		message: "Data recived successfully",
	});
};
