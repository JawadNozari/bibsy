"use client";
import { useRouter } from "next/navigation";

// import UserList from './userList/page';
import React from "react";
import Page from "./components/navigation";

//! This is a function that takes in a token and checks and returns if the user is an admin and what type of user they are
import { CheckIfLoggedIn } from "./components/loginChecks";

export default function Home() {
	const router = useRouter();

	//! THESE ARE THE STATES THAT WILL HOLD THE USER TYPE AND IF THEY ARE AN ADMIN
	const [isAdmin, setIsAdmin] = React.useState(false);
	const [userType, setUserType] = React.useState("");

	//! THIS USEEFFECT FUNCTION CHECKS IF THE USER IS LOGGED AND IF THEY ARE NOT, THEY WILL BE REDIRECTED TO THE LOGIN PAGE-
	React.useEffect(() => {
		const token = localStorage.getItem("token");
		if (!token) {
			router.push("/login");
		} else {
			const { areYouAdmin, whatUserAreYou } = CheckIfLoggedIn(token);
			setIsAdmin(areYouAdmin);
			setUserType(whatUserAreYou);
		}
	}, [router]);

	return (
		<div className="flex min-w-full h-screen w-screen justify-center items-center flex-col">
			<Page />
			{
				//! IF THE USER IS AN ADMIN, THEY WILL SEE "HELLO THERE ADMIN!" OTHERWISE THEY WILL SEE "HELLO THERE {USER TYPE}"
				<div className="font-bold text-2xl mb-10">Hello there {isAdmin ? "Admin!" : userType}</div>
			}
			<div role="alert" className="alert alert-info w-fit text-white">
				<span className="text-center" >
					This page is under construction and will be available soon.
				</span>
			</div>
			<progress className="progress w-1/2 mt-10" />
		</div>
	);
}
