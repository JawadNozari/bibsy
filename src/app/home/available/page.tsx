"use client"
import React from "react"
import { useRouter } from "next/navigation"
import axios from "axios"

// Add import statement for BookType

const Page = () => {
	const router = useRouter()
	const [availableBooks, setAvailableBooks] = React.useState([])

	React.useEffect(() => {
		const getBooks = async () => {
			const response = await axios.get("/api/availableBooks")
			setAvailableBooks(response.data.books)
		}
		getBooks()
	}, [])

	return (
		<div>
			<h1>Available to borrow Books</h1>
			<table
				className="table-auto"
				style={{ width: 1000, textAlign: "center" }}
			>
				<thead>
					<tr>
						<th>Book Title</th>
						<th>Author</th>
						<th>Published</th>
						<th>Registered At</th>
					</tr>
				</thead>
				<tbody>
					{availableBooks.map((book:any) => (
						<tr key={book.invNr}>
							<td>{`${book.title}`}</td>
							<td>{`${book.author}`}</td>
							<td>{`${book.published.split("T")[0]}`}</td>
							<td>{`${`${book.regDate.split("T")[0]} ${
								book.regDate.split("T")[1].split(".")[0]
							}`}`}</td>
							{/* regDate currently does not exist, idk if added later but keep here for now */}
						</tr>
					))}
				</tbody>
			</table>
			<div
				style={{ width: 1000, display: "flex", justifyContent: "space-around" }}
			>
				<button
					type="button"
					onClick={() => router.push("/home/allbooks")}
					style={{ backgroundColor: "lightblue", color: "black" }}
				>
					All Books
				</button>
				<button
					type="button"
					onClick={() => router.push("/home/available")}
					style={{ backgroundColor: "lightblue", color: "black" }}
				>
					Available Books
				</button>
				<button
					type="button"
					onClick={() => router.push("/home/borrowed")}
					style={{ backgroundColor: "lightblue", color: "black" }}
				>
					Borrowed Books
				</button>

				<button
					type="button"
					onClick={() => router.push("/home/missing")}
					style={{ backgroundColor: "lightblue", color: "black" }}
				>
					Missing Books
				</button>
			</div>
		</div>
	)
}

export default Page
