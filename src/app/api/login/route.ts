import { PrismaClient, Staff } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

//TODO: 1. Student authentication 2. Restrict access without token (Authorization) 3. Implement 'remember me' feature 4? Password hash

export const POST = async (req: NextRequest) => {
  try {

    // Parse from request (../src/login)
    const body = await req.json();

    // Assign credentials to variables
    const userInfo = {
      username: body.userCredentials.username, // ! USERNAME IS EMAIL
      password: body.userCredentials.password,
      remember: body.remember
    };

    // Find user that matches with given credentials
    return await prisma.staff //* Currently only for staff
      .findFirst({
        where: {
          AND: [
            { email: userInfo.username },
            { password: userInfo.password },
            { admin: true }
          ]
        }
      })

      // Give token/cookie on login (session)
      .then((user: Staff | null) => {
        if (user) {
          const token = jwt.sign({ user }, "admin", { expiresIn: "1h" });
          const response = new NextResponse(JSON.stringify({ token }), { status: 200 });
          return response;
        } else {
          return new NextResponse(JSON.stringify({ error: "Invalid username or password" }), { status: 401 });
        }
      })
      .catch((error: Error) => {
        return new NextResponse(JSON.stringify({ error: error.message }), { status: 500 });
      })
      .finally(() => {
        prisma.$disconnect();
      });
  } catch (error) {
    return new NextResponse(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  }
};

export const GET = async () => {

};