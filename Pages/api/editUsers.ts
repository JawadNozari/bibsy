import { PrismaClient } from "@prisma/client";
import type { NextApiRequest } from "next";

const prisma = new PrismaClient();


export default async function edit(req: NextApiRequest) {
  if (req.method === "POST") {
    try {
      if (req.body.userType === "staff") {
      await prisma.staff.update({
        where: { id: req.body.id },
        data: { 
          firstName:req.body.firstname,
          lastName:req.body.lastname,
          password:req.body.password,
          email:req.body.email,
          phone:req.body.phone 
        },
      });
      }else {
        await prisma.student.update({
          where: { id: req.body.id },
          data: { 
            firstName:req.body.firstname,
            lastName:req.body.lastname,
            password:req.body.password,
            email:req.body.email,
            phone:req.body.phone 
          },
        });
      }
    }catch {
      console.log(Error);
    }
  }
}