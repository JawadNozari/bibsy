"use client";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import axios from "axios";
import { Book, bookHistory } from "@prisma/client";

//! This is a function that takes in a token and checks and returns if the user is an admin and what type of user they are
import { CheckIfLoggedIn } from "./components/loginChecks";
import Image from "next/image";

export default function Home() {
	const router = useRouter();

	const [totalBooks, setTotalBooks] = React.useState(0);
	const [availableBooks, setAvailableBooks] = React.useState(0);
	const [missingBooks, setMissingBooks] = React.useState(0);
	const [history, setHistory] = React.useState<bookHistory[]>([]);
	const [books, setBooks] = React.useState<Book[]>([]);

	//! THESE ARE THE STATES THAT WILL HOLD THE USER TYPE AND IF THEY ARE AN ADMIN
	const [isAdmin, setIsAdmin] = React.useState(false);
	const [userType, setUserType] = React.useState("");

	//! THIS USEEFFECT FUNCTION CHECKS IF THE USER IS LOGGED AND IF THEY ARE NOT, THEY WILL BE REDIRECTED TO THE LOGIN PAGE-
	React.useEffect(() => {
		const token = localStorage.getItem("token");
		if (!token) {
			router.push("/login");
		} else {
			const { areYouAdmin, whatUserAreYou } = CheckIfLoggedIn(token);
			setIsAdmin(areYouAdmin);
			setUserType(whatUserAreYou);
		}
	}, [router]);

	useEffect(() => {
		const getHistory = async () => {
			const response = await axios("/api/getHistory");
			setHistory(response.data.books);

			const response2 = await axios("/api/registeredBooks");
			setBooks(response2.data.books);
			setTotalBooks(response2.data.books.length);

			const response4 = await axios("/api/availableBooks");
			setAvailableBooks(response4.data.books.length);

			const response5 = await axios("/api/missingBooks");
			setMissingBooks(response5.data.books.length);
		};
		getHistory();
	}, []);

	const runThroughBooks = () => {
		if (!history) return "Loading...";
		return history
			.filter((book, index, array) => index >= array.length - 3)
			.map((book) => {
				return books.map((registeredBook) => {
					if (book.bookId === registeredBook.id) {
						const noCoverImage = "/noBookCover/no-cover.jpg";
						return (
							// biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
							<div
								key={book.id}
								onClick={() =>
									router.push(`/home/bookDetails/${registeredBook.invNr}`)
								}
							>
								<div className="flex mt-5 p-1 w-80 bg-zinc-200 dark:bg-zinc-800 rounded-xl">
									{registeredBook.bookImg ? (
										<Image
											src={`/${registeredBook.bookImg}`}
											alt="Book cover"
											width={50}
											height={50}
											className="w-32 rounded-xl p-1"
										/>
									) : (
										<Image
											src={noCoverImage}
											alt="No book cover"
											width={50}
											height={50}
											className="w-28 rounded-xl p-1"
										/>
									)}
									<div className="w-52">
										<p className="mb-4 text-center font-semibold text-lg mt-6">
											{`${registeredBook.title}`}
										</p>
										<p className="text-center font-medium text-sm">
											{registeredBook.author}
										</p>
									</div>
								</div>
							</div>
						);
					}
				});
			});
	};
	return (
		<div className=" p-10 bg-white dark:bg-zinc-900 w-full">
			<div>
				{/* // ! IF THE USER IS AN ADMIN, THEY WILL SEE "HELLO THERE ADMIN!" OTHERWISE THEY WILL SEE "HELLO THERE {USER TYPE}" */}
				<h1 className="text-3xl font-extrabold tracking-tighter">
					Hi, {isAdmin ? "Admin!" : userType}
				</h1>
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
			<div>{runThroughBooks()}</div>
		</div>
	);
}
