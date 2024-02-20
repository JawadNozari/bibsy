"use client";

//! THESE ARE IMPORTS NEEDED FOR CHECKING IF THE USER IS LOGGED IN AND WHAT TYPE OF USER THEY ARE
import { useRouter } from "next/navigation";
import { isAdmin, userType } from "./loginChecks/page";

// import UserList from './userList/page';
import React from "react";

export default function Home() {
	//! THIS USEEFFECT FUNCTION CHECKS IF THE USER IS LOGGED AND IF THEY ARE NOT, THEY WILL BE REDIRECTED TO THE LOGIN PAGE-
	const router = useRouter();
	React.useEffect(() => {
		if (!isAdmin && userType === "") {
			router.push("/login");
		}
	}, [router]);

	//! EXAMPLE OF A STYLE BASED ON USER TYPE
	//! style={{ display: `${userType === "Staff" ? "none" : "block"}` }}
	//! IF THE USER IS A STAFF MEMBER, THE STYLE WILL BE SET TO "NONE" AND THE ELEMENT WILL NOT BE DISPLAYED

	return (
		<div className="flex min-w-full h-screen w-screen justify-center items-center flex-col">
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
