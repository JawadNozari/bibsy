"use client";
import React, { useEffect, useState } from "react";
import BookList from "../component/bookList";
import { redirect } from "next/navigation";
import Navigation from "@/app/components/navigation";
import StaticModal from "../component/staticModal";
import ProtectedPage from "../../protectedPage/page";
import { useRouter } from "next/navigation";

// Component
const Borrowed = () => {
	// Use the useRouter hook to access the refresh function
	const { refresh } = useRouter();
	// Interfaces
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
	// Theme
	const colorTheme = {
		theme: "borrowed",
		fetchLink: "registeredBooks",
		type: "borrowedBooks",
		lostFound: "Lost Return",
	};
	// States
	// Modal State (Show/Hide)
	const [showModal, setShowModal] = useState(false);
	// BookInfo
	const [bookInfo, setBookInfo] = useState<BookInfo | null>(null);
	// User Info State (Logged in user)
	const [userInfo, setUserInfo] = useState<UserToken | null>(null);
	// Toggle Modal
	const toggleModal = () => {
		setShowModal(!showModal);
	};
	// Recieve Book Info
	const recieveBookInfo = (data: BookInfo) => {
		setBookInfo(data);
	};
	// Use the useEffect hook to fetch the user token from local storage
	useEffect(() => {
		const token = localStorage.getItem("token");
		if (token) {
			const decodedToken = JSON.parse(atob(token.split(".")[1]));
			setUserInfo(decodedToken);
			decodedToken.role !== "Admin" ? redirect("/login") : null;
		} else {
			redirect("/");
		}
	}, []);
	// Return your component
	return (
		// Main div
		<div className="size-full h-dvh bg-gray-300 dark:bg-gray-900">
			<div className="fixed -translate-x-96">
				{/* session */}
				<ProtectedPage />
			</div>
			{/* Nav */}
			<Navigation />
			{/* Booklist */}
			<BookList
				colorTheme={colorTheme}
				toggleModal={toggleModal}
				bookInfoData={recieveBookInfo}
			/>
			{/* StaticModal */}
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
export default Borrowed;
