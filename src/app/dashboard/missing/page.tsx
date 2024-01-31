"use client";
import React, { use } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

const Page = () => {
  const router = useRouter();
  const [books, setBooks] = React.useState<any[]>([]);
  const [missingBooks, setMissingBooks] = React.useState<any[]>([]);

  React.useEffect(() => {
    const getBooks = async () => {
      const response = await axios("http://localhost:3000/api/registeredBooks");
      if (response.data.books !== null) {
        setBooks(response.data.books);

        const missing = await axios("http://localhost:3000/api/missingBooks");
        setMissingBooks(missing.data.books);
      } else {
        console.log(response);
      }
    };
    getBooks();
  }, []);

  const onSubmit = async (event: any) => {
    event.preventDefault();
    let userId = event.target.userId.value;
    userId = parseInt(userId);
    const response = await axios.post(
      "http://localhost:3000/api/missingBooks",
      { userId, userType: "student" }
    );
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
          {books.map((book: any) => {
            return missingBooks.map((missingBook: any) => {
              if (missingBook.bookId === book.id) {
                return (
                  <tr key={book.id}>
                    <td>{`${book.title}`}</td>
                    <td>{`${book.author}`}</td>
                    <td>{`${missingBook.note}`}</td>
                    <td>{`${
                      book.regDate.split("T")[0] +
                      " " +
                      book.regDate.split("T")[1].split(".")[0]
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
