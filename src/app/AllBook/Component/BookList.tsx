"use client";
import React, { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

// Interfaces
interface Book {
	id: number;
	price: number;
	title: string;
	author: string;
	published: string;
	available: boolean;
	invNr: number;
	regDate: string;
}
interface BookState {
	id: number;
	regdate: string;
	note: string;
	bookId: number;
	staffId: number;
	studentId: number;
}
interface Links {
	key: string;
	name: string;
	link: string;
	color: string;
}
interface Theme {
	theme: string;
	fetchLink: string;
	type?: string;
	lostFound?: string;
}
interface LinkArray {
	links: Links[];
}

// Link object for mapping(save space)
const linkObject: LinkArray = {
	links: [
		{ key: "book", name: "Book", link: "/allBook", color: "bg-blue-800" },
		{
			key: "available",
			name: "Available",
			link: "/allBook/available",
			color: "bg-green-600",
		},
		{
			key: "missing",
			name: "Missing",
			link: "/allBook/missing",
			color: "bg-red-600",
		},
		{
			key: "borrowed",
			name: "Borrowed",
			link: "/allBook/borrowed",
			color: "bg-yellow-600",
		},
	],
};
// Export
export default function BookList({ colorTheme }: { colorTheme: Theme }) {
	//refresh method
	const { refresh } = useRouter();

	// where the fetched book-data is stored
	const [books, setBooks] = useState<Array<Book>>([]);

	// where the fetched state-data is stored
	const [bookState, setBookState] = useState<Array<BookState>>([
		{
			id: 0,
			regdate: "",
			note: "",
			bookId: 0,
			staffId: 0,
			studentId: 0,
		},
	]);

	// Shortened colroTheme.lostFound to lostFound
	const lostFound = colorTheme.lostFound;
	// searchphrase to be compered to
	const [searchPhrase, setSearchPhrase] = useState("");
	// User cookie
	const [userCookie, setUserCookie] = useState();
	// Dropdown state
	const [dropdown, setDropdown] = useState(false);
	// Theme picker
	// Have spaces so that can split and use in tailwind
	const theme: { [key: string]: string } = {
		book: " bg-blue-800 focus:border-blue-800 hover:bg-blue-900",
		available: " bg-green-600 focus:border-green-600 hover:bg-green-700",
		missing: " bg-red-600 focus:border-red-600 hover:bg-red-700",
		borrowed: " bg-yellow-600 focus:border-yellow-600 hover:bg-yellow-700",
	};
	// Fetching data
	useEffect(() => {
		fetch(`/api/${colorTheme.fetchLink}`)
			.then((res) => res.json())
			.then((data) => setBooks(data.books))
			.catch((error) => console.log(error));
	}, [colorTheme.fetchLink]);

	//fetching bookState data if exists
	useEffect(() => {
		colorTheme.type
			? fetch(`/api/${colorTheme.type}`)
					.then((res) => res.json())
					.then((data) => setBookState(data.books))
					.catch((error) => console.log(error))
			: null;
	}, [colorTheme.type]);

	//* On missing button press, set the book to missing and remove it from the array and db
	const setBookMissing = async (
		event: React.MouseEvent<HTMLElement>,
		bookId: number,
	) => {
		event.stopPropagation();
		bookState?.map((borrowedBook) => {
			if (borrowedBook.bookId === bookId) {
				bookState.splice(bookState.indexOf(borrowedBook), 1);
			}
		});
		//setBookState(bookState);

		const response = await axios.post("/api/setBookMissing", {
			bookId,
		});
		console.log(response.data);
	};

	//* On return button press, set the book to available and remove it from the array and db
	const setBookAvailable = async (
		event: React.MouseEvent<HTMLElement>,
		bookId: number,
		listType: string,
	) => {
		event.stopPropagation();
		bookState?.map((borrowedBook) => {
			if (borrowedBook.bookId === bookId) {
				bookState.splice(bookState.indexOf(borrowedBook), 1);
			}
		});

		//setBookState(bookState);
		const response = await axios.post("/api/setBookAvailable", {
			bookId,
			userType: "student",
			listType,
		});
		console.log(response.data);
	};
	return (
		// TableTemplate edited
		<div className="size-9/12 absolute bottom-0 left-1/2 transform -translate-x-1/2  h-1/2-dvh flex justify-center flex-wrap ">
			<div className="size-2/12 w-full">
				{/* link container */}
				<div className="w-full h-full flex justify-center items-end">
					{/* Link map */}
					{linkObject?.links
						.slice(0)
						.reverse()
						.map((link: Links) => (
							<a
								key={link.key}
								href={link.link}
								className={`h-4/5 transform hover:scale-100 scale-95 origin-bottom hover:z-20 transition-transform ease-in-out duration-300 ${link?.color} flex justify-center text-gray-300 items-center w-1/5 border-8 transition-colors rounded-t-3xl border-gray-700 border-b-0`}
							>
								{link.name}
							</a>
						))}
					{/* spaceDiv */}
					{colorTheme.theme === "missing" || colorTheme.theme === "borrowed" ? (
						<div className="size-1/12" />
					) : null}
				</div>
			</div>
			{/* the */}
			<div
				className={
					"relative bottom-0 overflow-x-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-gray-500 shadow-md  size-10/12 rounded-t-xl bg-gray-800"
				}
			>
				<table className="w-full text-sm text-left rtl:text-right text-gray-300">
					<thead className="text-xs uppercase bg-gray-700 text-white sticky top-0 p-3 z-10">
						<tr>
							{/* Input th */}
							<th colSpan={5} className="z-10">
								{/* Input form */}
								<form className="p-4 z-10">
									{/* Label */}
									<label
										htmlFor="default-search"
										className="mb-2 text-sm font-medium text-gray-900 sr-only"
									>
										Search
									</label>
									{/* Search icon */}
									<div className="relative">
										<div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
											<svg
												className="w-4 h-4 text-gray-300"
												aria-hidden="true"
												xmlns="http://www.w3.org/2000/svg"
												fill="none"
												viewBox="0 0 20 20"
											>
												<path
													stroke="currentColor"
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth="2"
													d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
												/>
											</svg>
										</div>
										{/* Search input */}
										<input
											type="search"
											id="default-search"
											className={`${
												// Dynamic color
												theme[colorTheme.theme].split(" ")[2]
											} block w-full p-4 ps-10 text-sm border-gray-400 rounded-lg bg-gray-500  placeholder-gray-300 text-white border-2 outline-none`}
											// On change set searchPhrase to input value
											onChange={() =>
												setSearchPhrase(
													(event?.target as HTMLInputElement).value,
												)
											}
											placeholder="Search for books..."
										/>
									</div>
								</form>
							</th>
						</tr>
						<tr>
							<th scope="col" className="px-6 py-3 z-20">
								Title
							</th>
							<th scope="col" className="px-6 py-3">
								Author
							</th>
							<th scope="col" className="px-6 py-3">
								{colorTheme.theme === "missing" ||
								colorTheme.theme === "borrowed"
									? "Registered"
									: "Published"}
							</th>
							<th scope="col" className="px-6 py-3">
								Price
							</th>

							<th
								scope="col"
								className="px-6 py-3 flex justify-center items-center w-full h-full"
							>
								{colorTheme.theme !== "book" ? "Action" : "Availability"}
							</th>
						</tr>
					</thead>
					<tbody>
						{/* Map of fetched data which prints out table-row */}
						{bookState?.map((state, index) =>
							books?.map((book, index) => {
								return (state.bookId === book.id || !colorTheme.type) &&
									book.title
										.toLowerCase()
										.includes(searchPhrase.toLowerCase()) &&
									(userCookie && state.bookId
										? userCookie === state.studentId
										: true) ? (
									<tr
										key={book.id}
										className={`border-b ${
											theme[colorTheme.theme]
										} border-gray-700`}
									>
										<td className="px-6 py-4 font-medium whitespace-nowrap text-white w-1/5 overflow-auto">
											{books[index]?.title}
										</td>
										<td className="px-6 py-4">{books[index]?.author}</td>
										<td className="px-6 py-4">
											{colorTheme.theme === "missing" ||
											colorTheme.theme === "borrowed"
												? `${books[index]?.regDate.split("T")[0]} 
												  ${books[index]?.regDate.split("T")[1].split(".")[0]}`
												: books[index]?.published.split("T")[0]}
										</td>
										<td className="px-6 py-4">{`${books[index]?.price} Kr`}</td>
										{/*Ternary if available adds link to borrow else if book add corresponding availability else, add buttuns for post */}
										<td className="px-6 py-4 flex justify-center items-center w-full h-full">
											{colorTheme.theme === "available" ? (
												// borrow button
												<a
													href={`/loanBook?invNr=${book.invNr}`}
													className="transform p-2 bg-gray-700 rounded-xl text-yellow-600 font-bold hover:scale-110 transition-transform"
												>
													Borrow
												</a>
												// availability
											) : colorTheme.theme === "book" ? (
												book.available ? (
													"Available"
												) : (
													"Not Available"
												)
											) : lostFound?.split(" ")[1] ? (
												<div className="flex">
													{/* lost button borrow tab */}
													<button
														type="submit"
														className="transform p-2 bg-gray-700 rounded-xl text-red-500 font-bold hover:scale-110 transition-transform"
														onClick={async (
															e: React.MouseEvent<
																HTMLButtonElement,
																MouseEvent
															>,
														) => {
															//setBookMissing(e, state.bookId);, state.bookId, "missing"
															await setBookMissing(e, state.bookId);
															refresh();
														}}
													>
														{lostFound.split(" ")[0]}
													</button>
													<div className="w-2" />
													{/* return button borrow tab */}
													<button
														type="submit"
														className="transform p-2 bg-gray-700 rounded-xl text-green-500 font-bold hover:scale-110 transition-transform"
														onClick={async (e) => {
															await setBookAvailable(
																e,
																state.bookId,
																"borrowed",
															);
															refresh();
														}}
													>
														{lostFound.split(" ")[1]}
													</button>
												</div>
											) : (
												// found button missing tab
												<button
													type="submit"
													className="transform p-2 bg-gray-700 rounded-xl text-green-500 font-bold hover:scale-110 transition-transform"
													onClick={async (e) => {
														await setBookAvailable(e, state.bookId, "missing");
														refresh();
													}}
												>
													{lostFound}
												</button>
											)}
										</td>
									</tr>
								) : null;
							}),
						)}
					</tbody>
				</table>
			</div>
			{/* Filter button */}
			{colorTheme.theme === "missing" || colorTheme.theme === "borrowed" ? ( // If missing or borrowed, show filter button
				<div className="relative size-1/12 h-56 flex justify-start flex-col items-start left-2">
					<button
						id="dropdownDefaultButton"
						onClick={() => {
							setDropdown(!dropdown);
						}}
						className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm text-center inline-flex items-center justify-center w-28 h-14 translate-y-5"
						type="button"
					>
						Filter
					</button>
					<div
						id="dropdown"
						className={
							!dropdown
								? "hidden"
								: "z-2 p-2 rounded-lg shadow w-28 bg-gray-700 translate-y-5 flex justify-around items-center"
						}
					>
						<input type="checkBox" name="myBooks" id="myBooks" />
						<label htmlFor="myBooks" className="text-xs text-white">
							My books
						</label>
					</div>{" "}
				</div>
			) : null}
		</div>
	);
}
