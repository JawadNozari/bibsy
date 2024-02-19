"use client";
import React, { useState } from "react";
import BookList from "../component/BookList";
import StaticModal from "../component/StaticModal";
import Navigation from "../../Navigation/page";

// Define your component
const Available = () => {
	interface BookInfo {
		id: number;
		price: number;
		title: string;
		author: string;
		published: string;
		publishers: string;
		invNr: number;
		isbn: string;
		bookImg: string;
	}
	const colorTheme = {
		theme: "available",
		fetchLink: "availableBooks",
		lostFound: "Borrow",
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
		<div className="size-full h-dvh bg-gray-300 dark:bg-gray-900">
			<div className="z-50 w-full">
				<Navigation />
			</div>
			<BookList
				colorTheme={colorTheme}
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
								publishers: "",
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
export default Available;
