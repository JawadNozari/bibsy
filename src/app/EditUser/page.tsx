"use client";
import { useState } from "react";
import axios from "axios";

export default function Page() {
    const [file, setFile] = useState<File | undefined>(undefined);
	const [id, setId] = useState<string>("");
	const [userType, setType] = useState<string>("");
	const [Admin, setAdmin] = useState<string>("");
	const [first, setFirst] = useState<string>("");
	const [last, setLast] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [email, setEmail] = useState<string>("");
	const [phone, setPhone] = useState<string>("");
	const [studentclass, setClass] = useState<string>("");
    const [message, setMessage] = useState<string | undefined>("");
	const [gotError, setgotError] = useState<boolean>(false);



    const handleSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        const formData = new FormData();
		if (file) {
			formData.append("file", file);
		}
        formData.append("id", id);
        formData.append("userType", userType);
		formData.append("first", first);
		formData.append("last", last);
		formData.append("password", password);
		formData.append("email", email);
		formData.append("phone", phone);
		formData.append("studentclass", studentclass);
		formData.append("Admin", Admin);
        
        await axios
			.post("/api/editUsers", formData, {
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
	) :  (
        <form onSubmit={handleSubmit} >
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
						setId(e.target.value);
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
                }}                placeholder="password"
                id="password"
                name="password"
            />
            <input
                type="email"
                value={email}
                onChange={(e) => {
                    setEmail(e.target.value);
                }}                placeholder="email"
                name="email"
                id="email"
            />
            <input
                type="number"
                value={phone}
                onChange={(e) => {
                    setPhone(e.target.value);
                }}                placeholder="phone"
                name="phone"
                id="phone"
            />
            <input
                type="text"
                value={studentclass}
                onChange={(e) => {
                    setClass(e.target.value);
                }}                placeholder="class"
                name="studentclass"
                id="studentclass"
            />
            <input
                type="radio"
                value="staff"
                onChange={(e) => {
                    setType(e.target.value);
                }}                placeholder="staff"
                name="type"
                id="staff"
            />
            <label htmlFor="staff">Staff</label>
            <input
                type="radio"
                value="student"
                onChange={(e) => {
                    setType(e.target.value);
                }}                placeholder="Student"
                name="type"
                id="Student"
            />
            <label htmlFor="Student">Student</label>
            <input
                type="checkbox"
                value={"true"}
                onChange={(e) => {
                    setAdmin(e.target.value);
                }}                placeholder="Admin"
                name="Admin"
                id="Admin"
            />
            <label htmlFor="Admin">Admin</label>
            <br />
            <button
                type="submit">
                    edit
            </button>
        </form>
	);
}