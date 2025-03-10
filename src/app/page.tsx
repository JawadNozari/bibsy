"use client";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import axios from "axios";
import { Book, bookHistory } from "@prisma/client";
import Loading from "./components/loading";

//! This is a function that takes in a token and checks and returns if the user is an admin and what type of user they are
import { CheckIfLoggedIn } from "./components/loginChecks";
import Image from "next/image";

export default function Home() {
	const router = useRouter();

	const [loading, setLoading] = React.useState<boolean>(true);

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
			setLoading(false);

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
							<div
								key={book.id}
								className="flex justify-center items-center sm:justify-center sm:items-center md:justify-start md:items-start"
							>
								<div className="flex mt-2 sm:mt-2 md:mt-5 p-1 w-4/5 sm:w-4/5 md:w-1/5 bg-zinc-200 dark:bg-zinc-800 rounded-xl">
									{registeredBook.bookImg ? (
										<Image
											src={`/${registeredBook.bookImg}`}
											alt="Book cover"
											width={100}
											height={100}
											className="w-16 sm:w-16 md:w-1/3 rounded-xl p-1"
										/>
									) : (
										<Image
											src={noCoverImage}
											alt="No book cover"
											width={100}
											height={100}
											className="w-16 sm:w-16 md:w-1/3 rounded-xl p-1"
										/>
									)}
									<div className="w-4/5">
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
	return loading ? (
		<div>
			<Loading />
		</div>
	) : (
		<div className="p-3 sm:p-3 md:p-10 bg-white dark:bg-zinc-900 w-full h-screen">
			<div>
				{/* // ! IF THE USER IS AN ADMIN, THEY WILL SEE "HELLO THERE ADMIN!" OTHERWISE THEY WILL SEE "HELLO THERE {USER TYPE}" */}
				<h1 className="text-3xl font-extrabold tracking-tighter text-center md:text-left sm:text-center">
					Hi, {isAdmin ? "Admin!" : userType}
				</h1>
				<p className="font-medium mt-3 mb-8 text-center md:text-left sm:text-center">
					Welcome back to the library dashboard
				</p>
			</div>

			<div className="text-xl font-semibold text-center md:text-left sm:text-center">
				<h3>All books</h3>
			</div>

			<div className="flex justify-center items-start md:justify-start sm:justify-center gap-2 md:gap-5 sm:gap-2 mt-6">
				<div className="border-solid border p-6 w-2/6 md:w-1/6 sm:w-2/6 rounded-xl border-opacity-25 text-center md:text-left sm:text-center">
					<p className="mb-3">Total books</p>
					<p className="font-bold text-xl sm:text-xl md:text-2xl">
						{totalBooks}
					</p>
				</div>

				<div className="border-solid border p-6 w-3/6 md:w-1/6 sm:w-2/6 rounded-xl border-opacity-25 text-center md:text-left sm:text-center">
					<p className="mb-3">Available books</p>
					<p className="font-bold text-xl sm:text-xl md:text-2xl">
						{availableBooks}
					</p>
				</div>

				<div className="border-solid border p-6 w-2/6 md:w-1/6 sm:w-2/6 rounded-xl border-opacity-25 text-center md:text-left sm:text-center">
					<p className="mb-3">Missing books</p>
					<p className="font-bold text-xl sm:text-xl md:text-2xl">
						{missingBooks}
					</p>
				</div>
			</div>
			<div>
				<h3 className="text-lg sm:text-lg md:text-xl text-center sm:text-center md:text-left font-semibold mt-8 ">
					Peoples recently borrowed books
				</h3>
				<div>{runThroughBooks()}</div>
			</div>
		</div>
	);
}
