"use client";
import React, { use } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

const Page = () => {
  const router = useRouter();
  interface Book {
    bookId: number;
    note: string;
    staffId: number;
    studentId: number;
    id: number;
    title: string;
    author: string;
    regDate: string;
  }

  const [books, setBooks] = React.useState<Book[]>([]);
  const [missingBooks, setMissingBooks] = React.useState<Book[]>([]);

  React.useEffect(() => {
    const getBooks = async () => {
      const response = await axios("/api/registeredBooks");
      if (response.data.books !== null) {
        setBooks(response.data.books);

        const missing = await axios("/api/missingBooks");
        setMissingBooks(missing.data.books);
      } else {
        console.log(response);
      }
    };
    getBooks();
  }, []);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const userId = (event.target as HTMLInputElement).value as unknown as number;
   
    const response = await axios.post("/api/missingBooks", {
      userId,
      userType: "student",
    });
    setMissingBooks(response.data.books);
  };

  return (
    <div>
      <h1>Missing Books</h1>
      <table
        className="table-auto"
        style={{ width: 1000, textAlign: "center" }}
      >
        <thead>
          <tr>
            <th>Book Title</th>
            <th>Author</th>
            <th>Note</th>
            <th>Reg Date</th>
            <th>Staff ID</th>
            <th>Student ID</th>
          </tr>
        </thead>
        <tbody>
            {books.map((book: Book) => {
            return missingBooks.map((missingBook: Book) => {
              if (missingBook.bookId === book.id) {
                return (
                  <tr key={book.id}>
                    <td>{`${book.title}`}</td>
                    <td>{`${book.author}`}</td>
                    <td>{`${missingBook.note}`}</td>
                    <td>{`${
                      `${book.regDate.split("T")[0]} ${book.regDate.split("T")[1].split(".")[0]}`
                    }`}</td>
                    <td>{missingBook.staffId}</td>
                    <td>{missingBook.studentId}</td>
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
        <input
          type="text"
          name="userId"
          id="userId"
          style={{ color: "black" }}
        />
        <button type="submit">Submit</button>
      </form>
      <div
        style={{ width: 1000, display: "flex", justifyContent: "space-around" }}
      >
        <button
          type="button"
          onClick={() => router.push("/home/allbooks")}
          style={{ backgroundColor: "lightblue", color: "black" }}
        >
          All Books
        </button>
        <button
          type="button"
          onClick={() => router.push("/home/available")}
          style={{ backgroundColor: "lightblue", color: "black" }}
        >
          Available Books
        </button>
        <button
          type="button"
          onClick={() => router.push("/home/borrowed")}
          style={{ backgroundColor: "lightblue", color: "black" }}
        >
          Borrowed Books
        </button>
        <button
          type="button"
          onClick={() => router.push("/home/missing")}
          style={{ backgroundColor: "lightblue", color: "black" }}
        >
          Missing Books
        </button>
      </div>
    </div>
  );
};

export default Page;
