import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

  export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
  ) {
    try {
      const staffUsers = await prisma.staff.findMany();
      const studentUsers = await prisma.student.findMany();
      const data = { staffUsers, studentUsers };
      console.log(data);
      res.status(200).json(data);
      prisma.$disconnect();
    } catch (error) {
      //console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
      prisma.$disconnect();
    }
  }