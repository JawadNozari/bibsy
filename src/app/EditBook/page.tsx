"use client";
import { useState } from "react";
import axios from "axios";
//TODO: ERROR handling
export default function Page() {
	const [title, setUsername] = useState<string>("");
	const [author, setPassword] = useState<string>("");
	const [publisher, setRemember] = useState<string>("");
	const [isbn, setIsbn] = useState<number>(0);

	const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setUsername(e.target.value);
	};
	const handleAuthorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPassword(e.target.value);
	};
	const handleIsbnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setIsbn(e.target.valueAsNumber);
	};
	const handleRememberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setRemember(e.target.value);
	};

	const handleSubmit = (e: React.SyntheticEvent) => {
		e.preventDefault();
		return axios.post("/api/editBooks", {
			id: 1,
			title: title,
			author: author,
			publisher: publisher,
			isbn: isbn,
			invNr: 321,
			price: 12,
			image: "TestBild.png",
		});
	};

	return (
		<form onSubmit={handleSubmit}>
			<input
				type="text"
				value={title}
				onChange={handleUsernameChange}
				placeholder="title"
				id="username"
				name="title"
			/>
			<input
				type="text"
				value={author}
				onChange={handleAuthorChange}
				placeholder="author"
				id="author"
				name="author"
			/>
			<input
				type="number"
				value={isbn}
				onChange={handleIsbnChange}
				placeholder="isbn"
				id="isbn"
				name="isbn"
			/>
			<div>
				<input
					type="text"
					value={publisher}
					onChange={handleRememberChange}
					placeholder="publisher"
					name="publisher"
					id="publisher"
				/>
			</div>
			<button type="submit">edit</button>
		</form>
	);
}
