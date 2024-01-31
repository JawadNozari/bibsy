import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

  export default async function handler(req, res) {
    try {
      const staffUsers = await prisma.Staff.findMany();
      const studentUsers = await prisma.Student.findMany();
      const data = { staffUsers, studentUsers };
      console.log(data);
      res.status(200).json(data);
    } catch (error) {
      //console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }