// ! AUTHORIZATION !

"use client";
import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import crypto from "crypto"; // * Required for decryption

const checkToken = () => {
	//* Grab jwt from local storage
	const token = localStorage.getItem("token");

	if (!token) {
		return { exists: false, token: null, codedToken: null };
	}

	//* Decode token to be readable
	const decodedToken = JSON.parse(atob(token.split(".")[1]));

	const codedToken = token;

	return { exists: true, token: decodedToken, codedToken: codedToken };
};

const ProtectedPage = () => {
	const [loggedIn, setLoggedIn] = useState(false);

	const router = useRouter();

	const pathname = usePathname();

  const secretKey = String(process.env.NEXT_PUBLIC_SECRET_KEY); // ! don't share !

	useEffect(() => {
		//* Check for token when the page is visited
		const { exists, token, codedToken } = checkToken();

		setLoggedIn(exists);

		// ! MANUAL JWT VERIFICATION !

		/* This is done because the jwt.verify() function 
    didn't work for some reason, so I used this method
    I found online (: DON'T TOUCH */

		if (codedToken !== null) {
			// * Split the token into its parts: header, payload, signature
			const [encodedHeader, encodedPayload, signature] = codedToken.split(".");

			// * Create a string to verify: header + '.' + payload
			const stringToVerify = `${encodedHeader}.${encodedPayload}`;

			// * Decode the signature from base64
			const decodedSignature = Buffer.from(signature, "base64");

			// * Verify the signature
			const algo = "HS256"; // * Algorithm used for signing the token
			const hash = crypto
				.createHmac(algo.replace("HS", "sha"), secretKey)
				.update(stringToVerify)
				.digest("base64");

			//* If no token found, redirect to login page
			if (!exists) {
				router.push("/login");

				//* Authorization for user roles begin here
			} else if (token.role === "Student" && pathname !== "/") {
				// Only allow access to main page if student
				router.push("/");
			} else if (
				token.role === "Staff" &&
				token.user.admin === false &&
				pathname === "/adminTest"
			) {
				// Go back if not admin
				router.back();
			} else if (hash !== decodedSignature.toString("base64")) {
				// Not valid token
				router.push("/login");
			}
		}
	}, [router, pathname, secretKey]);

	return (
		<div>
			{loggedIn ? (
				<div>Logged In</div>
			) : (
				<div style={{ height: 1000, color: "white" }}>
					<h1>Checking if logged in. . .</h1>
				</div>
			)}
		</div>
	);
};

export default ProtectedPage;