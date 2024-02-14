"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import { useParams } from "next/navigation";
import { Staff, Student } from "@prisma/client";

type UserModal = {
	staffUsers: Staff;
	studentUsers: Student;
};

export default function Home() {
	const [apiData, setApiData] = useState<UserModal>();
	const [books, setBooks] = useState([]);
	const [searchTerm, setSearchTerm] = useState<string>("");
	const params = useParams();

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.post("/api/getUsers", {
					type: params.role,
					id: Number(params.id),
				});

				setApiData(response.data);
				setBooks(response.data.borrowed);
			} catch (error) {
				return [];
			}
		};

		const fetchData2 = async () => {
			try {
				console.log(books);
				const response = await axios.post("/api/specifiedBook", {
					books: books,
				});
				setApiData(response.data);
			} catch (error) {
				return [];
			}
		};

		fetchData();
		fetchData2();
	}, [params.role, params.id]);

	return (
		<main className="flex border items-center h-screen justify-around p-4">
			<div className="flex border items-center justify-center max-w-xs">
				<div className="max-h-screen items-center flex-col justify-center h-5/6 w-96 bg-white shadow-xl rounded-lg py-3">
					<Image
						className="w-10 h-10 rounded-full"
						src={`/${apiData?.image}`}
						width={50}
						height={50}
						alt="asd"
					/>
					{apiData?.borrowed.map((item) => console.log(item))}
					<div className="p-2">
						<div className="text-center text-gray-400 text-xs font-semibold">
							<p>{apiData?.firstName}</p>
						</div>
						<table className="text-1xl my-3">
							<tbody>
								<tr>
									<td className="px-4 py-4 text-gray-500 font-semibold">
										Email: {apiData?.email}
									</td>
								</tr>
								<tr>
									<td className="px-4 py-4 text-gray-500 font-semibold">
										Phone: {apiData?.phone}
									</td>
								</tr>
								<tr>
									<td className="px-4 py-4 text-gray-500 font-semibold">
										Classroom: {apiData?.classroom}
									</td>
								</tr>
							</tbody>
						</table>
						<div className="text-center my-3" />
					</div>
				</div>
			</div>

			<div className="flex flex-col overflow-y-auto max-h-screen w-2/3 h-3/4 shadow-md sm:rounded-lg">
				<div className="flex flex-col items-center justify-between flex-wrap md:flex-row space-y-4 md:space-y-0 pb-4 bg-white dark:bg-gray-900">
					<div>
						<h2 className="text-3xl normal font-bold px-4 py-2">
							Loaned Books
						</h2>
					</div>
					<label htmlFor="table-search" className="sr-only">
						Search
					</label>
					<div className="relative">
						<div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
							<svg
								className="w-4 h-4 text-gray-500 dark:text-gray-400"
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
							type="text"
							id="table-search-users"
							className="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
							placeholder="Search for users"
							value={searchTerm}
						/>
					</div>
					<table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
						<thead className="text-xs sticky top-[60px] text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
							<tr>
								<th scope="col" className="px-6 py-3">
									Book
								</th>
								<th scope="col" className="px-6 py-3">
									Author
								</th>
								<th scope="col" className="px-6 py-3">
									Registered Date
								</th>
								<th scope="col" className="px-6 py-3">
									Status
								</th>
							</tr>
						</thead>

						{apiData?.borrowed.map((item) => (
							<tr key={item.id}>
								<td className="px-6 py-4">{item.bookId}</td>
								<td className="px-6 py-4">{item.author}</td>
								<td className="px-6 py-4">{item.registeredDate}</td>
								<td className="px-6 py-4">{item.status}</td>
							</tr>
						))}
					</table>
				</div>
			</div>
		</main>
	);
}
