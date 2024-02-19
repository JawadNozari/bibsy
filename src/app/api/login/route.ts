import { PrismaClient, Staff, Student } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

//TODO: 1. Implement 'remember me' feature

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
          { email: userInfo.username },
          { password: userInfo.password },
        ]
      }
    }).then((staffUser: Staff | null) => {

      // * Staff (non-admin)
      if (staffUser && body.remember) { // Remember me

        const token = jwt.sign({ user: staffUser, role: "Staff" }, secretKey, { expiresIn: "7d" });
        return new NextResponse(JSON.stringify({ token }), { status: 200 });

      } if (staffUser && !body.remember) { // Do not remember me

        const token = jwt.sign({ user: staffUser, role: "Staff" }, secretKey);
        return new NextResponse(JSON.stringify({ token }), { status: 200 });

        // * Staff (admin)
      } if (staffUser && staffUser.admin === true && body.remember) { // Remember me

        const token = jwt.sign({ user: staffUser, role: "Admin" }, secretKey, { expiresIn: "7d" });
        return new NextResponse(JSON.stringify({ token }), { status: 200 });

      } if (staffUser?.admin && !body.remember) { // Do not remember me

        const token = jwt.sign({ user: staffUser, role: "Admin" }, secretKey);
        return new NextResponse(JSON.stringify({ token }), { status: 200 });

      }

        // * If not found in staff, check in student * //

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

          // * Student
          if (studentUser && body.remember) { // Remember me

            const token = jwt.sign({ user: studentUser, role: "Student" }, secretKey, { expiresIn: "7d" });
            return new NextResponse(JSON.stringify({ token }), { status: 200 });

          } if (studentUser && !body.remember) { // Do not remember me

            const token = jwt.sign({ user: studentUser, role: "Student" }, secretKey);
            return new NextResponse(JSON.stringify({ token }), { status: 200 });

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

export const GET = async () => {

};
