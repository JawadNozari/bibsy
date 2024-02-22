// userlist code
"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Staff from "./component/Staff";
import Student from "./component/Student";
import StaticModal from "./component/StaticModal"; // Import the StaticModal component
import axios from "axios";
import "../globals.css";
import { useSpring, animated } from "react-spring"; // Import react-spring library
import Page from "../components/navigation"; // Import the Navigation component
import { useRouter } from "next/navigation";
import { CheckIfLoggedIn } from "../components/loginChecks";

// Define interfaces for User and ApiResponse
interface User {
	id: number;
	password: string;
	firstName: string;
	lastName: string;
	email: string;
	phone: string;
	image: string;
	classroom: string;
	admin: boolean;
	qrCode: string;
}

interface ApiResponse {
	staffUsers: User[];
	studentUsers: User[];
}

export default function Home() {
	const router = useRouter();

	const [apiData, setApiData] = useState<ApiResponse | null>(null);
	const [selectedUser, setSelectedUser] = useState<User | null>(null);
	const [userType, setUserType] = useState<string>("all");
	const [searchTerm, setSearchTerm] = useState<string>("");
	const [showUserDetails, setShowUserDetails] = useState(false);
	const [showModal, setShowModal] = useState(false);
	const [isAdmin, setIsAdmin] = useState(false);

	useEffect(() => {
		const token = localStorage.getItem("token");
		if (!token) {
			router.push("/login");
		} else {
			const { areYouAdmin, whatUserAreYou } = CheckIfLoggedIn(token);
			setIsAdmin(areYouAdmin);
			if (whatUserAreYou !== "Staff" && whatUserAreYou !== "Admin") {
				router.push("/");
			}
		}

		const fetchData = async () => {
			try {
				const response = await axios("/api/getUsers"); // Fetch data from API endpoint
				const data: ApiResponse = await response.data; // Parse response as ApiResponse type
				setApiData(data); // Set fetched data to state
			} catch (error) {
				console.error(error); // Log any errors that occur during data fetching
			}
		};

		fetchData(); // Call fetchData function on component mount
	}, [router]);

	// Function to handle click on a user
	const handleClick = (user: User | null) => {
		setSelectedUser(user); // Set the selected user to the clicked user, or null if no user is clicked
		setShowUserDetails(true); // Show user details
		setDetailsAnimation({
			// Set animation to show user details
			transform: "translateX(0%)", // Show user details
		});
	};
	// Defines the handleUserTypeChange function to handle changes in user type
	const handleUserTypeChange = (type: string) => {
		setUserType(type); // Set the user type to the selected type
	};

	// Function to handle search input
	const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
		const searchTerm = event.target.value.toLowerCase(); // Get the search term from the input and convert it to lowercase
		setSearchTerm(searchTerm); // Set the search term to the state
	};

	const toggleModal = () => {
		setShowModal(!showModal);
	};

	// Define animation for user details
	const [detailsAnimation, setDetailsAnimation] = useSpring(() => ({
		transform: "translateX(-100%)", // Hide user details off-screen
		config: { mass: 1, tension: 170, friction: 26 }, // Set animation configuration
	}));
	// Return the user list page
	return (
		<main className="flex items-center h-screen bg-neutral-200 dark:bg-gray-800 justify-between overflow-x-auto">
			<div>
				<Page />
			</div>
			<div className="flex items-center h-screen justify-around w-full">
				{showUserDetails && (
					// Conditionally show user details based on state
					<animated.div
						// Apply animation to user details
						className="bg-white dark:bg-gray-900 dark:border-gray-700 shadow-xl rounded-lg min-h-content w-80 flex items-center justify-center flex-col h-3/4 py-6 px-2"
						style={detailsAnimation} // Set animation style
					>
						<Image
							className="w-56 h-56 rounded-full "
							width={200}
							height={200}
							src={
								selectedUser.image.includes(".") && selectedUser.image != null
									? `/${selectedUser.image}`
									: "/pfp.jpg"
							}
							alt={`${selectedUser?.firstName} ${selectedUser?.lastName}`} // Add null check for selectedUser
						/>
						<div className="py-2 max-h-screen text-wrap w-full overflow-hidden">
							<h3 className=" text-center text-3xl text-gray-700 dark:text-gray-400 font-medium leading-8 sticky py-2 top-0 text-wrap ">
								{selectedUser?.firstName} {selectedUser?.lastName}
							</h3>
							<div className="text-center my-3">
								{/* Render the button to toggle modal */}
								<button
									className="text-xs text-indigo-500 italic hover:underline hover:text-indigo-600 font-medium"
									type="button"
									onClick={toggleModal} // Call toggleModal function when button is clicked
								>
									View more info
								</button>
							</div>
							<table className="text-1xl my-2 w-full h-2/4 overflow-hidden text-wrap">
								{/* Conditionally display details based on user type */}
								{selectedUser?.classroom ? (
									// Check for presence of "classroom" property
									<tbody>
										<tr>
											<td className="px-4 py-1 text-gray-500 font-semibold">
												Email
											</td>
											<td className="px-4 py-1 ">{selectedUser?.email}</td>
										</tr>
										<tr>
											<td className="px-4 py-1 text-gray-500 font-semibold">
												Phone
											</td>
											<td className="px-4 py-1">{selectedUser?.phone}</td>
										</tr>
										<tr>
											<td className="px-4 py-1 text-gray-500 font-semibold">
												Class
											</td>
											<td className="px-4 py-1">{selectedUser?.classroom}</td>
										</tr>
									</tbody>
								) : (
									<tbody>
										<tr>
											<td className="px-4 py-1 text-gray-500 font-semibold">
												Email
											</td>
											<td className="px-4 py-1 ">{selectedUser?.email}</td>
										</tr>
										<tr>
											<td className="px-4 py-1 text-gray-500 font-semibold">
												Phone
											</td>
											<td className="px-4 py-1">{selectedUser?.phone}</td>
										</tr>
										<tr>
											<td className="px-4 py-1 text-gray-500 font-semibold">
												Admin
											</td>
											<td className="px-4 py-1">
												{selectedUser?.admin ? "Yes" : "No"}
											</td>
										</tr>
									</tbody>
								)}
							</table>
						</div>
					</animated.div>
				)}
				{/* User List */}
				<div className="flex flex-col bg-white  dark:bg-gray-900 overflow-y-auto max-h-screen w-2/3 h-3/4 shadow-md sm:rounded-lg">
					<div className="flex items-center justify-between border-b px-4 py-2 bg-white dark:bg-gray-900 dark:border-gray-700">
						<h2 className="text-3xl font-bold text-nowrap">User List</h2>
						<div className="flex items-center justify-between bg-white dark:bg-gray-900 dark:border-gray-700">
							<div className="dropdown dropdown-end mx-4">
								<div tabIndex={0} role="button" className="btn w-40 capitalize">
									Select users
								</div>
								<ul className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-40">
									<li>
										{/* biome-ignore lint/a11y/useButtonType: <explanation> */}
										<button onClick={() => handleUserTypeChange("all")}>
											All Users
										</button>
									</li>
									<li>
										{/* biome-ignore lint/a11y/useButtonType: <explanation> */}
										<button onClick={() => handleUserTypeChange("staff")}>
											Staffs
										</button>
									</li>
									<li>
										{/* biome-ignore lint/a11y/useButtonType: <explanation> */}
										<button onClick={() => handleUserTypeChange("student")}>
											Students
										</button>
									</li>
								</ul>
							</div>
							<div className="relative">
								<div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
									<svg
										className="w-4 h-4 text-gray-500 dark:text-gray-400"
										aria-hidden="true"
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 20 20"
									>
										<path
											stroke="currentColor"
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
										/>
									</svg>
								</div>
								<input
									// Add input element for search
									type="text"
									id="table-search-users"
									className="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
									placeholder="Search for users"
									value={searchTerm} // Set value to searchTerm
									onChange={handleSearch} // Add onChange event to handle search
								/>
							</div>
						</div>
					</div>
					<div>
						<table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
							{apiData && (
								// Conditionally render user list based on API data
								<>
									{userType === "all" && (
										// Conditionally render user list based on user type
										<>
											<Staff
												staffUsers={apiData.staffUsers.filter(
													(
														user, // Filter staff users based on search term
													) =>
														`${user.firstName} ${user.lastName}` // Combine first and last name
															.toLowerCase() // Convert to lowercase
															.includes(searchTerm.toLowerCase()), // Check if it includes the search term
												)}
												handleClick={handleClick} // Pass handleClick
												isAdmin={isAdmin} // Pass isAdmin
											/>
											<Student
												studentUsers={apiData.studentUsers.filter((user) =>
													`${user.firstName} ${user.lastName}`
														.toLowerCase()
														.includes(searchTerm.toLowerCase()),
												)}
												handleClick={handleClick}
												isAdmin={isAdmin}
											/>
										</>
									)}
									{userType === "staff" && (
										<Staff
											staffUsers={apiData.staffUsers.filter((user) =>
												`${user.firstName} ${user.lastName}`
													.toLowerCase()
													.includes(searchTerm.toLowerCase()),
											)}
											handleClick={handleClick}
											isAdmin={isAdmin}
										/>
									)}
									{userType === "student" && (
										<Student
											studentUsers={apiData.studentUsers.filter((user) =>
												`${user.firstName} ${user.lastName}`
													.toLowerCase()
													.includes(searchTerm.toLowerCase()),
											)}
											handleClick={handleClick}
											isAdmin={isAdmin}
										/>
									)}
								</>
							)}
						</table>
					</div>
				</div>
				{/* Render the StaticModal component */}
				{selectedUser && (
					<StaticModal
						showModal={showModal}
						toggleModal={toggleModal}
						selectedUser={{
							...selectedUser,
							qrCode: selectedUser.qrCode.toString(),
						}}
					/>
				)}
			</div>
		</main>
	);
}
