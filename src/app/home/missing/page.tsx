"use client";
import React from "react";
import { Staff, Student } from "@prisma/client";
import { useRouter } from "next/navigation";
import axios from "axios";

const Page = () => {
	const router = useRouter();
	interface Book {
		bookId: number;
		note: string;
		staffId: number;
		studentId: number;
		id: number;
		title: string;
		author: string;
		regDate: string;
	}

	const [books, setBooks] = React.useState<Book[]>([]);
	const [missingBooks, setMissingBooks] = React.useState<Book[]>([]);
	const [students, setStudents] = React.useState<Student[]>([]);
	const [staff, setStaff] = React.useState<Staff[]>([]);

	React.useEffect(() => {
		const getBooks = async () => {
			const response = await axios("/api/registeredBooks");
			if (response.data.books !== null) {
				setBooks(response.data.books);

				const missing = await axios("/api/missingBooks");
				setMissingBooks(missing.data.books);
			} else {
				console.log(response);
			}

			const response2 = await axios("/api/getUsers");

			setStudents(response2.data.studentUsers);
			setStaff(response2.data.staffUsers);
		};
		getBooks();
	}, []);

	const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		let userId = (event.currentTarget[0] as HTMLInputElement)
			.value as unknown as number;
		userId = parseInt(userId.toString()); // Convert to string, then to number (has to be done in two steps because of TypeScript)
		const response = await axios.post("/api/missingBooks", {
			userId,
			userType: "staff",
		});
		setMissingBooks(response.data.books);
	};

	const handleSearch = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const bookTitle = (event.currentTarget[0] as HTMLInputElement).value;
		const response = await axios.post("/api/searchForBooks", {
			bookTitle,
			listType: "missing",
		});
		setBooks(response.data.books);
	};

	const setBookAvailable = async (event: React.MouseEvent<HTMLElement>, bookId: number) => {
		event.stopPropagation();
		missingBooks.map((missingBook: Book) => {
			if (missingBook.bookId === bookId) {
				missingBooks.splice(missingBooks.indexOf(missingBook), 1);
			}
		});
		setMissingBooks(missingBooks);

		const response = await axios.post("/api/setBookAvailable", {
			bookId,
			listType: "missing",
		});
		console.log(response.data);
	};

	return (
		<div className="flex min-h-screen flex-col items-center justify-between p-24 bg-neutral-50">
			<div className=" overflow-x-auto shadow-md sm:rounded-lg overflow-scroll w-4/5 h-[38rem] dark:bg-gray-600">
				<h1 className="text-4xl text-center font-bold dark:bg-gray-700 dark:text-gray-100 p-10">
					Missing Books
				</h1>
				<form onSubmit={onSubmit}>
					<input
						type="text"
						name="userId"
						style={{ color: "white" }}
						placeholder="User ID"
					/>
					<button type="submit">Submit</button>
				</form>
				<form method="POST" onSubmit={handleSearch}>
					<input
						type="text"
						name="bookTitle"
						id="bookTitle"
						placeholder="Book Title"
						style={{ color: "white" }}
					/>
					<button type="submit">Submit</button>
				</form>
				<table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
					<thead className="text-xl sticky top-0 text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
						<tr>
							<th scope="col" className="px-6 py-3">
								Title
							</th>
							<th scope="col" className="px-6 py-3">
								Author
							</th>
							<th scope="col" className="px-6 py-3">
								Notes
							</th>
							<th scope="col" className="px-6 py-3">
								Registered
							</th>
							<th scope="col" className="px-6 py-3">
								Staff ID
							</th>
							<th scope="col" className="px-6 py-3">
								Student ID
							</th>
							<th scope="col" className="px-6 py-3" />
						</tr>
					</thead>
					<tbody>
						{books.map((book: Book) => {
							return missingBooks.map((missingBook: Book) => {
								if (missingBook.bookId === book.id) {
									return (
										<tr
											className="bg-white border-b dark:bg-gray-600 dark:border-gray-500 hover:bg-gray-50 dark:hover:bg-gray-500 cursor-pointer active:bg-gray-200 dark:active:bg-gray-700"
											key={book.id}
											onClick={() =>
												router.push(`/home/bookDetails/${book.id}`)
											}
											onKeyUp={() => { }}
											onKeyDown={() => { }}
										>
											<th
												scope="row"
												className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
											>{`${book.title}`}</th>
											<td className="px-6 py-4">{`${book.author}`}</td>
											<td className="px-6 py-4">{`${missingBook.note}`}</td>
											<td className="px-6 py-4">{`${`${book.regDate.split("T")[0]
												} ${book.regDate.split("T")[1].split(".")[0]}`}`}</td>
											<td className="px-6 py-4">{
												staff.map((staffMember) => {
													if (staffMember.id === missingBook.staffId) {
														return `${staffMember.firstName} ${staffMember.lastName} | ID: ${staffMember.id}`;
													}
												})
											}</td>
											<td className="px-6 py-4">{
												students.map((student) => {
													if (student.id === missingBook.studentId) {
														return `${student.firstName} ${student.lastName} | ID: ${student.id}`;
													}
												})
											}</td><td className="px-6 py-4">
												<button
													type="button"
													onClick={(e) => setBookAvailable(e, missingBook.bookId)}
													className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
												>
													RETURNED
												</button>
											</td>
										</tr>
									);
								}
								return null;
							});
						})}
					</tbody>
				</table>
			</div>
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
				<button
					type="button"
					onClick={() => router.push("/home/history")}
					style={{ backgroundColor: "lightblue", color: "black" }}
				>
					History
				</button>
			</div>
		</div>
	);
};

export default Page;