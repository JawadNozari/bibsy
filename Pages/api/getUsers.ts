import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

  export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
  ) {
    try {
      const staffUsers = await prisma.staff.findMany(
        {
          include: {
            borrowed: true,
          },
        }
      );
      const studentUsers = await prisma.student.findMany(
        {
          include: {
            borrowed: true,
          },
        }
      );
      const data = { staffUsers, studentUsers };
      res.status(200).json(data);
      prisma.$disconnect();
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error });
      prisma.$disconnect();
    }
  }