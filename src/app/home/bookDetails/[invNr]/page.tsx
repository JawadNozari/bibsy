"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import React from "react";
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
  bookImage: string;
};

const BookDetails = ({ params }: { params: { invNr: string } }) => {
  const router = useRouter();
  const [book, setBook] = React.useState<Book>();

  React.useEffect(() => {
    const getBooks = async () => {
      const response = await axios.post("/api/registeredBooks", {
        invNr: params.invNr,
      });
      if (response.data.book !== null) {
        setBook(response.data.book);
      }
    };
    getBooks();
  }, [params.invNr]);

  return (
    <div>
      <h1 style={{ color: "white" }}>{params.invNr}</h1>
      {book ? (
        (console.log(book),
        (
          <div>
            <h1 style={{ color: "white" }}>Title: {book.title}</h1>
            <h1 style={{ color: "white" }}>Author: {book.author}</h1>
            <h1 style={{ color: "white" }}>ISBN: {book.isbn}</h1>
            <h1 style={{ color: "white" }}>Published: {book.published}</h1>
            <h1 style={{ color: "white" }}>Registered: {book.regDate}</h1>
            <h1 style={{ color: "white" }}>
              Available: {book.available ? "Yes" : "No"}
            </h1>
            <Image
              src={book.bookImage}
              alt={book.title}
              width={200}
              height={300}
            />
          </div>
        ))
      ) : (
        <div>Book not found</div>
      )}
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
        <button
          type="button"
          onClick={() => router.push("/home/history")}
          style={{ backgroundColor: "lightblue", color: "black" }}
        >
          History
        </button>
      </div>
    </div>
  );
};

export default BookDetails;
