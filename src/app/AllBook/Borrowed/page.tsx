import React, { useEffect, useState } from "react";
import BookList from "../component/BookList";
import { redirect } from "next/navigation";
import Navigation from "@/app/components/navigation";
import StaticModal from "../component/StaticModal";
import ProtectedPage from "../../protectedPage/page";

// Define your component
const Borrowed = () => {
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
		theme: "borrowed",
		fetchLink: "registeredBooks",
		type: "borrowedBooks",
		lostFound: "Lost Return",
	};
	const [showModal, setShowModal] = useState(false);
	const [bookInfo, setBookInfo] = useState<BookInfo | null>(null);
	const toggleModal = () => {
		setShowModal(!showModal);
	};
	const recieveBookInfo = (data: BookInfo) => {
		setBookInfo(data);
	};
	useEffect(() => {
		const token = localStorage.getItem("token");
		if (token) {
			const decodedToken = JSON.parse(atob(token.split(".")[1]));
			console.log(decodedToken);
			decodedToken.role !== "Staff" ? redirect("/login") : null;
		} else {
			redirect("/login");
		}
	}, []);
	return (
		<div className="size-full h-dvh bg-gray-300 dark:bg-gray-900">
			<ProtectedPage />
			<Navigation />
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
export default Borrowed;
