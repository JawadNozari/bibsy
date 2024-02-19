// import axios from "axios";
import { NextResponse } from "next/server";
import example from "./example.json";
export const GET = async () => {
	// This function is just an example.
	// fix your own later!!!!

	// const resp = await axios.get("http://localhost:3001/weeks").then((res) => {
	// 	return res.data;
	// });

	return NextResponse.json(example);
};
