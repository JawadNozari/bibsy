"use client";
import { useState } from "react";
import axios from "axios";
import bcrypt from "bcryptjs";
import ProtectedPage from "../protectedPage/page";

export default function Page() {
	const [password, setPassword] = useState("");
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [phone, setPhone] = useState("");
	const [email, setEmail] = useState("");
	const [file, setFile] = useState<File | undefined>(undefined);
	const [classroom, setClassroom] = useState("");

	const handleSubmit = async (e: React.SyntheticEvent) => {
		e.preventDefault();
		const hashedPassword = bcrypt.hashSync(password, 10);

		const formData = new FormData();
		let imagePath = "";
		if (file !== undefined) {
			formData.append("file", file || undefined);
			formData.append("path", "StudentPFP");
			imagePath = await axios
				.post("/api/uploader", formData, {
					headers: { "Content-Type": "multipart/form-data" },
				})
				.then((res) => {
					return res.data.path;
				})
				.catch((error: Error) => {
					console.debug(error);
					console.log("there is issue when getting path from uploader ");
				});
		};

		axios.post("/api/adminCenter", {
			password: hashedPassword,
			firstName: firstName,
			lastName: lastName,
			email: email,
			phone: phone,
			image: imagePath,
			classroom: classroom,
			qrCode: firstName + lastName + classroom,
		});


	};

	return (
		<form onSubmit={handleSubmit}>
			<ProtectedPage />
			<input
				type="text"
				value={firstName}
				onChange={(e) => setFirstName(e.target.value)}
				placeholder="firstName"
				id="firstName"
				name="firstName"
			/>
			<input
				type="text"
				value={lastName}
				onChange={(e) => setLastName(e.target.value)}
				placeholder="LastName"
				id="LastName"
				name="LastName"
			/>
			<input
				type="password"
				value={password}
				onChange={(e) => setPassword(e.target.value)}
				placeholder="password"
				id="password"
				name="password"
			/>
			<div>
				<input
					type="number"
					value={phone}
					onChange={(e) => setPhone(e.target.value)}
					placeholder="phone"
					name="phone"
					id="phone"
				/>
				<input
					type="file"
					id="customFile"
					onChange={(e) => {
						setFile(e.target.files?.[0]);}}
				/>	
				<input
					type="text"
					value={classroom}
					onChange={(e) => setClassroom(e.target.value)}
					placeholder="Class"
					name="classroom"
					id="classroom"
				/>
				<input
					type="text"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					placeholder="email"
					name="email"
					id="email"
				/>
			</div>
			<button type="submit">Register</button>
		</form>
	);
};