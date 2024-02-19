"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import React from "react";
import axios from "axios";
import { Book } from "@prisma/client";

const BookDetails = ({ params }: { params: { invNr: string } }) => {
    const router = useRouter();
    const [book, setBook] = React.useState<Book>();

    //* Get the book details by inventory number
    React.useEffect(() => {
        const getBooks = async () => {
            const response = await axios.post("/api/registeredBooks", {
                invNr: params.invNr,
            });
            if (response.data !== null) {
                setBook(response.data);
            }
        };
        getBooks();
    }, [params.invNr]);

    //* Returns the JSX to render
    return (
        <div>
            <h1 style={{ color: "white" }}>{params.invNr}</h1>
            {/* //* If there is a book then render, else render "book not found" */}
            {book ? (
                (
                    <div>
                        <h1 style={{ color: "white" }}>Title: {book.title}</h1>
                        <h1 style={{ color: "white" }}>Author: {book.author}</h1>
                        <h1 style={{ color: "white" }}>ISBN: {book.isbn}</h1>
                        <h1 style={{ color: "white" }}>Published: {book.published.toString()}</h1>
                        <h1 style={{ color: "white" }}>Registered: {book.regDate.toString()}</h1>
                        <h1 style={{ color: "white" }}>
                            Available: {book.available ? "Yes" : "No"}
                        </h1>
                        <Image
                            src={`/${book.bookImg}`}
                            alt={book.title ?? "image"}
                            width={200}
                            height={300}
                        />
                    </div>
                )
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