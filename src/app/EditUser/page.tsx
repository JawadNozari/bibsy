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
        return axios.post("/api/editUsers", {
          id: 1,
          userType: userType,
          first: first,
          last: last,
          password: password,
          email: email,
          phone: phone,
          qrCode: qrCode,
          studentclass: studentclass,
          Admin: Admin
        });
    };
  
	return (
        <form onSubmit={handleSubmit} >
            <input
                type="text"
                value={first}
                onChange={handleFirstChange}
                placeholder="first name"
                id="first"
                name="first"
            />
            <input
                type="text"
                value={last}
                onChange={handleLastChange}
                placeholder="last name"
                id="last"
                name="last"
            />
            <input
                type="number"
                value={password}
                onChange={handlePasswordChange}
                placeholder="password"
                id="password"
                name="password"
            />
            <input
                type="email"
                value={email}
                onChange={handleEmailChange}
                placeholder="email"
                name="email"
                id="email"
            />
            <input
                type="number"
                value={phone}
                onChange={handlePhoneChange}
                placeholder="phone"
                name="phone"
                id="phone"
            />
            <input
                type="text"
                value={qrCode}
                onChange={handleQrcodeChange}
                placeholder="qrCode"
                name="qrCode"
                id="qrCode"
            />
            <input
                type="text"
                value={studentclass}
                onChange={handleClassChange}
                placeholder="class"
                name="studentclass"
                id="studentclass"
            />
            <input
                type="radio"
                value="staff"
                onChange={handleTypeChange}
                placeholder="staff"
                name="type"
                id="staff"
            />
            <label htmlFor="staff">Staff</label>
            <input
                type="radio"
                value="student"
                onChange={handleTypeChange}
                placeholder="Student"
                name="type"
                id="Student"
            />
            <label htmlFor="Student">Student</label>
            <input
                type="checkbox"
                value={"true"}
                onChange={handleAdminChange}
                placeholder="Admin"
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
