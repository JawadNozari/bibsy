"use client";
import React, { ReactNode, useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import { useParams } from "next/navigation";
import { Staff, Student, borrowedBooks } from "@prisma/client";
import { CheckIfLoggedIn } from "../../../components/loginChecks";
import { useRouter } from "next/navigation";
import Loading from "../../../components/loading";

type UserModal = {
	admin: boolean;
	id: number;
	phone: ReactNode;
	classroom: ReactNode;
	borrowed: Array<borrowedBooks> | undefined;
	email: ReactNode;
	firstName: ReactNode;
	lastName: ReactNode;
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
	const router = useRouter();

	const [loading, setLoading] = useState<boolean>(true);

	const [apiData, setApiData] = useState<UserModal>();
	const [bookArray, setBookArray] = useState<Book[]>([]);
	const params = useParams();

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
		const token = localStorage.getItem("token");
		if (!token) {
			router.push("/login");
		} else {
			const { whatUserAreYou, user } = CheckIfLoggedIn(token);
			setLoading(false);
			if (whatUserAreYou === "Student") {
				if (params.role !== "student" || Number(params.id) !== user.user.id) {
					// Redirect student to its own profile
					router.push(`/profile/student/${user.user.id}`);
				}
			}
		}
	}, [params.role, params.id, router]);

	return loading ? (
		<div>
			<Loading />
		</div>
	) : (
		<main className=" flex w-screen sm:flex-row  h-screen">
			<div className="flex flex-col sm:flex-row justify-around w-full dark:bg-gray-900">
				<div className="flex border-r items-center justify-center sm:mb-0 sm:mr-4">
					{apiData && (
						<div className=" items-center flex-col justify-center w-full max-h-screen sm:w-96 bg-white dark:bg-gray-900 shadow-xl rounded-lg py-3 ">
							<div className="flex items-center justify-center flex-col bg-white dark:bg-gray-900 dark:text-gray-300 py-3">
								<Image
									className="w-40 h-40 rounded-full"
									src={apiData?.image ? `/${apiData?.image}` : "/pfp.jpg"}
									width={200}
									height={200}
									alt="asd"
								/>
							</div>
							<div className="p-2">
								<div className="text-center text-gray-400 font-semibold">
									<h1>
										{apiData?.firstName}{" "}
										<span className="ml-2"> {apiData?.lastName} </span>{" "}
									</h1>
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
												{params.role === "staff" ? (
													<>
														Staff{" "}
														{apiData.admin === true ? "is Admin" : "is not Admin"}
													</>
												) : (
													`Class: ${apiData?.classroom}`
												)}
											</td>
										</tr>
									</tbody>
								</table>
							</div>
						</div>
					)}
				</div>
				<div className="flex flex-col overflow-y-auto max-h-screen w-full sm:w-2/3 shadow-md sm:rounded-lg ">
					<div className="text-center w-full sticky top-0">
						<h2 className="text-3xl font-bold px-4 py-5">Loaned Books</h2>
						<table className="text-sm text-left text-gray-500 dark:text-gray-400 dark:bg-gray-800 ">
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
										<tr className="border-b" key={item.id}>
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
	);
}
