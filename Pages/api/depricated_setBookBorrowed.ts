import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
)
{
    const userInvNr = 2131534756;
    const selectedUser = {userType: "studentUser", id: 4};
    const currentStaff = {id: 3};

    // if the teacher is borrowing a book for self. 
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
                    note: "Borrowed by staff for self",
                    staffId: currentStaff.id,
                },
            });
            const userUpdate = await prisma.staff.update({
                where: {
                    id: currentStaff.id,
                },
                data:{
                    borrowed: {
                        connect: {
                            id: loanOut.id,
                        },
                    },
                },
                });
                const historyUpdate = await prisma.bookHistory.create({
                    data: {
                        Book: {
                            connect: {
                                id: updateBook.id,
                            },
                        },
                        Staff: {
                            connect: {
                                id: currentStaff.id,
                            },
                        },
                    }
                    
                });
            res.status(200).json({historyUpdate, userUpdate, loanOut });
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
                    staffId: currentStaff.id,
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
                const historyUpdate = await prisma.bookHistory.create({
                    data: {
                        Book: {
                            connect: {
                                id: updateBook.id,
                            },
                        },
                        Staff: {
                            connect: {
                                id: currentStaff.id,
                            },
                        },
                        Student: {
                            connect: {
                                id: selectedUser.id,
                            },
                        },
                    }
                    
                });
            res.status(200).json({historyUpdate, userUpdate, loanOut });
        } catch (error) {
            console.log(error);
            res.status(404).json({ message: error });
        }
    }
}