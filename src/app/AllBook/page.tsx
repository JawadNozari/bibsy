import React from "react";
import BookList from "./Component/BookList";
// Define your component
const Book = () => {
	const colorTheme = {
		theme: "book",
		fetchLink: "registeredBooks",
	};
	return (
		<div
			className="size-full"
			style={{
				height: "100edvh",
			}}
		>
			<BookList colorTheme={colorTheme} />
		</div>
	);
};

// Export your component
export default Book;
