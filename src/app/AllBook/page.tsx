"use client";
import React, { useState, useEffect } from "react";
import BookList from "./component/BookList";
import StaticModal from "./component/StaticModal";
import { redirect } from "next/navigation";

// Define your component
const AllBook = () => {
	interface UserToken {
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
	interface Theme {
		theme: string;
		fetchLink: string;
		type?: string;
		lostFound?: string;
	}
	const [bookInfo, setBookInfo] = useState<BookInfo | null>(null);
	const [showModal, setShowModal] = useState(false);
	const [userInfo, setUserInfo] = useState<UserToken | null>(null);
	useEffect(() => {
		const token = localStorage.getItem("token");
		if (token) {
			const decodedToken = JSON.parse(atob(token.split(".")[1]));
			console.log(decodedToken);
			setUserInfo(decodedToken);
		} else {
			console.log("no token");
			redirect("/login");
		}
	}, []);

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
								publishers: "",
								invNr: 0,
								isbn: "",
								bookImg: "",
						  }
				}
				userInfo={
					userInfo !== null
						? userInfo
						: {
								iat: 0,
								role: "none",
								user: {
									admin: false,
									email: "none",
									firstName: "none",
									id: -20,
									lastName: "none",
									password: "none",
									phone: "none",
									qrCode: "none",
								},
						  }
				}
			/>
		</div>
	);
};

// Export your component
export default AllBook;
