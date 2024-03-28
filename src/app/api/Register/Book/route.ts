import { NextResponse } from "next/server";

export const GET = async () => {
	return NextResponse.json({
		status: 405,
		message: "YOU SHOULD SEE THIS IF YOU ARE LOGGED IN",
	});
};
