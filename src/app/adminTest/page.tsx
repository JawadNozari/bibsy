"use client";
import { useState } from "react";
import axios from "axios";

export default function Page() {
	const [password, setPassword] = useState<string>("");
	const [firstName, setFirstName] = useState<string>("");
	const [lastName, setLastName] = useState<string>("");
	const [phone, setPhone] = useState<string>("");
    const [image, setImage] = useState<string>("");
    const [studentClass, setClass] = useState<string>("");
    const [qrCode, setQrCode] = useState<string>("");

    

	const handleFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFirstName(e.target.value);
	};
	const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPassword(e.target.value);
	};
	const handleLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setLastName(e.target.value);
	};
	const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPhone(e.target.value);
	};
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setImage(e.target.value);
	};
    const handleClassChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setClass(e.target.value);
	};
    const handleQrCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setQrCode(e.target.value);
	};


    const handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault();
        return axios.post("/api/adminCenter", {
            id: 8,
            password: "123",
            firstName: "John",
            lastName: "Doe",
            email: "john.doe@gmail.com",
            phone: "1234567890",
            image: "TestBild.png",
            class: "3A",
            qrCode: "1234567890",
          
        });
    };
  
	return (
        <form onSubmit={handleSubmit} >
            <input
                type="text"
                value={firstName}
                onChange={handleFirstNameChange}
                placeholder="firstName"
                id="firstName"
                name="firstName"
            />
            <input
                type="text"
                value={lastName}
                onChange={handleLastNameChange}
                placeholder="LastName"
                id="LastName"
                name="LastName"
            />
            <input
                type="text"
                value={password}
                onChange={handlePasswordChange}
                placeholder="password"
                id="password"
                name="password"
            />
            <div >
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
                    value={image}
                    onChange={handleImageChange}
                    placeholder="image"
                    name="image"
                    id="image"
                />
                <input
                    type="text"
                    value={studentClass}
                    onChange={handleClassChange}
                    placeholder="studentClass"
                    name="studentClass"
                    id="studentClass"
                />
                <input
                    type="number"
                    value={qrCode}
                    onChange={handleQrCodeChange}
                    placeholder="qrCode"
                    name="qrCode"
                    id="qrCode"
                />
            </div>
            <button
                type="submit">
                    edit
            </button>
        </form>
	);
}
