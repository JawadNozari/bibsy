import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function getStaff() {
  try {
    const allUsers = await prisma.staff.findMany();
    return(allUsers);
  } catch (error) {
    console.error(error);
    throw error; // Throw the error to be caught in the catch block below
  } finally {
    await prisma.$disconnect();
  }
}