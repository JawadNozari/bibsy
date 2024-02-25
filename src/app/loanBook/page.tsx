"use client";
import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import axios from "axios";
import ProtectedPage from "../protectedPage/page";
import Loading from "../components/loading";
import Alert from "../components/alert";
import { Suspense } from "react";

interface User {
	id: number;
	password: string;
	firstName: string;
	lastName: string;
	email: string;
	classroom: string;
	phone: string;
	image: string;
	qrCode: number;
	type: "student" | "staff";
}

interface ApiResponse {
	staffUsers: User[];
	studentUsers: User[];
}

interface Book {
	id: number;
	title: string;
	bookImg: string;
	author: string;
	invNr: number;
	available: boolean;
	regDate: string;
	isbn: number;
}

interface BookApiResponse {
	books: Book[];
}

type alertType = "alert-success" | "alert-error";

interface UserToken {
	iat: number;
	role: string;
	user: {
		admin: boolean;
		email: string;
		firstName: string;
		id: number;
		lastName: string;
		password: string;
		phone: string;
		image: string;
		qrCode: string;
	};
}

export default function LoanBook() {
	const [apiData, setApiData] = useState<ApiResponse[]>([]);
	const [data2, setData2] = useState<BookApiResponse | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [searchQuery, setSearchQuery] = useState(""); // Add search query state
	const [showList, setShowList] = useState(false); // List hidden by default
	const [selectedUser, setSelectedUser] = useState<User | null>(null); // Add selected user state
	const userClickedRef = useRef(false); // Add this ref
	const [invNr, setInvNr] = useState("");
	const [selectedBook, setSelectedBook] = useState<Book | null>(null);
	const [userType, setUserType] = useState<UserToken>();
	const [alertType, setAlertType] = useState<alertType>("alert-success");
	const [showMessage, setShowMessage] = useState(false);
	const [alertMessage, setAlertMessage] = useState("");

	// * Fetch users from the API
	useEffect(() => {
		const token = localStorage.getItem("token");
		if (token) {
			const decodedToken = JSON.parse(atob(token.split(".")[1]));
			setUserType(decodedToken);
		}
		const invNr = new URLSearchParams(window.location.search).get("invNr");
		if (invNr) {
			setInvNr(invNr); // Update the state with the passed invNr
		}
		const fetchData = async () => {
			try {
				const response = await fetch("../api/getUsers");
				const response2 = await fetch("../api/availableBooks");

				// *  Check if the response is OK (status code 200)
				if (response.ok && response2.ok) {
					const data: ApiResponse = await response.json();
					const data2: BookApiResponse = await response2.json();

					// * Set the fetched data to the state
					setApiData([data]);

					// * Set the fetched data to the state
					setData2(data2);

					// * Set loading state to false
					setIsLoading(false); // * Set loading state to false
				} else {
					// * Log the error status text
					console.error("Error fetching data:", response.statusText);
				}
			} catch (error) {
				console.error("Error:", error);
				// * Log the error
			}
		};

		fetchData();
	}, []);

	// * Timer to hide the alert message after 5 seconds
	useEffect(() => {
		if (showMessage) {
			setTimeout(() => {
				setShowMessage(false);
			}, 5000);
		}
	}, [showMessage]);

	// * Handle search input change
	const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSearchQuery(event.target.value);
		setShowList(true); //* Show list on any search input

		if (event.target.value === "") {
			setSelectedUser(null); //* Clear selected user on empty search input
		}
	};

	const handleinvNrChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setInvNr(event.target.value);

		//* Search for a book with the entered invNr
		const book = data2?.books.find(
			(book) => book.invNr.toString() === event.target.value,
		);

		//*  Update the selected book
		setSelectedBook(book || null);

		if (book) {
			if (!book.available) {
			  setAlertMessage("The book is already loaned.");
			  setShowMessage(true);
			}
		}
	};

	// * Filter users based on search query
	const filterUsers = (users: User[]) => {
		// * If there is no search query, return all users
		if (!searchQuery) {
			return users;
		}

		// * Normalize search query and user names for case-insensitive search
		const normalizedQuery = searchQuery.toLowerCase();
		// const currentUserId = getCurrentUserId();

		return users.filter((user) => {
			const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
			return fullName.includes(normalizedQuery);
		});
	};

	//* Handle user click event
	const handleUserClick = (user: User) => {
		setSelectedUser(user); //* Store selected user on click
		userClickedRef.current = true; // * Set the ref to true on user click
		setSearchQuery(`${user.firstName} ${user.lastName}`); //*  Set search query to the user's name
		setShowList(false); //* Hide the list on user click
	};

	//* Handle focus out event
	const handleFocusOut = () => {
		setTimeout(() => {
			if (!userClickedRef.current) {
				setShowList(false);
			}
			userClickedRef.current = false; //* Reset the ref after the timeout
		}, 100);
	};

	// * Handle form submit
	const handleSubmit = async (e: React.SyntheticEvent) => {
		e.preventDefault();
		//* Send a POST request to the server
		try {
			const response = await axios.post("/api/setBookBorrowed", {
				user: selectedUser,
				invNr: invNr,
				currentStaff: userType?.user.id,
			});
			//* Log the response status
			if (response.status === 200) {
				//* Log the response data
				setSelectedBook(response.data.book);
				//* Set the alert type to success
				setAlertType("alert-success");
				//* Set the alert message
				setAlertMessage("Book successfully borrowed!");
				//* Show the alert message
				setShowMessage(true);
				setTimeout(() => {
					window.history.back();
				}, 3000);
			} else {
				//* Log the error status text
				console.error("Error borrowing book:", response.statusText);
				//* Set the alert type to error
				setAlertType("alert-error");
				//* Set the alert message
				if (response.status === 404) {
					setAlertMessage("The book you're trying to borrow was not found.");
				} else if (
					response.status === 409 ||
					response.data.message === "Book already loaned"
				) {
					setAlertMessage(
						"The book you're trying to borrow is already loaned.",
					);
				} else {
					setAlertMessage(
						"An unexpected error occurred or the book as already been borrowed.",
					);
				}
				//* Show the alert message
				setShowMessage(true);
			}
		} catch (error) {
			//* Log the error
			console.error("Error:", error);
			//* Set the alert type to error
			setAlertType("alert-error");
			//* Set the alert message
			setAlertMessage("An unexpected error occurred or the book as already been borrowed.");
			//* Show the alert message
			setShowMessage(true);
		}
	};

	// * Render the page
	return (
		<Suspense fallback={<Loading />}>
			<main className="flex w-screen h-screen justify-center items-center bg-neutral-100 text-black dark:bg-gray-800">
				<ProtectedPage />
				<div className="flex justify-center ">
					{selectedUser && (
						<div className="w-96 rounded card-normal mr-20 h-auto shadow-md  bg-gray-800 text-neutral-50 dark:bg-neutral-50 dark:text-gray-500 ">
							<div className=" text-center">
								<button
									type="button"
									className="btn m-3 btn-wide btn-active btn-neutral bg-neutral-50 text-gray-500 dark:bg-gray-700 dark:text-white"
									onClick={() => setSelectedUser(null)}
								>
									Close
								</button>
							</div>

							<div className="m-10 justify-center items-center flex">
								<Image
									src={
										selectedUser.image.includes(".")
											? `/${selectedUser.image}`
											: "/"
									}
									alt="profile"
									width={200}
									height={200}
								/>
							</div>

							<div className="m-5 ">
								<p>
									Name: {selectedUser.firstName} {selectedUser.lastName}
								</p>
							</div>

							<div className="m-5">
								<p>Email: {selectedUser.email}</p>
							</div>

							<div className="m-5 ">
								<p>Class: {selectedUser.classroom}</p>
							</div>
						</div>
					)}

					<div className=" flex justify-center  items-center w-96 h-[27rem] mx-auto dark:bg-neutral-50  bg-gray-800  rounded-lg drop-shadow-2xl">
						<form
							onSubmit={handleSubmit}
							className="flex flex-col w-64"
							autoComplete="off"
						>
							<div className="flex justify-center mb-10 items-center m-3 ">
								<h1 className="text-4xl font-bold text-center text-neutral-50 dark:text-gray-700">
									Loan Book
								</h1>
							</div>

							<div>
								<div className="flex flex-col w-full  max-w-md">
									<label
										htmlFor="Users"
										className="mb-2  w-64 text-lg text-center font-semibold text-neutral-50 dark:text-gray-700 "
									>
										Member
									</label>
									<input
										id="Users"
										type="text"
										value={searchQuery}
										onChange={handleSearchChange}
										onFocus={() => setShowList(true)}
										onBlur={handleFocusOut}
										placeholder="Search User..."
										className="rounded-md  input font-medium bg-neutral-50  text-gray-700 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
									/>

									<div className="flex justify-center">
										{isLoading ? (
											<p>Loading data...</p>
										) : (
											//*  Conditionally render the list based on showList and searchQuery
											showList && (
												<div className=" mt-1 rounded-lg absolute no-scrollbar  overflow-x-auto overflow-scroll text-white w-72 h-64 bg-slate-800">
													<h1 className="m-1 text-xl text-center border-b border-gray-300 bg-slate-800  p-2 cursor-pointer ">
														{" "}
														Staff Users:
													</h1>

													{filterUsers(
														apiData.flatMap((data) => data.staffUsers),
													).map((staff) => (
														<ul
															className="border-b list-none  border-gray-300 bg-slate-800 p-2 cursor-pointer "
															key={staff.id}
														>
															<li>
																<button
																	type="button"
																	className="p-3 w-full  h-full"
																	key={staff.id}
																	onClick={() => handleUserClick(staff)}
																>
																	{`${staff.firstName} ${staff.lastName}`}
																</button>
															</li>
														</ul>
													))}
													<div className="bg-[#336699]">
														<h1 className="m-1 text-xl text-center border-b border-gray-300  bg-[#336699]  p-2 cursor-pointer ">
															{" "}
															Student Users:
														</h1>
														{filterUsers(
															apiData.flatMap((data) => data.studentUsers),
														).map((student) => (
															<ul
																className="border-b list-none border-gray-300 bg-[#336699]    cursor-pointer "
																key={student.id}
															>
																<li>
																	<button
																		type="button"
																		className=" p-3 w-full  h-full"
																		key={student.id}
																		onClick={() => handleUserClick(student)}
																	>
																		{`${student.firstName} ${student.lastName}`}
																	</button>
																</li>
															</ul>
														))}
													</div>
												</div>
											)
										)}
									</div>
								</div>
							</div>

							<div className="mt-5 ">
								<label
									htmlFor="invNr"
									className="block mb-2 text-lg font-semibold text-gray-50 text-center dark:text-gray-700"
								>
									invNr
								</label>

								<div className="flex">
									<input
									type="number"
									id="invNr"
									placeholder="Enter InvNR..."
									value={invNr}
									onChange={handleinvNrChange}
									className="input bg-neutral-50  text-gray-700  font-medium text-sm rounded-l-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
									/>
								</div>
							</div>
							<div className="mt-10 mb-10 justify-center flex">
								<button
									type="submit"
									className="btn block   m-3 bg-neutral-50  text-gray-500 dark:bg-gray-700  btn-active btn-neutral hover:text-gray-300"
								>
									Loan
								</button>
							</div>
					</form>
				</div>

					<div className="flex justify-end">
						{selectedBook && (
							<div className="w-[15rem] h-[20rem] ml-20 border">
								<Image
									// src={`/${selectedBook.bookImg}`}
									src={`/${selectedBook.bookImg.replace("public/", "")}`}
									alt="book cover"
									width={300}
									height={80}
								/>
								<h1 className="text-center mt-5  dark:text-gray-100 text-2xl">
									{selectedBook.title}
								</h1>
							</div>
						)}
					</div>
					<div className="fixed bottom-10 right-10">
						{showMessage && (
							<Alert alertType={alertType} message={alertMessage} />
						)}
					</div>
				</div>
			</main>
		</Suspense>
	);
}
