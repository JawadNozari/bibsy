"use client";
import React, { useState } from "react";
import BookList from "../component/BookList";
import StaticModal from "../component/StaticModal";

// Define your component
const Missing = () => {
	interface BookInfo {
		id: number;
		price: number;
		title: string;
		author: string;
		published: string;
		invNr: number;
		isbn: string;
		bookImg: string;
	}
	const colorTheme = {
		theme: "missing",
		fetchLink: "registeredBooks",
		type: "missingBooks",
		lostFound: "Found",
	};

	const [bookInfo, setBookInfo] = useState<BookInfo | null>(null);
	const [showModal, setShowModal] = useState(false);
	const toggleModal = () => {
		setShowModal(!showModal);
	};
	const recieveBookInfo = (data: BookInfo) => {
		setBookInfo(data);
	};
	return (
		<div
			className="size-full h-dvh bg-gray-300 dark:bg-gray-900"
			style={{
				height: "100edvh",
			}}
		>
			<BookList
				colorTheme={colorTheme}
				toggleModal={toggleModal}
				bookInfoData={recieveBookInfo}
			/>
			<StaticModal showModal={showModal} toggleModal={toggleModal} bookInfo={
					bookInfo !== null
						? bookInfo
						: {
								id: 0,
								price: 0,
								title: "",
								author: "",
								published: "",
								invNr: 0,
								isbn: "",
								bookImg: "",
						  }
				} />
		</div>
	);
};

// Export your component
export default Missing;
