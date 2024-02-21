/* eslint-disable no-unused-vars */
//
import React, { useEffect, useState } from "react";
import Image from "next/image";
import imgJpg from "/public/img/content.jpeg";
import axios from "axios";
import { Book } from "@prisma/client";

// Interfaces
interface StaticModalProps {
	showModal: boolean; // Prop to determine whether the modal should be displayed
	toggleModal: () => void; // Function to toggle the modal
	refreshPage: () => void;
	bookInfo: {
		id: number;
		price: number;
		title: string;
		author: string;
		publishers: string;
		published: string;
		invNr: number;
		isbn: string;
		bookImg: string;
	};
	userInfo: {
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
			qrCode: string;
		};
	};
}
interface userInfo {
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
		qrCode: string;
	};
}

// Component
const StaticModal: React.FC<StaticModalProps> = ({
	showModal,
	toggleModal,
	bookInfo,
	userInfo,
	refreshPage,
}) => {
	// Saves the bookInfo to a state
	useEffect(() => {
		setBookInfoState(bookInfo);
	}, [bookInfo]);
	// State to switch between the book info and the edit form
	const [switchDiv, setSwitchDiv] = useState(true);
	// State to save the book info
	const [bookInfoState, setBookInfoState] = useState(bookInfo);
	// State to save the file
	const [file, setFile] = useState<File | undefined>(undefined);
	// State to save the user info
	const [user, setUser] = useState<userInfo | null>(userInfo);
	// Previous image dots added because of backend-need
	const prevImage = `.......${bookInfo.bookImg}`;

	// Set user info to state
	useEffect(() => {
		setUser(userInfo);
	}, [userInfo]);

	// Function to switch between the book info and the edit form
	const switchingDiv = () => {
		setSwitchDiv(!switchDiv);
	};

	// Function to handle the submit of the edit form
	const handleSubmit = async (e: React.SyntheticEvent) => {
		e.preventDefault();
		const formData = new FormData();
		let imagePath = "";
		if (file !== undefined) {
			formData.append("file", file || undefined);
			formData.append("path", "bookImage");
			imagePath = await axios
				.post("/api/uploader", formData, {
					headers: { "Content-Type": "multipart/form-data" },
				})
				.then((res) => {
					return res.data.path;
				})
				.catch((error: Error) => {
					console.debug(error);
				});
		}
		// Create a book object(copy-pasted from user)
		const userData: Book = {
			id: bookInfoState.id,
			bookImg: imagePath ? imagePath : prevImage,
			title: bookInfoState.title,
			author: bookInfoState.author,
			publishers: bookInfoState.publishers,
			published: new Date(bookInfoState.published),
			regDate: new Date(),
			isbn: bookInfoState.isbn,
			invNr: bookInfoState.invNr,
			price: bookInfoState.price,
			available: true,
		};

		// Post form data to backend
		await axios.post("/api/editBooks", userData, {
			headers: { "Content-Type": "application/json" },
		});
	};
	return (
		<>
			{/* Modal overlay */}
			{showModal && (
				<div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
					{/* Modal content */}
					<div className="bg-white rounded-lg shadow-lg p-8 max-w-xl w-full dark:bg-gray-800">
						{/* Modal header */}
						<div className="flex items-center justify-between mb-4">
							{/* header */}
							<h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
								Book info
							</h3>
							{/* Close button */}
							<button
								type="button"
								onClick={() => {
									toggleModal();
									setSwitchDiv;
								}}
								className="text-gray-500 hover:text-gray-700 focus:outline-none"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="h-6 w-6"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<title>Close</title>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M6 18L18 6M6 6l12 12"
									/>
								</svg>
							</button>
						</div>
						{/* Modal body */}
						{/* If switchDiv is true, display the book info else display the edit form*/}
						{switchDiv ? (
							<div>
								<div className="flex justify-center items-center bg-gray-100 dark:bg-gray-700">
									<div className="p-2 bg-white shadow-lg rounded-lg dark:bg-gray-800">
										{/* Title */}
										<h3 className="text-lg text-black dark:text-gray-100 font-bold mb-2">
											{bookInfo.title}
										</h3>
										{/* Image */}
										<div className="relative h-64 w-48 m-auto">
											<Image
												className="m-auto"
												src={imgJpg}
												alt="Landscape picture"
												layout="fill"
											/>
										</div>
										{/* Author */}
										<p className="text-gray-700 text-base mt-4 dark:text-gray-100">
											<span className="font-semibold">Author:</span>{" "}
											{bookInfo.author}
										</p>
										{/* Published */}
										<p className="text-gray-700 text-base dark:text-gray-100">
											<span className="font-semibold">Published:</span>{" "}
											{bookInfo.published.split("T")[0]}
										</p>
										{/* Publishers */}
										<p className="text-gray-700 text-base dark:text-gray-100">
											<span className="font-semibold">Publishers:</span>{" "}
											{bookInfo.publishers}
										</p>
										{/* Isbn and invNr */}
										<p className="text-gray-700 text-base dark:text-gray-100">
											<span className="font-semibold">ISBN:</span>{" "}
											{bookInfo.isbn}{" "}
											<span className="font-semibold"> invNr:</span>{" "}
											{bookInfo.invNr}
										</p>
									</div>
								</div>
							</div>
						) : (
							<form
								onSubmit={() => {
									handleSubmit;
									refreshPage;
								}}
								method="POST"
							>
								{/* Edit Modal Body */}
								<div>
									<div className="flex justify-center items-center bg-gray-100 dark:bg-gray-800">
										<div className="p-2 bg-white shadow-lg rounded-lg dark:bg-gray-700">
											{/* Title */}
											<h3 className="text-lg text-black font-bold mb-2 dark:text-gray-100">
												{bookInfoState.title}
											</h3>
											<label
												htmlFor={"editTitle"}
												className="text-black font-semibold dark:text-gray-100"
											>
												Title:{" "}
											</label>
											{/* Edit Title */}
											<input
												type="text"
												name="bookUpdateTitle"
												id={"editTitle"}
												value={bookInfoState.title}
												className="w-full p-2 mb-4 border border-gray-300 rounded-md bg-gray-50 focus:outline-blue-500 text-gray-700 dark:text-gray-100 dark:bg-gray-800 dark:border-gray-600"
												onChange={(event) =>
													setBookInfoState((prevState) => ({
														...prevState,
														title: event.target.value,
													}))
												}
											/>
											<label
												htmlFor={"editAuthor"}
												className="text-black font-semibold dark:text-gray-100"
											>
												Author:{" "}
											</label>
											{/* Edit Author */}
											<input
												type="text"
												name="bookUpdateAuthor"
												id={"editAuthor"}
												value={bookInfoState.author}
												className="w-full p-2 mb-4 border border-gray-300 rounded-md bg-gray-50 focus:outline-blue-500 text-gray-700 dark:text-gray-100 dark:bg-gray-800 dark:border-gray-600"
												onChange={(event) =>
													setBookInfoState((prevState) => ({
														...prevState,
														author: event.target.value,
													}))
												}
											/>
											<label
												htmlFor={"editPublishers"}
												className="text-black font-semibold dark:text-gray-100"
											>
												Publishers:{" "}
											</label>
											{/* Edit Publishers */}
											<input
												type="text"
												name="bookUpdatePublishers"
												id={"editPublishers"}
												value={bookInfoState.publishers}
												className="w-full p-2 mb-4 border border-gray-300 rounded-md bg-gray-50 focus:outline-blue-500 text-gray-700 dark:text-gray-100 dark:bg-gray-800 dark:border-gray-600"
												onChange={(event) =>
													setBookInfoState((prevState) => ({
														...prevState,
														publishers: event.target.value,
													}))
												}
											/>
											<label
												htmlFor={"editPublished"}
												className="text-black font-semibold dark:text-gray-100"
											>
												Published:{" "}
											</label>
											{/* Edit Published */}
											<input
												type="date"
												name="bookUpdatePublished"
												id={"editPublished"}
												value={bookInfoState.published}
												className="w-full p-2 mb-4 border border-gray-300 rounded-md bg-gray-50 focus:outline-blue-500 text-gray-700 dark:text-gray-100 dark:bg-gray-800 dark:border-gray-600"
												onChange={(event) =>
													setBookInfoState((prevState) => ({
														...prevState,
														published: event.target.value,
													}))
												}
											/>
											<div className="flex w-full justify-around items-center">
												<div>
													<label
														htmlFor={"editIsbn"}
														className="text-black font-semibold dark:text-gray-100"
													>
														isbn:{" "}
													</label>
													{/* Edit Isbn */}
													<input
														type="text"
														name="bookUpdateisbn"
														id={"editIsbn"}
														value={bookInfoState.isbn}
														className="p-2 mb-4 border border-gray-300 rounded-md bg-gray-50 focus:outline-blue-500 text-gray-700 dark:text-gray-100 dark:bg-gray-800 dark:border-gray-600"
														onChange={(event) =>
															setBookInfoState((prevState) => ({
																...prevState,
																isbn: event.target.value,
															}))
														}
													/>
												</div>
												<div>
													<label
														htmlFor={"editinvNr"}
														className="text-black font-semibold dark:text-gray-100"
													>
														invNr:{" "}
													</label>
													{/* Edit InvNr */}
													<input
														type="number"
														name="bookUpdateinvNr"
														id={"editinvNr"}
														value={bookInfoState.invNr}
														className="p-2 mb-4 border border-gray-300 rounded-md bg-gray-50 focus:outline-blue-500 text-gray-700 dark:text-gray-100 dark:bg-gray-800 dark:border-gray-600"
														onChange={(event) =>
															setBookInfoState((prevState) => ({
																...prevState,
																invNr: Number(event.target.value),
															}))
														}
													/>
												</div>
											</div>
											<label
												htmlFor={"editbookImg"}
												className="text-black font-semibold dark:text-gray-100"
											>
												bookImg:{" "}
											</label>
											{/* Edit BookImg */}
											<input
												type="file"
												name="bookUpdatebookImg"
												id={"editbookImg"}
												className="w-full p-2 mb-4 border border-gray-300 rounded-md bg-gray-50 focus:outline-blue-500 text-gray-700 dark:text-gray-100 dark:bg-gray-800 dark:border-gray-600"
												onChange={(e) => {
													setFile(e.target.files?.[0]);
												}}
											/>
											<button
												type="submit"
												className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
											>
												Submit
											</button>
										</div>
									</div>
								</div>
							</form>
						)}
						{/* Modal footer */}
						<div className="mt-4 flex justify-between">
							{/* Ternary if logged in as Admin, can see edit btn/info btn else cant */}
							{switchDiv ? (
								user?.role === "Admin" ? (
									<button
										onClick={switchingDiv}
										className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none"
										type="button"
									>
										Edit
									</button>
								) : null
							) : (
								<button
									onClick={switchingDiv}
									className="px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-900 focus:outline-none"
									type="button"
								>
									Info
								</button>
							)}
							<button
								onClick={() => {
									toggleModal();
									setSwitchDiv;
								}}
								className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none"
								type="button"
							>
								Close
							</button>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default StaticModal;
