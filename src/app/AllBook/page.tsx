import React from "react";
import BookList from "./components/BookList";
// Define your component
const Book = () => {
	return (
		<div
			className="size-full"
			style={{
				height: "100edvh",
			}}
		>
			<BookList colorTheme={"book"} />
		</div>
	);
};

// Export your component
export default Book;
