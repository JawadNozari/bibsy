import React from "react";
import BookList from "../Component/BookList";

// Define your component
const Available = () => {
	return (
		<div
			className="size-full bg-white"
			style={{
				height: "100edvh",
			}}
		>
			<BookList colorTheme={"available"} />
		</div>
	);
};

// Export your component
export default Available;
