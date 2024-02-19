import { PrismaClient, Staff, Student } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";


const prisma = new PrismaClient();

export const POST = async (req: NextRequest) => {
  try {

    const secretKey = String(process.env.NEXT_PUBLIC_SECRET_KEY);

    // * Parse from request (../src/login)
    const body = await req.json();

    // * Assign credentials to variables
    const userInfo = {
      username: body.userCredentials.username, // ! USERNAME IS EMAIL !
      password: body.userCredentials.password,
      remember: body.remember
    };

    // * Find user that matches with given credentials
    return prisma.staff.findFirst({
      where: {
        AND: [
          { email: userInfo.username }
        ]
      }
    }).then((staffUser: Staff | null) => {

      // * Staff
      if (staffUser) {
        // * Compare hashed password with stored hashed password
        const passwordMatch = bcrypt.compareSync(userInfo.password, staffUser.password);

        if (passwordMatch) {
          // * Passwords match, proceed with generating the token
          const role = staffUser.admin ? "Admin" : "Staff";
          const token = jwt.sign({ user: staffUser, role }, secretKey, body.remember ? { expiresIn: "7d" } : { expiresIn: "1d"});
          return new NextResponse(JSON.stringify({ token }), { status: 200 });
        }
      }

        // * If not found in staff, check in student * //

        /* This works since you cannot create duplicate/identical (same email/id) 
        accounts with different roles, therefore conflicts will not appear. */

        return prisma.student.findFirst({
          where: {
            AND: [
              { email: userInfo.username }
            ]
          }
        }).then((studentUser: Student | null) => {

          // * Student
          if (studentUser) {
            // * Compare hashed password with stored hashed password
            const passwordMatch = bcrypt.compareSync(userInfo?.password, studentUser.password);
  
            if (passwordMatch) {
              // * Passwords match, generate the token
              const token = jwt.sign({ user: studentUser, role: "Student" }, secretKey, body.remember ? { expiresIn: "7d" } : { expiresIn: "1d" });
              return new NextResponse(JSON.stringify({ token }), { status: 200 });
            }
          }

            return new NextResponse(JSON.stringify({ error: "Invalid username or password" }), { status: 401 });
        });
    }).catch((error: Error) => {
      return new NextResponse(JSON.stringify({ error: error.message }), { status: 500 });
    }).finally(() => {
      prisma.$disconnect();
    });
  } catch (error) {
    return new NextResponse(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  }
};
