"use client";
import React,{useState} from "react";
import BookList from "../component/BookList";
import StaticModal from "../component/StaticModal";

// Define your component
const Borrowed = () => {
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
		theme: "borrowed",
		fetchLink: "registeredBooks",
		type: "borrowedBooks",
		lostFound: "Lost Return",
	};
	const [showModal, setShowModal] = useState(false);
	const [bookInfo, setBookInfo]=useState<BookInfo | null>(null);
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
			<BookList colorTheme={colorTheme} toggleModal={toggleModal} bookInfoData={recieveBookInfo}/>
			<StaticModal showModal={showModal} toggleModal={toggleModal} />
		</div>
	);
};

// Export your component
export default Borrowed;
