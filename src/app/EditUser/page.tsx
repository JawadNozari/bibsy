"use client";
import { useState } from "react";
import axios from "axios";


export default function Page() {
	const [file, setFile] = useState<File | undefined>(undefined);
	const [id, setId] = useState<number>(0);
	const [userType, setType] = useState<string>("");
	const [Admin, setAdmin] = useState<string>("");
	const [first, setFirst] = useState<string>("");
	const [last, setLast] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [email, setEmail] = useState<string>("");
	const [phone, setPhone] = useState<string>("");
	const [studentclass, setClass] = useState<string>("");
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
					console.log("there is issue when getting path from uploader ");
				});
		}
			const userData = {
                userType: userType,
				id: id,
                password: password,  
                firstName: first,  
                lastName: last,    
                email: email,          
                phone: phone,          
                image: imagePath,
                admin: Admin,
                studentclass: studentclass,
			};
	
			// Post form data to backend
			await axios
				.post("/api/editUsers", userData, {
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
		<div>{message}</div>
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
				<input
					type="number"
					id="customId"
					placeholder="id"
					onChange={(e) => {
						setId(e.target.valueAsNumber);
					}}
				/>
			</div>
			<input
				type="text"
				value={first}
				onChange={(e) => {
					setFirst(e.target.value);
				}}
				placeholder="first name"
				id="first"
				name="first"
			/>
			<input
				type="text"
				value={last}
				onChange={(e) => {
					setLast(e.target.value);
				}}
				placeholder="last name"
				id="last"
				name="last"
			/>
			<input
				type="number"
				value={password}
				onChange={(e) => {
					setPassword(e.target.value);
				}}
				placeholder="password"
				id="password"
				name="password"
			/>
			<input
				type="email"
				value={email}
				onChange={(e) => {
					setEmail(e.target.value);
				}}
				placeholder="email"
				name="email"
				id="email"
			/>
			<input
				type="number"
				value={phone}
				onChange={(e) => {
					setPhone(e.target.value);
				}}
				placeholder="phone"
				name="phone"
				id="phone"
			/>
			<input
				type="text"
				value={studentclass}
				onChange={(e) => {
					setClass(e.target.value);
				}}
				placeholder="class"
				name="studentclass"
				id="studentclass"
			/>
			<input
				type="radio"
				value="staff"
				onChange={(e) => {
					setType(e.target.value);
				}}
				placeholder="staff"
				name="type"
				id="staff"
			/>
			<label htmlFor="staff">Staff</label>
			<input
				type="radio"
				value="student"
				onChange={(e) => {
					setType(e.target.value);
				}}
				placeholder="Student"
				name="type"
				id="Student"
			/>
			<label htmlFor="Student">Student</label>
			<input
				type="checkbox"
				value={"true"}
				onChange={(e) => {
					setAdmin(e.target.value);
				}}
				placeholder="Admin"
				name="Admin"
				id="Admin"
			/>
			<label htmlFor="Admin">Admin</label>
			<br />
			<button type="submit">edit</button>
		</form>
	);
}
