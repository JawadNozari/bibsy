"use client";
import { useState } from "react";
import axios from "axios";

export default function Page() {
	const [password, setPassword] = useState("");
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [phone, setPhone] = useState("");
	const [email, setEmail] = useState("");
	const [image, setImage] = useState("");
	const [classroom, setClassroom] = useState("");
	const [qrCode, setQrCode] = useState("");

	const handleSubmit = (e: React.SyntheticEvent) => {
		e.preventDefault();
		axios.post("/api/adminCenter", {
			password: password,
			firstName: firstName,
			lastName: lastName,
			email: email,
			phone: phone,
			image: image,
			classroom: classroom,
			qrCode: qrCode,
		});
	};
	return (
		<form onSubmit={handleSubmit}>
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
				type="text"
				value={password}
				onChange={(e) => setPassword(e.target.value)}
				placeholder="password"
				id="password"
				name="password"
			/>
			<div>
				<input
					type="string"
					value={phone}
					onChange={(e) => setPhone(e.target.value)}
					placeholder="phone"
					name="phone"
					id="phone"
				/>
				<input
					type="text"
					value={image}
					onChange={(e) => setImage(e.target.value)}
					placeholder="image"
					name="image"
					id="image"
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
					type="string"
					value={qrCode}
					onChange={(e) => setQrCode(e.target.value)}
					placeholder="qrCode"
					name="qrCode"
					id="qrCode"
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
}
