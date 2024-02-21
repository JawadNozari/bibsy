"use client";
import React, { useState, useEffect } from "react";
import BookList from "../component/BookList";
import ProtectedPage from "../../protectedPage/page";
import Navigation from "../../components/navigation";
import { redirect } from "next/navigation";
import StaticModal from "../component/StaticModal";
import { useRouter } from "next/navigation";

// Define your component
const Missing = () => {
	const { refresh } = useRouter();
	<ProtectedPage />;
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
		theme: "missing",
		fetchLink: "registeredBooks",
		type: "missingBooks",
		lostFound: "Found",
	};

	const [bookInfo, setBookInfo] = useState<BookInfo | null>(null);
	const [showModal, setShowModal] = useState(false);
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
			decodedToken.role !== "Admin" ? redirect("/login") : null;
		} else {
			redirect("/login");
		}
	}, []);
	return (
		<div className="size-full h-dvh bg-gray-300 dark:bg-gray-900">
			<div className="fixed -translate-x-96">
				<ProtectedPage />
			</div>
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
export default Missing;
