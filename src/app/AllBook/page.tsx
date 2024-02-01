import React from "react"
import BookList from "./component/BookList"
// Define your component
const Book = () => {
	return (
		<div
			className="size-full"
			style={{
				height: "100edvh",
			}}
		>
			<BookList />
		</div>
	)
}

// Export your component
export default Book
