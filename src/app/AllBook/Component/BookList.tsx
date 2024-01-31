"use client"
import { error } from "console"
import React, { useState, useEffect } from "react"

interface Book {
	id: number
	price: number
	category: string
	rating: number
	title: string
	products: object
}
export default function BookList() {
	const [books, setBooks] = useState<Array<Book>>([])

	useEffect(() => {
		fetch("https://dummyjson.com/products")
			.then((res) => res.json())
			.then((data) => setBooks(data.products))
			.catch((error) => console.log(error))
	}, [])
	console.log(books)

	return (
		// TableTemplate edited
		<div className="size-9/12 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-1/2-dvh overflow-y-auto">
			<div className="relative overflow-x-auto shadow-md sm:rounded-lg">
				<table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
					<thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
						<tr>
							<th scope="col" className="px-6 py-3">
								Product name
							</th>
							<th scope="col" className="px-6 py-3">
								Rating
							</th>
							<th scope="col" className="px-6 py-3">
								Category
							</th>
							<th scope="col" className="px-6 py-3">
								Price
							</th>
							<th scope="col" className="px-6 py-3">
								Action
							</th>
						</tr>
					</thead>
					<tbody>
						{books.map((book, index) => (
							<tr
								key={book.id}
								className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
							>
								<th
									scope="row"
									className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
								>
									{books.length > 0 ? books[index]?.title : "loading..."}
								</th>
								<td className="px-6 py-4">
									{books.length > 0 ? books[index]?.rating : "loading..."}
								</td>
								<td className="px-6 py-4">
									{books.length > 0 ? books[index]?.category : "loading..."}
								</td>
								<td className="px-6 py-4">
									${books.length > 0 ? books[index]?.price : "loading..."}
								</td>
								<td className="px-6 py-4">
									<a
										href="#hi"
										className="font-medium text-red-600 hover:underline"
									>
										Lost
									</a>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	)
}
