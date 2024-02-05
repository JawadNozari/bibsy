import { PrismaClient } from "@prisma/client";
import type { NextApiRequest } from "next";

const prisma = new PrismaClient();


export default async function edit(req: NextApiRequest) {
  if (req.method === "POST") {
    try {
      console.log(req.body);
      const{first, last, password, email, phone, qrCode, classroom} = req.body;
      const admin = Boolean(req.body.Admin);
      if (req.body.userType === "staff") {
        console.log("Staff");
      await prisma.staff.update({
        where: { id: req.body.id },
        data: { 
          firstName: first,
          lastName: last,
          password: password,
          email: email,
          phone: phone, 
          qrCode: qrCode,
          admin: admin
        },
      });
      }else {
        console.log("Student");
        await prisma.student.update({
          where: { id: req.body.id },
          data: { 
            firstName: first,
            lastName: last,
            password: password,
            email: email,
            phone: phone,
            qrCode: qrCode,
            classroom
          },
        });
      }
    }catch {
      console.log(Error);
    }
  }
}