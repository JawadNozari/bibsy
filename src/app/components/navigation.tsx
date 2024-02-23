"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { CheckIfLoggedIn } from "./loginChecks";
import Link from "next/link";
export default function Page() {
	const router = useRouter();
	const pathname = usePathname();

	type users = {
		id: number;
		username: string;
		firstName?: string;
		email: string;
		image: string;
		admin: boolean;
	};

	const [userName, setUserName] = useState({} as users);
	//!TODO Check if image exists otherwise use default
	const [userImage, setUserImage] = useState("");
	const [isOnloginPage, setIsOnloginPage] = useState(false);
	const [userType, setUserType] = useState("");
	const [isAdmin, setIsAdmin] = useState(false);
	const [swapActive, setSwapActive] = useState(false);
	const [showPhoneNav, setShowPhoneNav] = useState(false);
	const [showDesktopNav, setShowDesktopNav] = useState(true);

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
			if (whatUserAreYou === "Admin") {
				setIsAdmin(true);
			} else {
				setIsAdmin(false);
			}
			setUserName(user.user);
			setUserImage(user.user.image);
			setIsOnloginPage(false);
		}

		const handleResize = () => {
			if (window.innerWidth < 640) {
				setShowPhoneNav(true);
				setShowDesktopNav(false);
			} else {
				setShowPhoneNav(false);
				setShowDesktopNav(true);
			}
		};

		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, [router, pathname]);

	const logOutUser = (event: { preventDefault: () => void }) => {
		event.preventDefault();
		localStorage.removeItem("token");
		router.push("/login");
	};

	function AllBooksRedirect() {
		router.push("/allBook");
	}

	function DashboardRedirect() {
		router.push("/");
	}

	function RegUserRedirect() {
		router.push("/registerUser");
	}

	function NewBooksRedirect() {
		router.push("/registerBook");
	}

	function MembersRedirect() {
		router.push("/userList");
	}

	function LoanRedirect() {
		router.push("/loanBook");
	}

	function ProfileRedirect() {
		router.push(`/profile/${userType}/${userName.id}`);
	}

	return (
		<>
			{showPhoneNav && (
				<label className="btn btn-circle swap swap-rotate relative z-50">
					{/* this hidden checkbox controls the state */}
					<input
						type="checkbox"
						onChange={(e) => setSwapActive(e.target.checked)}
					/>

					{/* hamburger icon */}
					<svg
						className="swap-off fill-current"
						xmlns="http://www.w3.org/2000/svg"
						width="32"
						height="32"
						viewBox="0 0 512 512"
					>
						<title>Hamburger icon</title>
						<path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
					</svg>

					{/* close icon */}
					<svg
						className="swap-on fill-current"
						xmlns="http://www.w3.org/2000/svg"
						width="32"
						height="32"
						viewBox="0 0 512 512"
					>
						<title>Close icon</title>
						<polygon points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49" />
					</svg>
				</label>
			)}

			{swapActive && (
				<div className="w-full h-full relative z-50 ">
					<ul className="p-2 shadow menu dropdown-content bg-base-100 rounded-box w-52">
						<li>
							<li>
								<Link href={`/profile/${userType}/${userName.id}`}>Profile</Link>
							</li>
						</li>
						<li>
							<a href="/">Dashboard</a>
						</li>
						<li>
							<a href="/userList">Users</a>
						</li>
						<li>
							<a href="/registerUser">Add Users</a>
						</li>
						<li>
							<a href="/allBook">Books</a>
						</li>
						<li>
							<a href="/registerBook">Add Books</a>
						</li>
						<li>
							<a href="/loanBook">Loan</a>
						</li>
						<li>
							<button onClick={logOutUser} onKeyDown={logOutUser} type="button" ref={null}>
								Logout
							</button>
						</li>
					</ul>
				</div>
			)}

			{!isOnloginPage && showDesktopNav && (
				// Desltop menu
				<div className="group flex justify-between items-start flex-col h-screen relative w-16 transition-all bg-sky-950 ease-in-out duration-200 pl-1 cursor-pointer z-50 hover:w-72">
					<div className="flex justify-start items-center flex-col h-full w-14 gap-8 mt-6">
						<div
							onClick={ProfileRedirect}
							onKeyDown={ProfileRedirect}
							className="flex flex-row items-center gap-10 w-10 py-1 rounded-3xl transition-all duration-300 hover:bg-slate-900 hover:bg-opacity-40 hover:pl-3 group-hover:w-60 group-hover:ml-52"
						>
							<Image
								className="rounded-full w-10"
								src={userImage ? `/${userImage}` : "/Navbar_img/pfp.png"}
								alt="profile pictue"
								width={40}
								height={40}
								priority
							/>

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
							className="flex flex-row items-center gap-10 w-10 py-1 ml-1 rounded-3xl transition-all duration-300 hover:bg-slate-900 hover:bg-opacity-40 hover:pl-3 group-hover:w-60 group-hover:ml-52"
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
							className="flex flex-row items-center gap-10 w-10 py-1 ml-1 rounded-3xl transition-all duration-300 hover:bg-slate-900 hover:bg-opacity-40 hover:pl-3 group-hover:w-60 group-hover:ml-52"
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

						{isAdmin && (
							<div
								onClick={RegUserRedirect}
								onKeyDown={RegUserRedirect}
								className="flex flex-row items-center gap-10 w-10 py-1 ml-1 rounded-3xl transition-all duration-300 hover:bg-slate-900 hover:bg-opacity-40 hover:pl-3 group-hover:w-60 group-hover:ml-52"
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
						)}

						<div
							onClick={AllBooksRedirect}
							onKeyDown={AllBooksRedirect}
							className="flex flex-row items-center gap-10 w-10 py-1 rounded-3xl transition-all duration-300 hover:bg-slate-900 hover:bg-opacity-40 hover:pl-3 group-hover:w-60 group-hover:ml-52"
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
							onClick={NewBooksRedirect}
							onKeyDown={NewBooksRedirect}
							className="flex flex-row items-center gap-10 w-10 py-1 rounded-3xl transition-all duration-300 hover:bg-slate-900 hover:bg-opacity-40 hover:pl-3 group-hover:w-60 group-hover:ml-52"
						>
							<Image
								className="w-10"
								src="/Navbar_img/addBooks.png"
								alt="Books icon"
								width={36}
								height={36}
							/>
							<p className="text-lg whitespace-nowrap transition-all !duration-150 ease-in-out hidden group-hover:block">
								Add Books
							</p>
						</div>

						<div
							onClick={LoanRedirect}
							onKeyDown={LoanRedirect}
							className="flex flex-row items-center gap-10 w-10 py-1 rounded-3xl transition-all duration-300 hover:bg-slate-900 hover:bg-opacity-40 hover:pl-3 group-hover:w-60 group-hover:ml-52"
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
							className="flex flex-row items-center gap-10 w-10 py-1 rounded-3xl transition-all duration-300 hover:bg-slate-900 hover:bg-opacity-40 hover:pl-3 group-hover:w-60 group-hover:ml-52"
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
