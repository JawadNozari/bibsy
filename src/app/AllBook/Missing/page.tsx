import React,{useState, useEffect} from "react";
import BookList from "../component/BookList";
import ProtectedPage from "../../protectedPage/page";
import Navigation from "../../components/navigation";
import { redirect } from "next/navigation";
import StaticModal from "../component/StaticModal";



// Define your component
const Missing = () => {
	<ProtectedPage />;
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
export default Missing;
