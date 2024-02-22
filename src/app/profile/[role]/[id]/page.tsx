"use client";
import React, { ReactNode, useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import { useParams } from "next/navigation";
import { Staff, Student, borrowedBooks } from "@prisma/client";
import Navigation from "../../../components/navigation";

type UserModal = {
	phone: ReactNode;
	classroom: ReactNode;
	borrowed: Array<borrowedBooks> | undefined;
	email: ReactNode;
	firstName: ReactNode;
	image: string;
	staffUsers: Staff;
	studentUsers: Student;
};

type Book = {
	id: number;
	title: string;
	author: string;
	regDate: string;
};

export default function Home() {
	const [apiData, setApiData] = useState<UserModal>();
	const [bookArray, setBookArray] = useState<Book[]>([]);
	const params = useParams();

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.post("/api/getUsers", {
					type: params.role,
					id: Number(params.id),
				});
				setApiData(response.data);

				const response2 = await axios.post("/api/specifiedBook", {
					books: response.data.borrowed,
				});
				setBookArray(response2.data);
			} catch (error) {
				console.error("Error fetching data:", error);
				setBookArray([]);
			}
		};

		fetchData();
	}, [params.role, params.id]);

	return (
		<div className="flex">
			<div>
				<Navigation />
			</div>
			<main className=" flex sm:flex-row items-center w-screen h-screen justify-center">
				<div className="flex flex-col sm:flex-row items-center h-screen justify-center">
					<div className="flex  items-center justify-center max-w-xs mb-4 sm:mb-0 sm:mr-4">
						{apiData && (
							<div className="max-h-screen items-center flex-col justify-center w-full sm:w-96 bg-white dark:bg-gray-900 shadow-xl rounded-lg py-3 ">
								<div className="flex items-center justify-center flex-col max-h-screen bg-white dark:bg-gray-900 dark:text-gray-300 py-3">
									<Image
										className="w-10 h-10 rounded-full"
										src={apiData?.image ? `/${apiData?.image}` : "/pfp.jpg"}
										width={200}
										height={200}
										alt="asd"
									/>
								</div>
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
								</div>
							</div>
						)}
					</div>

					<div className="flex flex-col overflow-y-auto h-2/4 max-h-screen w-full sm:w-2/3 shadow-md sm:rounded-lg dark:bg-gray-900">
						<div className="flex flex-col text-center items-center justify-between flex-wrap md:flex-row space-y-4 md:space-y-0 pb-4  bg-white dark:bg-gray-900 p-2">
							<div className="text-center w-full">
								<h2 className="text-3xl font-bold px-4 py-2">Loaned Books</h2>
							</div>
							<table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 ">
								<thead className="text-xs top-[60px] text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
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
										<th scope="col" className="px-6 py-3 hidden sm:table-cell">
											Note
										</th>
									</tr>
								</thead>
								<tbody>
									{Array.isArray(bookArray) &&
										bookArray?.map((item, index: number) => (
											<tr key={item.id}>
												<td className="px-6 py-4">{item.title}</td>
												<td className="px-6 py-4">{item.author}</td>
												<td className="px-6 py-4">
													{apiData?.borrowed?.[index]
														? (() => {
																const regDate = new Date(
																	apiData.borrowed[index].regDate,
																);
																regDate.setHours(regDate.getHours() + 1); // Add an hour
																const formattedDate = regDate
																	.toISOString()
																	.slice(0, 16)
																	.replace("T", " | ");
																return formattedDate;
														  })()
														: ""}
												</td>
												<td className="px-6 py-4 hidden sm:table-cell">
													{apiData?.borrowed?.[index]
														? apiData.borrowed[index].note
														: ""}
												</td>
											</tr>
										))}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</main>
		</div>
	);
}
