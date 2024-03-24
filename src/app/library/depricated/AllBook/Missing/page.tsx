// "use client";
// import React, { useState, useEffect } from "react";
// import BookList from "../component/bookList";
// import ProtectedPage from "../../../../protectedPage/page";
// import { redirect } from "next/navigation";
// import StaticModal from "../component/staticModal";
// import { useRouter } from "next/navigation";

// // Define your component
// const Missing = () => {
// 	// Use the useRouter hook to access the refresh function
// 	const { refresh } = useRouter();
// 	// Session
// 	<ProtectedPage />;
// 	// Interfaces
// 	interface UserToken {
// 		iat: number;
// 		role: string;
// 		user: {
// 			admin: boolean;
// 			email: string;
// 			firstName: string;
// 			id: number;
// 			lastName: string;
// 			password: string;
// 			phone: string;
// 			qrCode: string;
// 		};
// 	}
// 	interface BookInfo {
// 		id: number;
// 		price: number;
// 		title: string;
// 		author: string;
// 		published: string;
// 		publishers: string;
// 		invNr: number;
// 		isbn: string;
// 		bookImg: string;
// 		bookState: string;
// 	}
// 	// Theme
// 	const colorTheme = {
// 		theme: "missing",
// 		fetchLink: "registeredBooks",
// 		type: "missingBooks",
// 		lostFound: "Found",
// 	};
// 	// States
// 	// BookInfo
// 	const [bookInfo, setBookInfo] = useState<BookInfo | null>(null);
// 	// Modal State (Show/Hide)
// 	const [showModal, setShowModal] = useState(false);
// 	// User Info State (Logged in user)
// 	const [userInfo, setUserInfo] = useState<UserToken | null>(null);

// 	// Toggle Modal
// 	const toggleModal = () => {
// 		setShowModal(!showModal);
// 	};
// 	// Recieve Book Info
// 	const recieveBookInfo = (data: BookInfo) => {
// 		setBookInfo({
// 			id: data.id,
// 			price: data.price,
// 			title: data.title,
// 			author: data.author,
// 			published: data.published,
// 			publishers: data.publishers,
// 			invNr: data.invNr,
// 			isbn: data.isbn,
// 			bookImg: data.bookImg,
// 			bookState: "missing",
// 		});
// 	};
// 	// UseEffect to check if user is logged in and if not redirect to /
// 	// useEffect(() => {
// 	// 	const token = localStorage.getItem("token");
// 	// 	if (token) {
// 	// 		const decodedToken = JSON.parse(atob(token.split(".")[1]));
// 	// 		setUserInfo(decodedToken);
// 	// 		decodedToken.role !== "Admin" ? redirect("/login") : null;
// 	// 	} else {
// 	// 		redirect("/");
// 	// 	}
// 	// }, []);
// 	// Component
// 	return (
// 		// Main div
// 		<div className="size-full h-dvh bg-gray-300 dark:bg-gray-900">
// 			<div className="fixed -translate-x-96">
// 				{/* Session */}
// 				<ProtectedPage />
// 			</div>
// 			{/* BookList */}
// 			<BookList
// 				colorTheme={colorTheme}
// 				toggleModal={toggleModal}
// 				bookInfoData={recieveBookInfo}
// 			/>
// 			{/* StaticModal */}
// 			<StaticModal
// 				refreshPage={refresh}
// 				showModal={showModal}
// 				toggleModal={toggleModal}
// 				bookInfo={
// 					bookInfo !== null
// 						? bookInfo
// 						: {
// 								id: 0,
// 								price: 0,
// 								title: "",
// 								author: "",
// 								published: "",
// 								publishers: "",
// 								invNr: 0,
// 								isbn: "",
// 								bookImg: "",
// 								bookState: "",
// 						  }
// 				}
// 				userInfo={
// 					userInfo !== null
// 						? userInfo
// 						: {
// 								iat: 0,
// 								role: "none",
// 								user: {
// 									admin: false,
// 									email: "none",
// 									firstName: "none",
// 									id: -20,
// 									lastName: "none",
// 									password: "none",
// 									phone: "none",
// 									qrCode: "none",
// 								},
// 						  }
// 				}
// 			/>
// 		</div>
// 	);
// };

// // Export your component
// export default Missing;
