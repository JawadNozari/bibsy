"use client";
import React, { useState, useEffect } from "react";

// Book interface
interface Book {
	id: string;
	price: number;
	category: string;
	rating: number;
	title: string;
	products: object;
}
interface Links {
	key: string;
	name: string;
	link: string;
}
interface Links {
	key: string;
	name: string;
	link: string;
}
<<<<<<< Updated upstream
=======
export default function BookList() {
	const [books, setBooks] = useState<Array<Book>>([])
	const [dropdown, setDropdown] = useState(false)
>>>>>>> Stashed changes

interface LinkArray {
	links: Links[];
}

const linkObject: LinkArray = {
	links: [
		{ key: "book", name: "Book", link: "/allBook" },
		{ key: "available", name: "Available", link: "/allBook/available" },
		{ key: "missing", name: "Missing", link: "/allBook/missing" },
		{ key: "borrowed", name: "Borrowed", link: "/allBook/borrowed" },
	],
};

export default function BookList() {
	// where the fetched data is stored
	const [books, setBooks] = useState<Array<Book>>([]);
	// dropdown state
	const [dropdown, setDropdown] = useState(false);

	// Fetching data
	useEffect(() => {
		fetch("https://dummyjson.com/products")
			.then((res) => res.json())
			.then((data) => setBooks(data.products))
<<<<<<< Updated upstream
			.catch((error) => console.log(error));
	}, []);
=======
			.catch((error) => console.log(error))
	}, [])
	console.log(books)
	const dropdownClass =
		"z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
>>>>>>> Stashed changes

	// Dropdown class so that works with tailwind
	return (
		// TableTemplate edited
<<<<<<< Updated upstream
		<div className="size-9/12 absolute bottom-0 left-1/2 transform -translate-x-1/2  h-1/2-dvh flex justify-start flex-wrap">
			<div className="size-2/12 w-full">
				{/* link container */}
				<div className="size-10/12 h-full flex justify-end items-end">
					{/* Link map */}
					{linkObject.links
						.slice(0)
						.reverse()
						.map((link: Links) => (
							<a
								key={link.key}
								href={link.link}
								className="h-full bg-black flex justify-center items-center w-36 border-8 hover:bg-gray-500 transition-colors rounded-t-3xl border-gray-300 border-b-0 -ml-64 -translate-x-96"
							>
								{link.name}
							</a>
						))}
				</div>
			</div>
			<div className="relative bottom-0 overflow-x-auto sleek-scrollbar shadow-md  size-10/12 rounded-tl-xl">
=======
		<div className="size-9/12 absolute bottom-0 left-1/2 transform -translate-x-1/2  h-1/2-dvh">
			<div className="absolute bottom-0 overflow-x-auto sleek-scrollbar shadow-md  size-10/12 ">
>>>>>>> Stashed changes
				<table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
					<thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 sticky top-0 p-3">
						<tr>
							<th scope="col" className="px-6 py-3">
								Product name
							</th>
							<th scope="col" className="px-6 py-3">
								Rating
							</th>
							<th scope="col" className="px-6 py-3">
								Category
							</th>
							<th scope="col" className="px-6 py-3">
								Price
							</th>
							<th scope="col" className="px-6 py-3">
								Action
							</th>
						</tr>
					</thead>
					<tbody>
						{/* Map of fetched data which prints out table-row */}
						{books.map((book, index) => (
							<tr
								key={book.id}
								className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
							>
								<th
									scope="row"
									className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
								>
									{books.length > 0 ? books[index]?.title : "loading..."}
								</th>
								<td className="px-6 py-4">
									{books.length > 0 ? books[index]?.rating : "loading..."}
								</td>
								<td className="px-6 py-4">
									{books.length > 0 ? books[index]?.category : "loading..."}
								</td>
								<td className="px-6 py-4">
									${books.length > 0 ? books[index]?.price : "loading..."}
								</td>
								<td className="px-6 py-4">
									<a
										href={books[index]?.id}
										className="font-medium text-red-600 hover:underline"
									>
										Lost
									</a>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
<<<<<<< Updated upstream
			<div
				// dropdown Container
				className="size-1/12 h-56 flex justify-start flex-col items-start"
			>
				<button
					id="dropdownDefaultButton"
					onClick={() => {
						// onclick to make button false or true
						!dropdown ? setDropdown(true) : setDropdown(false);
					}}
					className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm  text-center inline-flex items-center justify-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 w-28 h-14"
					type="button"
				>
					Filter
				</button>

				<div
					id="dropdown"
					// dropdown if false then hidden else block
					className={
						!dropdown
							? "hidden"
							: "inline z-20 bg-white divide-y divide-gray-100 rounded-lg shadow w-28 dark:bg-gray-700"
					}
				>
					<ul
						className="py-2 text-sm text-gray-700 dark:text-gray-200"
						aria-labelledby="dropdownDefaultButton"
					>
						<li>
							<a
								href="#TEMP"
								className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
							>
								Dashboard
							</a>
						</li>
						<li>
							<a
								href="#TEMP"
								className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
							>
								Settings
							</a>
						</li>
						<li>
							<a
								href="#TEMP"
								className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
							>
								Earnings
							</a>
						</li>
						<li>
							<a
								href="#TEMP"
								className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
							>
								Sign out
							</a>
						</li>
					</ul>
				</div>
=======

			<button
				id="dropdownDefaultButton"
				onClick={() => {
					!dropdown ? setDropdown(true) : setDropdown(false)
				}}
				className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
				type="button"
			>
				Filter
			</button>

			<div
				id="dropdown"
				className={!dropdown ? "hidden" : `block ${dropdownClass}`}
			>
				<ul
					className="py-2 text-sm text-gray-700 dark:text-gray-200"
					aria-labelledby="dropdownDefaultButton"
				>
					<li>
						<a
							href="#TEMP"
							className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
						>
							Dashboard
						</a>
					</li>
					<li>
						<a
							href="#TEMP"
							className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
						>
							Settings
						</a>
					</li>
					<li>
						<a
							href="#TEMP"
							className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
						>
							Earnings
						</a>
					</li>
					<li>
						<a
							href="#TEMP"
							className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
						>
							Sign out
						</a>
					</li>
				</ul>
>>>>>>> Stashed changes
			</div>
		</div>
	);
}
