"use client";
import React, { useState, useEffect } from "react";
import BookList from "../component/BookList";
import Navigation from "../../components/navigation";
import StaticModal from "../component/StaticModal";
import { redirect, useRouter } from "next/navigation";

// Define your component
const Available = () => {
	const { refresh } = useRouter();
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
	const colorTheme = {
		theme: "available",
		fetchLink: "availableBooks",
		lostFound: "Borrow",
	};
	const [bookInfo, setBookInfo] = useState<BookInfo | null>(null);
	const [showModal, setShowModal] = useState(false);
	const [userInfo, setUserInfo] = useState<UserToken | null>(null);
	useEffect(() => {
		const token = localStorage.getItem("token");
		if (token) {
			const decodedToken = JSON.parse(atob(token.split(".")[1]));

			setUserInfo(decodedToken);
		} else {
			redirect("/");
		}
	}, []);
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
				refreshPage={refresh}
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
export default Available;
