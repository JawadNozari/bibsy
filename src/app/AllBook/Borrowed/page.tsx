import React from "react";
import BookList from "../component/BookList";

// Define your component
const Borrowed = () => {
	const colorTheme = {
		theme: "borrowed",
		fetchLink: "registeredBooks",
		type: "borrowedBooks",
		lostFound: "Lost Return",
	};
	return (
		<div
			className="size-full bg-white"
			style={{
				height: "100edvh",
			}}
		>
			<BookList colorTheme={colorTheme} />
		</div>
	);
};

// Export your component
export default Borrowed;
