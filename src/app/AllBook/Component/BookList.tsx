"use client";
import React, { useState, useEffect } from "react";
import { FilterButton } from "./filterButton";

// Interfaces
interface Book {
	id: number;
	price: number;
	title: string;
	author: string;
	published: string;
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

const linkObject: LinkArray = {
	links: [
		{ key: "book", name: "Book", link: "/AllBook", color: "bg-blue-800" },
		{
			key: "available",
			name: "Available",
			link: "/AllBook/Available",
			color: "bg-green-600",
		},
		{
			key: "missing",
			name: "Missing",
			link: "/AllBook/Missing",
			color: "bg-red-600",
		},
		{
			key: "borrowed",
			name: "Borrowed",
			link: "/AllBook/Borrowed",
			color: "bg-yellow-600",
		},
	],
};

export default function BookList({ colorTheme }: { colorTheme: Theme }) {
	// where the fetched data is stored
	const [books, setBooks] = useState<Array<Book>>([]);
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
	const lostFound = colorTheme.lostFound;

	// Theme picker
	// Have spaces so that can split and use in tailwind
	const theme: { [key: string]: string } = {
		book: " dark:bg-blue-800 focus:border-blue-800 hover:bg-blue-900",
		available: " dark:bg-green-600 focus:border-green-600 hover:bg-green-700",
		missing: " dark:bg-red-600 focus:border-red-600 hover:bg-red-700",
		borrowed: " dark:bg-yellow-600 focus:border-yellow-600 hover:bg-yellow-700",
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

	// Dropdown class so that works with tailwind
	return (
		// TableTemplate edited
		<div className="size-9/12 absolute bottom-0 left-1/2 transform -translate-x-1/2  h-1/2-dvh flex justify-center flex-wrap ">
			<div className="size-2/12 w-full">
				{/* link container */}
				<div className="w-full h-full flex justify-center items-end">
					{/* Link map */}
					{linkObject.links
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
					<div className="size-1/12" />
				</div>
			</div>
			<div
				className={
					"relative bottom-0 overflow-x-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-gray-500 shadow-md  size-10/12 rounded-t-xl bg-gray-800"
				}
			>
				<table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-300">
					<thead className="text-xs  uppercase bg-gray-50 dark:bg-gray-700 dark:text-white sticky top-0 p-3 z-10">
						<tr>
							<th colSpan={5}>
								<form className="p-4">
									<label
										htmlFor="default-search"
										className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
									>
										Search
									</label>
									<div className="relative">
										<div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
											<svg
												className="w-4 h-4 text-gray-300 dark:text-gray-300"
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
										<input
											type="search"
											id="default-search"
											className={`${
												theme[colorTheme.theme].split(" ")[2]
											} block w-full p-4 ps-10 text-sm text-gray-900 border-gray-400 rounded-lg bg-gray-500  dark:placeholder-gray-300 dark:text-white border-2 outline-none`}
											placeholder="Search for books..."
											required
										/>
									</div>
								</form>
							</th>
						</tr>
						<tr>
							<th scope="col" className="px-6 py-3">
								Title
							</th>
							<th scope="col" className="px-6 py-3">
								Author
							</th>
							<th scope="col" className="px-6 py-3">
								Published
							</th>
							<th scope="col" className="px-6 py-3">
								Price
							</th>

							<th
								scope="col"
								className="px-6 py-3 flex justify-center items-center w-full h-full"
							>
								{colorTheme.theme !== "book" ? "Action" : null}
							</th>
						</tr>
					</thead>
					<tbody>
						{/* Map of fetched data which prints out table-row */}
						{bookState.map((state, index) =>
							books.map((book, index) => {
								return state.bookId === book.id || !colorTheme.type ? (
									<tr
										key={book.id}
										className={`bg-white border-b ${
											theme[colorTheme.theme]
										} dark:border-gray-700`}
									>
										<td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white w-1/5 overflow-auto">
											{books.length > 0 ? books[index]?.title : "loading..."}
										</td>
										<td className="px-6 py-4">
											{books.length > 0 ? books[index]?.author : "loading..."}
										</td>
										<td className="px-6 py-4">
											{books.length > 0
												? books[index]?.published.split("T")[0]
												: "loading..."}
										</td>
										<td className="px-6 py-4">
											${books.length > 0 ? books[index]?.price : "loading..."}
										</td>
										<td className="px-6 py-4 flex justify-center items-center w-full h-full">
											{lostFound ? (
												<a
													href={`/lost:${books[index]?.id.toString()}`}
													className={
														colorTheme.theme === "available"
															? "trasnform font-bold bg-gray-700 p-2 text-yellow-600 rounded-xl hover:scale-110 hover:text-red-600 transition-transform"
															: colorTheme.theme === "missing"
															  ? "font-bold bg-gray-700 p-2 text-green-500 hover:underline rounded-xl hover:scale-110 hover:text-red-600 transition-transform"
															  : "font-bold bg-gray-700 p-2 text-red-500 hover:underline rounded-xl hover:scale-110 hover:text-red-600 transition-transform"
													}
												>
													{`${lostFound?.split(" ")[0]}`}
												</a>
											) : null}
											{lostFound?.split(" ")[1] ? (
												<div className="m mx-2" />
											) : null}
											{lostFound?.split(" ")[1] ? (
												<a
													href={`localhost:3000/lost:${books[
														index
													]?.id.toString()}`}
													className={
														colorTheme.theme !== "missing"
															? "font-bold bg-gray-700 p-2 text-green-500 hover:underline rounded-xl hover:scale-110 hover:text-red-600 transition-transform"
															: "font-bold text-red-500 hover:underline"
													}
												>
													{`${lostFound?.split(" ")[1]}`}
												</a>
											) : null}
										</td>
									</tr>
								) : null;
							}),
						)}
					</tbody>
				</table>
			</div>
			<FilterButton />
		</div>
	);
}
