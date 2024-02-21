/* eslint-disable no-unused-vars */
import { PrismaClient } from "@prisma/client";

//! Albin, snälla kör yarn lint och yarn build. Sen också sätt biome som default formatter, var typ 20 format fel i denna filen

const prisma = new PrismaClient();
async function seed() {
  const admin = await prisma.staff.upsert({
    where: { id: 1 },
    update: {},
    create: {
        id: 1,
        admin: true,
        firstName: "Admin",
        lastName: "Admin",
        email: "admin@admin.se",
        password: "Admin",
        phone: "1",
        image: "UploadedImage/testBild.png",
        qrCode: "123456789",
    },
  });
  const elev = await prisma.student.upsert({
    where: { id: 1 },
    update: {},
    create: {
        id: 1,
        firstName: "Bondhon",
        lastName: "Shahriar Alam",
        email: "Bond@elev.ntig.se",
        password: "123",
        phone: "012345",
        image: "UploadedImage/testBild.png",
        qrCode: "123456789009dfghb87543212345678987654",
        classroom: "TE4"
    },
  });
  const book = await prisma.book.upsert({
    where: { id: 1 },
    update: {},
    create: {
        id: 1,
        bookImg: "UploadedImage/testBild.png",
        title: "The King In Yellow",
        author: "You",
        publishers: "Me",
        published: new Date("2022-09-27 18:00:00.000"),
        regDate: new Date("2022-09-27 18:00:00.000"),
        isbn:  "123456",
        invNr: 1,
        price: 123,
        available: false
    },
  });
  const borrowed = await prisma.borrowedBooks.upsert({
    where: { id: 1 },
    update: {},
    create: {
        id: 1,
        bookId: 1,
        staffId: 1,
        studentId: 1,
        regDate: new Date("2022-09-27 18:00:00.000"),
        note: "This is a test",
    }
  });
}
seed()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);

  });