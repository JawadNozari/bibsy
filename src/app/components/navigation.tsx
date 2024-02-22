"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { CheckIfLoggedIn } from "./loginChecks";

export default function Page() {
	const router = useRouter();
	const pathname = usePathname();

	// Phone menu

	// const [isOpen, setIsOpen] = useState(false);
	// const dropdownRef = useRef<HTMLDivElement>(null);
	// const toggleMenu = () => {
	// 	setIsOpen(!isOpen);
	// };
	// useEffect(() => {
	// 	// biome-
	// 	const handleClickOutside = (event: MouseEvent) => {
	// 		if (
	// 			dropdownRef.current &&
	// 			!dropdownRef.current.contains(event.target as Node)
	// 		) {
	// 			setIsOpen(false);
	// 		}
	// 	};

	// 	document.addEventListener("mousedown", handleClickOutside);
	// 	return () => {
	// 		document.removeEventListener("mousedown", handleClickOutside);
	// 	};
	// }, []);


	type users = {
    id: number;
    username: string;
		firstName?: string;
    email: string;
    image: string;
    admin: boolean;
	}

	const [userName, setUserName] = useState({} as users);
	const [userImage, setUserImage] = useState("");
	const [isOnloginPage, setIsOnloginPage] = useState(false);
	const [userType, setUserType] = useState("");

	useEffect(() => {
		const token = localStorage.getItem("token");
		if (!token) {
			pathname === "/login" ? setIsOnloginPage(true) : setIsOnloginPage(false);
			router.push("/login");
		} else {
			const { whatUserAreYou, user } = CheckIfLoggedIn(token);
			if (whatUserAreYou === "Staff" || whatUserAreYou === "Admin") {
				setUserType("staff");
			} else {
				setUserType("student");
			}
			setUserName(user.user);
			setUserImage(user.user.image);
			setIsOnloginPage(false);
		}
	}, [router, pathname]);

	const logOutUser = (event: { preventDefault: () => void }) => {
		event.preventDefault();
		localStorage.removeItem("token");
		router.push("/login");
	};

	function AllBooksRedirect() {
		router.push("/AllBook");
	}

	function DashboardRedirect() {
		router.push("/");
	}

	function RegUserRedirect() {
		router.push("/registerUser");
	}

	function MembersRedirect() {
		router.push("/UserList");
	}

	function LoanRedirect() {
		router.push("/loanBook");
	}

	function ProfileRedirect() {
		router.push(`/profile/${userType}/${userName.id}`);
	}

	return (
		<>
			{!isOnloginPage && ( //Phone menu
				// ! Don't touch !

				// <div className="flex h-screen w-screen justify-center items-center">
				// 	{/* Under denna */}
				// 	<div className="dropdown" ref={dropdownRef}>
				// 		<label className="swap">
				// 			<input type="checkbox" checked={isOpen} onChange={toggleMenu} />
				// 			{/* Hamburgir */}
				// 			{!isOpen && (
				// 				<div className="space-y-2">
				// 					<span className="block h-0.5 w-6 bg-gray-400 rounded-full" />
				// 					<span className="block h-0.5 w-6 bg-gray-400 rounded-full" />
				// 					<span className="block h-0.5 w-6 bg-gray-400 rounded-full" />
				// 				</div>
				// 			)}
				// 			{isOpen && (
				// 				<div>
				// 					<svg
				// 						className="h-8 w-8 text-gray-400"
				// 						viewBox="0 0 24 24"
				// 						fill="none"
				// 						stroke="currentColor"
				// 						strokeWidth="2"
				// 						strokeLinecap="round"
				// 						strokeLinejoin="round"
				// 					>
				// 						<title>X</title>

				// 						<line x1="18" y1="6" x2="6" y2="18" />
				// 						<line x1="6" y1="6" x2="18" y2="18" />
				// 					</svg>

				// 					<div>
				// 						<ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
				// 							<li>
				// 								<a href="/">Item 1</a>
				// 							</li>
				// 							<li>
				// 								<a href="/">Item 2</a>
				// 							</li>
				// 						</ul>
				// 					</div>
				// 				</div>
				// 			)}
				// 		</label>
				// 	</div>
				// </div>

				// Desltop menu
				<div className="group flex justify-between items-start flex-col h-screen relative bg-zinc-400 dark:bg-zinc-700 w-16 transition-all ease-in-out duration-200 pl-1 cursor-pointer z-50 hover:w-72">
					<div className="flex justify-start items-center flex-col h-full w-14 gap-8 mt-6">
						<div
							onClick={ProfileRedirect}
							onKeyDown={ProfileRedirect}
							className="flex flex-row items-center gap-10 w-10 rounded-3xl transition-all duration-300 hover:bg-slate-900 hover:bg-opacity-40 hover:pl-3 group-hover:w-60 group-hover:ml-52"
						>
							{userImage ? (
								<Image
									className="rounded-full w-10"
									src={
										userName.image.includes(".")
											? `/${userName.image}`
											: "/pfp.jpg"
									}
									alt="profile pictue"
									width={40}
									height={40}
								/>
							) : (
								<Image
									className="rounded-full w-10"
									src="/Navbar_img/Profile.png"
									alt="profile pictue"
									width={40}
									height={40}
								/>
							)}
							<p className="text-lg transition !duration-150 ease-in-out hidden group-hover:block">
								{userName.firstName}
							</p>
						</div>

						<span className="w-8 h-4 border border-t-2 border-l-0 border-r-0 border-b-0 rounded-sm transistion-all duration-200 group-hover:w-56 group-hover:ml-52">
							{""}
						</span>

						<div
							onClick={DashboardRedirect}
							onKeyDown={DashboardRedirect}
							className="flex flex-row items-center gap-10 w-10 ml-1 rounded-3xl transition-all duration-300 hover:bg-slate-900 hover:bg-opacity-40 hover:pl-3 group-hover:w-60 group-hover:ml-52"
						>
							<Image
								className="w-9"
								src="/Navbar_img/table.png"
								alt="Dashboard icon"
								width={36}
								height={36}
							/>
							<p className="text-lg transition-all !duration-150 ease-in-out hidden group-hover:block">
								Dashboard
							</p>
						</div>

						<div
							onClick={MembersRedirect}
							onKeyDown={MembersRedirect}
							className="flex flex-row items-center gap-10 w-10 ml-1 rounded-3xl transition-all duration-300 hover:bg-slate-900 hover:bg-opacity-40 hover:pl-3 group-hover:w-60 group-hover:ml-52"
						>
							<Image
								className="w-9"
								src="/Navbar_img/People.png"
								alt="Members icon"
								width={36}
								height={36}
							/>
							<p className="text-lg transition-all !duration-150 ease-in-out hidden group-hover:block">
								Users
							</p>
						</div>

						<div
							onClick={RegUserRedirect}
							onKeyDown={RegUserRedirect}
							className="flex flex-row items-center gap-10 w-10 ml-1 rounded-3xl transition-all duration-300 hover:bg-slate-900 hover:bg-opacity-40 hover:pl-3 group-hover:w-60 group-hover:ml-52"
						>
							<Image
								className="w-9"
								src="/Navbar_img/newAddUser.png"
								alt="Members icon"
								width={36}
								height={36}
							/>
							<p className="text-lg whitespace-nowrap transition-all !duration-150 ease-in-out hidden group-hover:block">
								Add User
							</p>
						</div>

						<div
							onClick={AllBooksRedirect}
							onKeyDown={AllBooksRedirect}
							className="flex flex-row items-center gap-10 w-10 rounded-3xl transition-all duration-300 hover:bg-slate-900 hover:bg-opacity-40 hover:pl-3 group-hover:w-60 group-hover:ml-52"
						>
							<Image
								className="w-10"
								src="/Navbar_img/Book.png"
								alt="Books icon"
								width={36}
								height={36}
							/>
							<p className="text-lg transition-all !duration-150 ease-in-out hidden group-hover:block">
								Books
							</p>
						</div>

						<div
							onClick={LoanRedirect}
							onKeyDown={LoanRedirect}
							className="flex flex-row items-center gap-10 w-10 rounded-3xl transition-all duration-300 hover:bg-slate-900 hover:bg-opacity-40 hover:pl-3 group-hover:w-60 group-hover:ml-52"
						>
							<Image
								className="w-10"
								src="/Navbar_img/ReturnBook.png"
								alt="Returned icon"
								width={36}
								height={36}
							/>
							<p className="text-lg transition-all !duration-150 ease-in-out hidden group-hover:block">
								Loan
							</p>
						</div>
					</div>

					<div className="flex justify-end flex-col h-full w-14 gap-8 items-center mb-6">
						<div
							onClick={logOutUser}
							onKeyDown={logOutUser}
							className="flex flex-row items-center gap-10 w-10 rounded-3xl transition-all duration-300 hover:bg-slate-900 hover:bg-opacity-40 hover:pl-3 group-hover:w-60 group-hover:ml-52"
						>
							<Image
								className="w-10"
								src="/Navbar_img/LogoutRoundedLeft.png"
								alt="Logout icon"
								width={36}
								height={36}
							/>
							<p className="text-lg transition-all !duration-150 ease-in-out hidden group-hover:block">
								Logout
							</p>
						</div>
					</div>
				</div>
			)}
		</>
	);
}

// ! Don't touch this !

// <label className="btn btn-circle swap swap-rotate">
// 					{/* this hidden checkbox controls the state */}
// 					<input type="checkbox" />

// 					{/* hamburger icon */}
// 					{/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
// 					<svg
// 						className="swap-off fill-current"
// 						xmlns="http://www.w3.org/2000/svg"
// 						width="32"
// 						height="32"
// 						viewBox="0 0 512 512"
// 					>
// 						<path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
// 					</svg>

// 					{/* close icon */}
// 					{/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
// 					<svg
// 						className="swap-on fill-current"
// 						xmlns="http://www.w3.org/2000/svg"
// 						width="32"
// 						height="32"
// 						viewBox="0 0 512 512"
// 					>
// 						<polygon points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49" />
// 					</svg>
// 				</label>
