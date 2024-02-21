"use client";
import React, { useEffect, useState } from "react";
import BookList from "../component/BookList";
import { redirect } from "next/navigation";
import Navigation from "@/app/components/navigation";
import StaticModal from "../component/StaticModal";
import ProtectedPage from "../../protectedPage/page";
import { useRouter } from "next/navigation";

// Define your component
const Borrowed = () => {
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
		theme: "borrowed",
		fetchLink: "registeredBooks",
		type: "borrowedBooks",
		lostFound: "Lost Return",
	};
	const [showModal, setShowModal] = useState(false);
	const [bookInfo, setBookInfo] = useState<BookInfo | null>(null);
	const [userInfo, setUserInfo] = useState<UserToken | null>(null);
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
			setUserInfo(decodedToken);
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
