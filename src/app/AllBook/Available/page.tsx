import React from "react";
import BookList from "../Component/BookList";

// Define your component
const Available = () => {
	const colorTheme = {
		theme: "available",
		fetchLink: "availableBooks",
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
export default Available;
