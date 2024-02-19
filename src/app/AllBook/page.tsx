"use client";
import React, { useState } from "react";
import BookList from "./component/BookList";
import StaticModal from "./component/StaticModal";
import Navigation from "../Navigation/page";

// Define your component
const allBook = () => {
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
	interface Theme {
		theme: string;
		fetchLink: string;
		type?: string;
		lostFound?: string;
	}
	const [bookInfo, setBookInfo] = useState<BookInfo | null>(null);
	const [showModal, setShowModal] = useState(false);

	//Toggle Modal
	const toggleModal = () => {
		setShowModal(!showModal);
	};

	const recieveBookInfo = (data: BookInfo) => {
		setBookInfo(data);
	};
	const colorTheme = {
		theme: "book",
		fetchLink: "registeredBooks",
	};
	return (
		<div className="size-full h-dvh bg-gray-300 dark:bg-gray-900">
			<Navigation />
			<BookList
				colorTheme={colorTheme as Theme}
				toggleModal={toggleModal}
				bookInfoData={recieveBookInfo}
			/>
			<StaticModal
				showModal={showModal}
				toggleModal={toggleModal}
				bookInfo={
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
				}
			/>
		</div>
	);
};

// Export your component
export default allBook;
