import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function main(req: NextApiRequest, res: NextApiResponse) {
   try {
      const allUsers = await prisma.student.findMany({
          include: {
            
          }
      });
      console.log(allUsers);
      res.status(200).json(allUsers);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    } finally {
      await prisma.$disconnect();
  }}
