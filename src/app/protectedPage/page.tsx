// ! AUTHORIZATION !

"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import jwt, { JwtPayload } from "jsonwebtoken";

const checkToken = () => {
	//* Grab jwt from local storage
	const token = localStorage.getItem("token");

	if (!token) {
		return { exists: false, token: null };
	}

	//* Decode token to be readable
	const decodedToken = JSON.parse(atob(token.split(".")[1]));

	return { exists: true, token: decodedToken };
};

const ProtectedPage = () => {
	const [loggedIn, setLoggedIn] = useState(false);

	const router = useRouter();

	const secretKey = String(process.env.NEXT_PUBLIC_SECRET_KEY);

	useEffect(() => {
		//* Check for token when the page is visited
		const { exists, token } = checkToken();

		setLoggedIn(exists);

		//* If no token found, redirect to login page
		if (!exists) {
			router.push("/login");
			//* If student, redirect to main page
		} else if (token.role === "Student") {
			router.push("/");
		}
	}, [router]);

	return (
		<div>
			{loggedIn ? (
				<div />
			) : (
				<div style={{ height: 1000, color: "white" }}>
					<h1>Checking if logged in. . .</h1>
				</div>
			)}
		</div>
	);
};

export default ProtectedPage;
