import React from "react";
import BookList from "../components/BookList";

// Define your component
const Missing = () => {
	return (
		<div
			className="size-full bg-white"
			style={{
				height: "100edvh",
			}}
		>
			<BookList colorTheme={"missing"} />
		</div>
	);
};

// Export your component
export default Missing;
