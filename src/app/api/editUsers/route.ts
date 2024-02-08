
import { PrismaClient } from "@prisma/client";
import { NextResponse, NextRequest} from "next/server";
import path from "path";
import { writeFile, mkdir } from "fs/promises";

export const GET = async () => {
	return NextResponse.json({ message: "This method is Not impelemented Yet!" });
};

const prisma = new PrismaClient();

export const POST = async (req: NextRequest, res: NextResponse) => {
	try {
		const formData = await req.formData();
			console.log(formData);
			const file = formData.get("file");
			const Id = formData.get("id");
			const userType = formData.get("userType") as string;
			const first = formData.get("first") as string;
			const last = formData.get("last") as string;
			const password = formData.get("password") as string;
			const email = formData.get("email") as string;
			const phone = formData.get("phone") as string;
			const qrCode = formData.get("qrCode") as string;
			const studentclass = formData.get("studentclass") as string;
			const Admin = formData.get("Admin") as string;

			const admin = Boolean(Admin);
			const id = Number(Id);

			const buffer = Buffer.from(await (file as File).arrayBuffer());
			const filename = (file as File).name.replaceAll(" ", "_");
			const uploadDirectory = path.join(process.cwd(), "public/UploadedImage");

			console.log(filename);
			// Create the directory if it doesn't exist
			await mkdir(uploadDirectory, { recursive: true });
			await writeFile(path.join(uploadDirectory, filename), buffer);
	
			if (userType === "staff") {
			  console.log("Staff");
			await prisma.staff.update({
			  where: { id: id },
			  data: { 
				image: `UploadedImage/${filename}`,
				firstName: first,
				lastName: last,
				password: password,
				email: email,
				phone: phone, 
				qrCode: qrCode,
				admin: admin
			  },
			});
			prisma.$disconnect();
			return NextResponse.json({ message: "Staff Edited, "});
			}else {
			  console.log("Student");
			const stn = await prisma.student.update({
				where: { id: id },
				data: { 
				  image: `UploadedImage/${filename}`,
				  firstName: first,
				  lastName: last,
				  password: password,
				  email: email,
				  phone: phone,
				  qrCode: qrCode,
				  classroom: studentclass
				},
			  });
			  console.log(stn);
			  prisma.$disconnect();
			  return NextResponse.json({ message: "Stundent Edited, "});
			}
	}catch {
	  console.log(Error);
	  prisma.$disconnect();
  }
};
