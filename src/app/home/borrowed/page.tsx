"use client";
import React from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

type Book = {
  note: string;
  staffId: number;
  studentId: number;
  bookId: number;
  id: number;
  title: string;
  author: string;
  isbn: string;
  published: string;
  regDate: string;
  available: boolean;
  borrowedBy: string;
};

const Page = () => {
  const router = useRouter();
  const [books, setBooks] = React.useState<Book[]>([]);
  const [borrowedBooks, setBorrowedBooks] = React.useState<Book[]>([]);

  React.useEffect(() => {
    const getBooks = async () => {
      const response = await axios("/api/registeredBooks");
      if(response.data.books !== null) {
        setBooks(response.data.books);

        const borrowed = await axios("/api/borrowedBooks");
        setBorrowedBooks(borrowed.data.books);
      }
    };
    getBooks();
  }, []);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const userId = (event.target as HTMLInputElement).value as unknown as number;
    const response = await axios.post("/api/borrowedBooks", { userId, userType: "student"});
    setBorrowedBooks(response.data.books);
  };

  const setBookMissing = async (bookId: number) => {
    const response = await axios.post("/api/setBookMissing", { bookId, userType: "student"});
    console.log(response.data);
    //setBorrowedBooks(response.data.books);
  };

  return (
    <div>
      <h1>Borrowed Books</h1>
      <table
        className="table-auto"
        style={{ width: 1000, textAlign: "center" }}
      >
        <thead>
          <tr>
            <th>Book Title</th>
            <th>Author</th>
            <th>Due At</th>
            <th>Borrowed at</th>
            <th>Staff ID</th>
            <th>Student ID</th>
            <th />
          </tr>
        </thead>
        <tbody>
        {books.map((book: Book) => {
          return borrowedBooks.map((borrowedBook) => {
            if (borrowedBook.bookId === book.id) {
              return (
                <tr key={book.id}>
                  <td>{`${book.title}`}</td>
                  <td>{`${book.author}`}</td>
                  <td>{`${borrowedBook.note}`}</td>
                  <td>{`${`${book.regDate.split("T")[0]} ${book.regDate.split("T")[1].split(".")[0]}`}`}</td>
                  <td>{borrowedBook.staffId}</td>
                  <td>{borrowedBook.studentId}</td>
                  <td><button type="button" onClick={() => setBookMissing(borrowedBook.bookId)} style={{backgroundColor:"tomato"}} >MISSING</button></td>
                </tr>
              );
            }
            return null;
          });
        })}
        </tbody>
      </table>
      <form method="POST" onSubmit={onSubmit}>
        <label htmlFor="userId">User ID</label>
        <input type="text" name="userId" id="userId" style={{color: "black"}}/>
        <button type="submit">Submit</button>
      </form>
      <div style={{width:1000, display:"flex", justifyContent:"space-around"}}>
        <button type="button" onClick={() => router.push("/home/allbooks")} style={{backgroundColor:"lightblue", color:"black"}}>
          All Books
        </button>
        <button type="button" onClick={() => router.push("/home/available")} style={{backgroundColor:"lightblue", color:"black"}}>
          Available Books
        </button>
        <button type="button" onClick={() => router.push("/home/borrowed")} style={{backgroundColor:"lightblue", color:"black"}}>
          Borrowed Books
        </button>
        <button type="button" onClick={() => router.push("/home/missing")} style={{backgroundColor:"lightblue", color:"black"}}>
          Missing Books
        </button>
      </div>
    </div>
  );
};

export default Page;