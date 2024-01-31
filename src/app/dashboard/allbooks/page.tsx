"use client";
import React from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();
  const [books, setBooks] = React.useState([]);
  React.useEffect(() => {
    const getBooks = async () => {
      const response = await axios.get(
        "http://localhost:3000/api/registeredBooks"
      );
      setBooks(response.data.books);
    };
    getBooks();
  }, []);

  return (
    <div>
      <h1>All Books</h1>
      <table
        className="table-auto"
        style={{ width: 1000, textAlign: "center" }}
      >
        <thead>
          <tr>
            <th>Book Title</th>
            <th>Author</th>
            <th>ISBN</th>
            <th>Registered at</th>
            <th>Published at</th>
            <th>Availability</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book: any) => {
            return (
              <tr key={book.invNr}>
                <td>{`${book.title}`}</td>
                <td>{`${book.author}`}</td>
                <td>{`${book.isbn}`}</td>
                <td>{`${book.regDate.split("T")[0] + " " + book.regDate.split("T")[1].split(".")[0]}`}</td>
                <td>{`${book.published.split("T")[0]}`}</td>
                <td>{`${book.available}`}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div
        style={{ width: 1000, display: "flex", justifyContent: "space-around" }}
      >
        <button
          onClick={() => router.push("/dashboard/allbooks")}
          style={{ backgroundColor: "lightblue", color: "black" }}
        >
          All Books
        </button>
        <button
          onClick={() => router.push("/dashboard/available")}
          style={{ backgroundColor: "lightblue", color: "black" }}
        >
          Available Books
        </button>
        <button
          onClick={() => router.push("/dashboard/borrowed")}
          style={{ backgroundColor: "lightblue", color: "black" }}
        >
          Borrowed Books
        </button>
        <button
          onClick={() => router.push("/dashboard/missing")}
          style={{ backgroundColor: "lightblue", color: "black" }}
        >
          Missing Books
        </button>
      </div>
    </div>
  );
};

export default Page;
