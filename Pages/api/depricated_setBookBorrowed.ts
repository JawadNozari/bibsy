import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
)
{
    const userInvNr = 1231;
    const selectedUser = {userType: "staffUser", id: 1};
    if (selectedUser.userType === "staffUser") {
        try {
            const updateBook = await prisma.book.update({
                where: {
                    invNr: userInvNr,
                },
                data: {
                    available: false,
                },
            });
            const loanOut = await prisma.borrowedBooks.create({
                data: {
                    bookId: updateBook.id,
                    studentId: null,
                    note: "Borrowed by staff",
                    staffId: selectedUser.id,
                },
            });
            const userUpdate = await prisma.staff.update({
                where: {
                    id: selectedUser.id,
                },
                data:{
                    borrowed: {
                        connect: {
                            id: loanOut.id,
                        },
                    },
                },
                });
            res.status(200).json({userUpdate, loanOut });
        } catch (error) {
            console.log(error);
            res.status(404).json({ message: error });
        }
    }
    else if (selectedUser.userType === "studentUser"){
        try {
            const updateBook = await prisma.book.update({
                where: {
                    invNr: userInvNr,
                },
                data: {
                    available: false,
                },
            });
            const loanOut = await prisma.borrowedBooks.create({
                data: {
                    bookId: updateBook.id,
                    studentId: selectedUser.id,
                    note: "Borrowed by student",
                    staffId: null,
                },
            });
            const userUpdate = await prisma.student.update({
                where: {
                    id: selectedUser.id,
                },
                data:{
                    borrowed: {
                        connect: {
                            id: loanOut.id,
                        },
                    },
                },
                });
            res.status(200).json({userUpdate, loanOut });
        } catch (error) {
            console.log(error);
            res.status(404).json({ message: error });
        }
    }
}