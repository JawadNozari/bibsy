import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export default async function main(
  req: NextApiRequest, 
  res: NextApiResponse
  ) {
   try {

      var userInfo = {
        username: req.body.userCredentials.username, // USERNAME IS EMAIL
        password: req.body.userCredentials.password,
        remember: req.body.remember
      };

      const checkLoginStaff = await prisma.staff.findFirst({
        where: {
          AND: [
            { email: userInfo.username },
            { password: userInfo.password},
            { admin: true }
          ]
        }
      });

      const checkLoginStudent = await prisma.student.findFirst({
        where: {
          AND: [
            { email: userInfo.username },
            { password: userInfo.password }
          ]
        }
      });

      console.log(checkLoginStudent);

      if (checkLoginStaff || checkLoginStudent) {
        const token = jwt.sign({ username: userInfo.username, timestamp: Date.now() }, "your-secret-key", { expiresIn: "1h" });
        res.status(200).json({ token });
      } else {
        res.status(401).json({ error: "Invalid credentials" });
      }

      res.status(200);

    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    } finally {
      await prisma.$disconnect();
  }
}
