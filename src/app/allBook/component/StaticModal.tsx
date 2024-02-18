import React, { useEffect, useState } from "react";
import Image from "next/image";
import imgJpg from "/public/img/content.jpeg";

interface StaticModalProps {
	showModal: boolean; // Prop to determine whether the modal should be displayed
	toggleModal: () => void; // Function to toggle the modal
	bookInfo: {
		id: number;
		price: number;
		title: string;
		author: string;
		published: string;
		invNr: number;
		isbn: string;
		bookImg: string;
	};
}

const StaticModal: React.FC<StaticModalProps> = ({
	showModal,
	toggleModal,
	bookInfo,
}) => {
	useEffect(() => {
		setBookInfoState(bookInfo);
	}, [bookInfo]);
	const [switchDiv, setSwitchDiv] = useState("none");
	const [switchDiv2, setSwitchDiv2] = useState("block");
	const [bookInfoState, setBookInfoState] = useState(bookInfo);
	const switchingDiv = () => {
		switchDiv === "block" ? setSwitchDiv("none") : setSwitchDiv("block");
		switchDiv2 === "block" ? setSwitchDiv2("none") : setSwitchDiv2("block");
	};
	return (
		<>
			{/* Modal overlay */}
			{showModal && (
				<div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
					{/* Modal content */}
					<div className="bg-white rounded-lg shadow-lg p-8 max-w-xl w-full">
						{/* Modal header */}
						<div className="flex items-center justify-between mb-4">
							<h3 className="text-lg font-semibold text-gray-900">Book info</h3>
							<button
								type="button"
								onClick={() => {
									toggleModal();
									setSwitchDiv("none");
									setSwitchDiv2("block");
								}}
								className="text-gray-500 hover:text-gray-700 focus:outline-none"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="h-4 w-4"
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
						<div style={{ display: switchDiv2 }}>
							<div className="flex justify-center items-center bg-gray-100">
								<div className="p-2 bg-white shadow-lg rounded-lg">
									<h3 className="text-lg text-black font-bold mb-4">
										{bookInfo.title}
									</h3>

									<div className="relative h-64 w-48 m-auto">
										<Image
											className="m-auto"
											src={imgJpg}
											alt="Landscape picture"
											layout="fill"
										/>
									</div>
									<p className="text-gray-700 text-base mt-4">
										<span className="font-semibold">Author:</span>{" "}
										{bookInfo.author}
									</p>
									<p className="text-gray-700 text-base">
										<span className="font-semibold">Published:</span>{" "}
										{bookInfo.published.split("T")[0]}
									</p>
									<p className="text-gray-700 text-base">
										<span className="font-semibold">ISBN:</span> {bookInfo.isbn}{" "}
										<span className="font-semibold"> invNr:</span>{" "}
										{bookInfo.invNr}
									</p>
								</div>
							</div>
						</div>
						{/* Modal Edit Body */}
						<form action="">
							<div style={{ display: switchDiv }}>
								<div className="flex justify-center items-center bg-gray-100">
									<div className="p-2 bg-white shadow-lg rounded-lg">
										<h3 className="text-lg text-black font-bold mb-4">
											{bookInfoState.title}
										</h3>
										<label
											htmlFor={"editTitle"}
											className="text-black font-semibold"
										>
											Title:{" "}
										</label>
										<input
											type="text"
											name="bookUpdateTitle"
											id={"editTitle"}
											value={bookInfoState.title}
											className="w-full p-2 mb-4 border border-gray-300 rounded-md bg-gray-50 focus:outline-blue-500 text-gray-700"
											onChange={(event) =>
												setBookInfoState((prevState) => ({
													...prevState,
													title: event.target.value,
												}))
											}
										/>
										<label
											htmlFor={"editAuthor"}
											className="text-black font-semibold"
										>
											Author:{" "}
										</label>
										<input
											type="text"
											name="bookUpdateAuthor"
											id={"editAuthor"}
											value={bookInfoState.author}
											className="w-full p-2 mb-4 border border-gray-300 rounded-md bg-gray-50 focus:outline-blue-500 text-gray-700"
											onChange={(event) =>
												setBookInfoState((prevState) => ({
													...prevState,
													author: event.target.value,
												}))
											}
										/>
										<label
											htmlFor={"editPublished"}
											className="text-black font-semibold"
										>
											Published:{" "}
										</label>
										<input
											type="date"
											name="bookUpdatePublished"
											id={"editPublished"}
											value={bookInfoState.published}
											className="w-full p-2 mb-4 border border-gray-300 rounded-md bg-gray-50 focus:outline-blue-500 text-gray-700"
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
													className="text-black font-semibold"
												>
													isbn:{" "}
												</label>
												<input
													type="text"
													name="bookUpdateisbn"
													id={"editIsbn"}
													value={bookInfoState.isbn}
													className="p-2 mb-4 border border-gray-300 rounded-md bg-gray-50 focus:outline-blue-500 text-gray-700"
													onChange={(event) =>
														setBookInfoState((prevState) => ({
															...prevState,
															isbn: event.target.value,
														}))
													}
												/>
											</div>
											id
											<div>
												<label
													htmlFor={"editinvNr"}
													className="text-black font-semibold"
												>
													invNr:{" "}
												</label>
												<input
													type="number"
													name="bookUpdateinvNr"
													id={"editinvNr"}
													value={bookInfoState.invNr}
													className="p-2 mb-4 border border-gray-300 rounded-md bg-gray-50 focus:outline-blue-500 text-gray-700"
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
											className="text-black font-semibold"
										>
											bookImg:{" "}
										</label>
										<input
											type="file"
											name="bookUpdatebookImg"
											id={"editbookImg"}
											className="w-full p-2 mb-4 border border-gray-300 rounded-md bg-gray-50 focus:outline-blue-500 text-gray-700"
											onChange={(event) =>
												setBookInfoState((prevState) => ({
													...prevState,
													bookImg: event.target.value,
												}))
											}
										/>
									</div>
								</div>
							</div>
						</form>

						{/* Modal footer */}
						<div className="mt-4 flex justify-between">
							<button
								onClick={switchingDiv}
								className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none"
								type="button"
							>
								Edit
							</button>
							<button
								onClick={() => {
									toggleModal();
									setSwitchDiv("none");
									setSwitchDiv2("block");
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
