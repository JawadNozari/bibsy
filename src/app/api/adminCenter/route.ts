import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

export const GET = async () => {
	return NextResponse.json({ message: "GET METHOD IS NOT ALLOWED" });
};

const prisma = new PrismaClient();
type Data = {
   password: string,
   firstName: string,
   lastName: string,
   email: string,
   phone: string,
   image: string,
   studentClass: string,
   qrCode: string,
};

export const GET = async (req: NextRequest, res: NextResponse) => {
	return NextResponse.json("Hello World!");
}

// Handler function for handling student registration
export const POST = async (req: NextRequest, res: NextResponse) => {
   // Check if the request method is POST
   const resp = await req.formData();

   const firstname = resp.get("firstName") as string;
   const lastname = resp.get("lastName") as string;
   const email = resp.get("email") as string;
   const phone = resp.get("phone") as string;
   const password = resp.get("password") as string;
   const image = resp.get("image") as string;
   const studentClass = resp.get("studentClass") as string;
   const qrCode = Number(resp.get("qrCode"));

   const data: Data = {
	  password,
	  firstName: firstname,
	  lastName: lastname,
	  email,
	  phone,
	  image,
	  studentClass,
	  qrCode:qrCode.toString(),
   };
   const student = await prisma.student.create({
	  data,
   });



	return resp;
}
