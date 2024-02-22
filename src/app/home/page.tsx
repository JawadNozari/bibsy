"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const Page = () => {
	const router = useRouter();
	const [totalBooks, setTotalBooks] = React.useState(0);
	const [availableBooks, setAvailableBooks] = React.useState(0);
	const [borrowedBooks, setBorrowedBooks] = React.useState(0);
	const [missingBooks, setMissingBooks] = React.useState(0);

	//* Gets all of the books and sets the state for each type of book (available, borrowed, missing)
	useEffect(() => {
		const getBooks = async () => {
			const available = await axios.get("/api/registeredBooks");
			setAvailableBooks(available.data.books?.length);

			const borrowed = await axios.get("/api/borrowedBooks");
			setBorrowedBooks(borrowed.data.books?.length);

			const missing = await axios.get("/api/missingBooks");
			setMissingBooks(missing.data.books?.length);

			//* Sets the total number of books by adding the number of available, borrowed, and missing books
			setTotalBooks(availableBooks + borrowedBooks + missingBooks);
		};
		getBooks();
	}, [availableBooks, borrowedBooks, missingBooks]);

	//* Returns the JSX for the page with the number of books available, borrowed, and missing and buttons to navigate to different pages
	return (
			<div className=" p-10 bg-white dark:bg-zinc-900 w-full">
				<div className="">
					<h1 className="text-3xl font-extrabold tracking-tighter">Hi, Bond</h1>
					<p className="font-medium mt-3 mb-8">
						Welcome back to the library dashboard
					</p>
				</div>

				<div className="text-xl font-semibold">
					<h3>All books</h3>
				</div>

				<div className="flex gap-5 mt-6">
					<div className="border-solid border p-6 w-72 rounded-xl border-opacity-25">
						<p className="mb-3">Total books</p>
						<p className="font-bold text-2xl">{totalBooks}</p>
					</div>

					<div className="border-solid border p-6 w-72 rounded-xl border-opacity-25">
						<p className="mb-3">Available books</p>
						<p className="font-bold text-2xl">{availableBooks}</p>
					</div>

					<div className="border-solid border p-6 w-72 rounded-xl border-opacity-25">
						<p className="mb-3">Missing books</p>
						<p className="font-bold text-2xl">{missingBooks}</p>
					</div>
				</div>

				{/* <div
					style={{ width: 1000, display: "flex", justifyContent: "space-around" }}
				>
					<button
						type="button"
						onClick={() => router.push("/home/allbooks")}
						style={{ backgroundColor: "lightblue", color: "black" }}
					>
						{totalBooks}
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
				</div> */}
			</div>
	);
};

export default Page;
