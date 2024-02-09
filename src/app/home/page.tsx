"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

const Page = () => {
	const router = useRouter();
	const [totalBooks, setTotalBooks] = React.useState(0);
	const [availableBooks, setAvailableBooks] = React.useState(0);
	const [borrowedBooks, setBorrowedBooks] = React.useState(0);
	const [missingBooks, setMissingBooks] = React.useState(0);

	useEffect(() => {
		const getBooks = async () => {
			console.log("useEffect");
			// Devide by 2 because the code gets ran twice because react
			const available = await axios.get("/api/registeredBooks");
			setAvailableBooks(available.data.books?.length);

			const borrowed = await axios.get("/api/borrowedBooks");
			setBorrowedBooks(borrowed.data.books?.length);

			const missing = await axios.get("/api/missingBooks");
			setMissingBooks(missing.data.books?.length);

			setTotalBooks(availableBooks + borrowedBooks + missingBooks);
		};
		getBooks();
	}, [availableBooks, borrowedBooks, missingBooks]);

	return (
		<div>
			<div>{availableBooks} books available to borrow</div>
			<div>{borrowedBooks} books borrowed</div>
			<div>{missingBooks} books missing</div>
			<div>{totalBooks} books in total</div>
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
