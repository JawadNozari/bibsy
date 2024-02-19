//! FIX UNUSED VARS
/* eslint-disable no-unused-vars */
"use client";
import { useState } from "react";
import axios from "axios";
import bcrypt from "bcryptjs";

export default function Page() {
	const [password, setPassword] = useState("");
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [phone, setPhone] = useState("");
	const [email] = useState("@ntig.se");
	const [file, setFile] = useState<File | undefined>(undefined);
	const [admin, setAdmin] = useState(false);
	const [role] = useState("Staff");

	const handleSubmit = async (e: React.SyntheticEvent) => {
		e.preventDefault();
		const hashedPassword = bcrypt.hashSync(password, 10);

		const formData = new FormData();
		let imagePath = "";
		if (file !== undefined) {
			formData.append("file", file);
			formData.append("path", "StaffPFP");
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
		}

		axios.post("/api/adminStaffReg", {
			password: hashedPassword,
			firstName: firstName,
			lastName: lastName,
			email: `${firstName}.${lastName}${email}`,
			phone: phone,
			image: imagePath.slice(7),
			admin: Boolean(admin),
			qrCode: firstName + lastName + role,
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
				type="password"
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
					type="file"
					id="customFile"
					onChange={(e) => {
						setFile(e.target.files?.[0]);
					}}
				/>
				<input
					type="checkbox"
					checked={admin}
					onChange={(e) => setAdmin(e.target.checked)}
					placeholder="admin"
					name="admin"
					id="admin"
				/>
			</div>
			<button type="submit">Register</button>
		</form>
	);
}
