import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function updateAndBorrowBook(bookId: number, updatedBookData: {
  available?: boolean;
}, borrowed: {
  note: string;
  User: number;
  bookId: number;
}) {
  try {
    // Update the book with the provided ID
    const updatedBook = await prisma.book.update({
      where: { id: bookId },
      data: updatedBookData,
    });

    console.log('Book updated:', updatedBook);

    // Add the book to borrowedBooks
    const borrowedBook = await prisma.borrowedBooks.create({
      data: {
        note: borrowed.note,
        userId: borrowed.User,
        Book: { connect: { id: bookId } },
      },
    });

    console.log('Book added to borrowed:', borrowedBook);
  } catch (error) {
    console.error('Error updating or borrowing book:', error);
  } finally {
    await prisma.$disconnect();
  }
}

const role = 'STAFF';
const bookIdToUpdate = 1; 
const updatedBookData = {
  available: false,
};

const borrowData = {
  note: 'Borrowed for reading',
  User: 1,
  bookId: bookIdToUpdate,
};

updateAndBorrowBook(bookIdToUpdate, updatedBookData, borrowData);
