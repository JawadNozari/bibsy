"use client";

import React, { useState } from "react";
import axios from "axios";
import { Book } from "@prisma/client";


export default function Page() {
	const [file, setFile] = useState<File | undefined>(undefined);
	const [id, setId] = useState<number>(0);
	const [title, setTitle] = useState<string>("");
	const [author, setAuthor] = useState<string>("");
	const [publishers, setPublishers] = useState<string>("");
	const [published, setPublished] = useState<Date>(new Date());
	const [isbn, setIsbn] = useState<string>("");
	const [price, setPrice] = useState<number>(0);
	const [invNr, setInv] = useState<number>(0);
	const [message, setMessage] = useState<string | undefined>("");
	const [gotError, setGotError] = useState<boolean>(false);

	const handleSubmit = async (e: React.SyntheticEvent) => {
		e.preventDefault();
		const formData = new FormData();
		let imagePath = "";
		if (file !== undefined) {
			formData.append("file", file || undefined);
			formData.append("path", "bookImage");
			imagePath = await axios
				.post("/api/uploader", formData, {
					headers: { "Content-Type": "multipart/form-data" },
				})
				.then((res) => {
					return res.data.path;
				})
				.catch((error: Error) => {
					console.debug(error);
				});
		}
			const userData: Book = {
				bookImg: imagePath,
				title: title,
				author: author,
				publishers: publishers,
				published: published,
				isbn: isbn,
				invNr: invNr,
				price: price,
				available: true,
				id: id,
				regDate: new Date(),
			};
	
			// Post form data to backend
			await axios
				.post("/api/editBooks", userData, {
					headers: { "Content-Type": "application/json" },
				})
				.then((res) => {
					setGotError(false);
					setMessage(res.data.Message);
				})
				.catch((err) => {
					setGotError(true);
					setMessage(err.message);
				});
	};

	return gotError ? (
		// Show error message
		<div>
			{message}
		</div>
	) : (
		<form onSubmit={handleSubmit} method="POST">
			<div>
			<input
				type="file"
				id="customFile"
				onChange={(e) => {
					setFile(e.target.files?.[0]);
				}}
				/>
			</div>
			<div>
			<input
				type="number"
				value={id}
				onChange={(e) => {
					setId(e.target.valueAsNumber);
				}}
				name="id"
			/>
			<label htmlFor="id">Id</label>
			</div>
			<input
				type="text"
				value={title}
				onChange={(e) => {
					setTitle(e.target.value);
				}}				
				placeholder="title"
				id="username"
				name="title"
			/>
			<input
				type="text"
				value={author}
				onChange={(e) => {
					setAuthor(e.target.value);
				}}						
				placeholder="author"
				id="author"
				name="author"
			/>
			<div>
			<input
				type="text"
				value={isbn}
				onChange={(e) => {
					setIsbn(e.target.value);
				}}
				placeholder="isbn"
				id="isbn"
				name="isbn"
			/>
			<label htmlFor="isbn">Isbn</label>
			</div>
			<div>
				<input
					type="text"
					value={publishers}
					onChange={(e) => {
						setPublishers(e.target.value);
					}}							
					placeholder="publisher"
					name="publisher"
					id="publisher"
				/>
			</div>
			<div>

			<input
				type="number"
				value={price}
				onChange={(e) => {
					setPrice(e.target.valueAsNumber);
				}}
				name="Price"
			/>
			<label htmlFor="Price">Price</label>
			</div>
			<div>
			<input
				type="number"
				value={invNr}
				onChange={(e) => {
					setInv(e.target.valueAsNumber);
				}}
				name="invNr"
			/>
			<label htmlFor="invNr">invNr</label>
			</div>
			<div>
			<input
				type="date"
				value={published.toString()}
				onChange={(e) => setPublished(e.target.value as unknown as Date)}
				name="published"
			/>
			<label htmlFor="published">published</label>
			</div>
			<button type="submit">edit</button>
		</form>
	);
}
