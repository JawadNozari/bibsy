"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

const Page = () => {
  const router = useRouter();
  const [books, setBooks] = React.useState([]);
  const [totalBooks, setTotalBooks] = React.useState(0);
  const [availableBooks, setAvailableBooks] = React.useState(0);
  const [borrowedBooks, setBorrowedBooks] = React.useState(0);
  const [missingBooks, setMissingBooks] = React.useState(0);

  useEffect(() => {
    const getBooks = async () => {
      const response = await axios("http://localhost:3000/api/availableBooks");
      setAvailableBooks(response.data.books.length);
      let availableAmount = response.data.books.length;

      const borrowed = await axios("http://localhost:3000/api/borrowedBooks");
      setBorrowedBooks(borrowed.data.books.length);
      let borrowedAmount = borrowed.data.books.length;

      const missing = await axios("http://localhost:3000/api/missingBooks");
      setMissingBooks(missing.data.books.length);
      let missingAmount = missing.data.books.length;

      setTotalBooks(availableAmount + borrowedAmount + missingAmount);
    };
    getBooks();
  }, []);

  return (
    <div>
      <div>{availableBooks} books available to borrow</div>
      <div>{borrowedBooks} books borrowed</div>
      <div>{missingBooks} books missing</div>
      <div>{totalBooks} books in total</div>
    </div>
  );
};

export default Page;