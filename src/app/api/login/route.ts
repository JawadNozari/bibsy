import { PrismaClient, Staff, Student } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

//TODO: 1. Restrict access without token (Authorization) 2. Implement 'remember me' feature

export const POST = async (req: NextRequest) => {
  try {

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
          { email: userInfo.username },
          { password: userInfo.password },
          { admin: true }
        ]
      }
    }).then((staffUser: Staff | null) => {
      if (staffUser) {
        const token = jwt.sign({ user: staffUser }, "staff", { expiresIn: "1h" });
        return new NextResponse(JSON.stringify({ token }), { status: 200 });
      } else {

        // * If not found in staff, check in student
        
        /* This works since you cannot create duplicate/identical (same email/id) 
        accounts with different roles, therefore conflicts will not appear. */

        return prisma.student.findFirst({
          where: {
            AND: [
              { email: userInfo.username },
              { password: userInfo.password }
            ]
          }
        }).then((studentUser: Student | null) => {
          if (studentUser) {
            const token = jwt.sign({ user: studentUser }, "student", { expiresIn: "1h" });
            return new NextResponse(JSON.stringify({ token }), { status: 200 });
          } else {
            return new NextResponse(JSON.stringify({ error: "Invalid username or password" }), { status: 401 });
          }
        });
      }
    }).catch((error: Error) => {
      return new NextResponse(JSON.stringify({ error: error.message }), { status: 500 });
    }).finally(() => {
      prisma.$disconnect();
    });
  } catch (error) {
    return new NextResponse(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  }
};

export const GET = async () => {

};
