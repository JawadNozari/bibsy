import React, { useState, useEffect } from "react";
import BookList from "../component/BookList";
import { redirect } from "next/navigation";

// Define your component
const Missing = () => {
	const colorTheme = {
		theme: "missing",
		fetchLink: "registeredBooks",
		type: "missingBooks",
		lostFound: "Found",
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
export default Missing;
