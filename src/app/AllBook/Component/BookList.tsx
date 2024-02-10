"use client";
import React, { useState, useEffect } from "react";

// Book interface
interface Book {
	id: string;
	price: number;
	title: string;
	author: string;
	published: string;
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
	color: string;
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

export default function BookList({ colorTheme }: { colorTheme: string }) {
	// where the fetched data is stored
	const [books, setBooks] = useState<Array<Book>>([]);
	// dropdown state

	// Theme picker
	//Have spaces so that can split and use in tailwind
	const theme: { [key: string]: string } = {
		book: " dark:bg-blue-800 focus:border-blue-800 hover:bg-blue-900",
		available: " dark:bg-green-600 focus:border-green-600 hover:bg-green-700",
		missing: " dark:bg-red-600 focus:border-red-600 hover:bg-red-700",
		borrowed: " dark:bg-yellow-600 focus:border-yellow-600 hover:bg-yellow-700",
	};
	// Fetching data
	useEffect(() => {
		fetch("/api/availableBooks")
			.then((res) => res.json())
			.then((data) => setBooks(data.books))
			.catch((error) => console.log(error));
	}, []);

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
								className={`h-4/5 transform hover:scale-110 origin-bottom hover:z-20 transition-transform ease-in-out duration-300 ${link?.color} flex justify-center text-gray-300 items-center w-1/5 border-8 hover:${link?.color} transition-colors rounded-t-3xl border-gray-700 border-b-0`}
							>
								{link.name}
							</a>
						))}
					{/* spaceDiv */}
				</div>
			</div>
			<div className="relative bottom-0 overflow-x-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-gray-700 shadow-md  size-10/12 rounded-t-xl">
				<table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-300">
					<thead className="text-xs  uppercase bg-gray-50 dark:bg-gray-700 dark:text-white sticky top-0 p-3">
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
												theme[colorTheme].split(" ")[2]
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
								Action
							</th>
						</tr>
					</thead>
					<tbody>
						{/* Map of fetched data which prints out table-row */}
						{books.map((book, index) => (
							<tr
								key={book.id}
								className={`bg-white border-b ${theme[colorTheme]} dark:border-gray-700`}
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
			{/* <div
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
			</div> */}
		</div>
	);
}
