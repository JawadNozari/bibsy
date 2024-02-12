"use client";
import { useState } from "react";
import axios from "axios";
//TODO: ERROR handling



export default function Page() {
	const [file, setFile] = useState<File | undefined>(undefined);
	const [id, setId] = useState<number>(0);
	const [title, setTitle] = useState<string>("");
	const [author, setAuthor] = useState<string>("");
	const [publishers, setPublishers] = useState<string>("");
	const [published, setPublished] = useState<Date>(new Date());
	const [isbn, setIsbn] = useState<number>(0);
	const [price, setPrice] = useState<number>(0);
	const [invNr, setInv] = useState<number>(0);
	const [message, setMessage] = useState<string | undefined>("");
	const [gotError, setgotError] = useState<boolean>(false);

	const handleSubmit = async (e: React.SyntheticEvent) => {
		e.preventDefault();
		const formData = new FormData();
		if (file) {
			formData.append("file", file);
		}
		formData.append("id", String(id));
		formData.append("title", title);
		formData.append("author", author);
		formData.append("publishers", publishers);
		formData.append("published", published as unknown as string);
		formData.append("isbn", String(isbn));
		formData.append("invNr", String(invNr));
		formData.append("price", String(price));


		return await axios
			.post("/api/editBooks", formData, {
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
		<div>
			{message}
		</div>
	) : (
		<form onSubmit={handleSubmit}>
			<div>
			<input
				type="file"
				id="customFile"
				onChange={(e) => {
					setFile(e.target.files?.[0]);
				}}
				required
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
				type="number"
				value={isbn}
				onChange={(e) => {
					setIsbn(e.target.valueAsNumber);
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
