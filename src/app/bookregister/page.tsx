"use client";
import React, { useState } from "react";
import axios from "axios";

export default function Home() {
	const [file, setFile] = useState<File | undefined>(undefined);
	const [title, setTitle] = useState<string>("");
	const [author, setAuthor] = useState<string>("");
	const [publishers, setPublishers] = useState<string>("");
	const [published, setPublished] = useState<Date>(new Date());
	const [isbn, setIsbn] = useState<number>(0);
	const [price, setPrice] = useState<number>(0);
	const [invNr, setInvNr] = useState<number>(0);
	const [message, setMessage] = useState<string | undefined>("");
	const [gotError, setgotError] = useState<boolean>(false);

	const submit = async () => {
		const formData = new FormData();
		if (file) {
			formData.append("file", file);
		}
		// Additional form fields
		formData.append("title", title);
		formData.append("author", author);
		formData.append("publishers", publishers);
		formData.append("published", published as unknown as string);
		formData.append("isbn", String(isbn));
		formData.append("invNr", String(invNr));
		formData.append("price", String(price));

		await axios
			.post("/api/bookReg", formData, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			})
			.then((res) => {
				setgotError(false);
				setMessage(res.data.Message);
			})
			.catch((err) => {
				setgotError(true);
				setMessage(err.message);
				console.log(err);
			});
	};

	return gotError ? (
		// Show error message
		<div className="flex justify-center items-center h-screen w-screen">
			{message}
		</div>
	) : (
		<form className="flex flex-col h-screen w-screen justify-center items-center">
			<div>
				<input
					type="file"
					id="customFile"
					onChange={(e) => {
						setFile(e.target.files?.[0]);
					}}
				/>
			</div>

			<label>title</label>
			<input
				maxLength={100}
				type="text"
				placeholder="Title"
				value={title}
				onChange={(e) => setTitle(e.target.value)}
				name="title"
			/>

			<label>author</label>
			<input
				type="text"
				placeholder="Author"
				value={author}
				onChange={(e) => setAuthor(e.target.value)}
				name="author"
			/>
			<label>published</label>
			<input
				type="date"
				value={published.toString()}
				onChange={(e) => setPublished(e.target.value as unknown as Date)}
				name="publisher"
			/>
			<label>publisher</label>
			<input
				type="text"
				placeholder="Publisher"
				value={publishers}
				onChange={(e) => setPublishers(e.target.value)}
				name="publisher"
			/>

			<label>number</label>
			<input
				type="number"
				placeholder="ISBN"
				value={isbn}
				onChange={(e) => setIsbn(e.target.valueAsNumber)}
				name="isbn"
			/>

			<label>price</label>
			<input
				type="number"
				placeholder="Price"
				value={price}
				onChange={(e) => setPrice(e.target.valueAsNumber)}
				name="price"
			/>

			<label>invNr</label>
			<input
				type="number"
				placeholder="invNr"
				value={invNr}
				onChange={(e) => setInvNr(e.target.valueAsNumber)}
				name="invNr"
			/>

			<input
				className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
				type="button"
				onClick={(e) => {
					e.preventDefault();
					submit();
				}}
				value="Upload"
			/>
			<div>{message}</div>
		</form>
	);
}
