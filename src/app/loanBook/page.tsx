// "use client";
// import React, { useEffect, useState, useRef } from "react";
// import Image from "next/image";
// import axios from "axios";
// import Profile from "../../../public/img/img.jpg";
// // import Navgation from "../Navigation/page";
// import ProtectedPage from "../protectedPage/page";

// interface User {
// 	id: number;
// 	password: string;
// 	firstName: string;
// 	lastName: string;
// 	email: string;
// 	classroom: string;
// 	phone: string;
// 	image: string;
// 	qrCode: number;
// 	type: "student" | "staff";
// }

// interface ApiResponse {
// 	staffUsers: User[];
// 	studentUsers: User[];
// }

// interface Book {
// 	id: number;
// 	title: string;
// 	bookImg: string;
// 	author: string;
// 	invNr: number;
// 	available: boolean;
// 	regDate: string;
// 	isbn: number;
// }

// interface BookApiResponse {
// 	books: Book[];
// }

// export default function LoanBook() {
// 	const [apiData, setApiData] = useState<ApiResponse[]>([]);
// 	const [data2, setData2] = useState<BookApiResponse | null>(null);
// 	const [isLoading, setIsLoading] = useState(true);
// 	const [searchQuery, setSearchQuery] = useState(""); // Add search query state
// 	const [showList, setShowList] = useState(false); // List hidden by default
// 	const [selectedUser, setSelectedUser] = useState<User | null>(null); // Add selected user state
// 	const userClickedRef = useRef(false); // Add this ref
// 	const [invNr, setInvNr] = useState("");
// 	const [selectedBook, setSelectedBook] = useState<Book | null>(null);
	

// 	// * Fetch users from the API
// 	useEffect(() => {
// 		const invNr = new URLSearchParams(window.location.search).get("invNr");
// 		const token = localStorage.getItem("token");
  
// 		if (token) {
// 			const payload = JSON.parse(atob(token.split(".")[1]));
// 			// return payload.Value;
// 			console.log(payload);
// 		}

// 		if (invNr) {
// 			setInvNr(invNr); // Update the state with the passed invNr
// 		}
// 		const fetchData = async () => {
// 			try {
// 				const response = await fetch("../api/getUsers");
// 				const response2 = await fetch("../api/availableBooks");
// 				// * log the response status code:
// 				console.log("Response status:", response.status);

// 				// *  Check if the response is OK (status code 200)
// 				if (response.ok && response2.ok) {
// 					const data: ApiResponse = await response.json();
// 					const data2: BookApiResponse = await response2.json();

// 					// * Set the fetched data to the state
// 					setApiData([data]);

// 					// * Set the fetched data to the state
// 					setData2(data2);

// 					// * Log the fetched data
// 					console.log("Fetched data:", data, data2);

// 					// * Set loading state to false
// 					setIsLoading(false); // * Set loading state to false
// 				} else {
// 					// * Log the error status text
// 					console.error("Error fetching data:", response.statusText);
// 				}
// 			} catch (error) {
// 				console.error("Error:", error);
// 				// * Log the error
// 			}
// 		};

// 		fetchData();
// 	}, []);

// 	// * Handle search input change
// 	const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
// 		setSearchQuery(event.target.value);
// 		setShowList(true); //* Show list on any search input

// 		if (event.target.value === "") {
// 			setSelectedUser(null); //* Clear selected user on empty search input
// 		}
// 	};

// 	const handleinvNrChange = (event: React.ChangeEvent<HTMLInputElement>) => {
// 		setInvNr(event.target.value);

// 		//* Search for a book with the entered invNr
// 		const book = data2?.books.find(
// 			(book) => book.invNr.toString() === event.target.value,
// 		);

// 		//*  Update the selected book
// 		setSelectedBook(book || null);
// 	};

// 	//* Add this function to get the current user's ID from the token
// 	const getCurrentUserId = () => {
// 		const token = localStorage.getItem("token");
  
// 		if (token) {
// 			const payload = JSON.parse(atob(token.split(".")[1]));
// 			// return payload.Value;
// 			console.log(payload);
// 			return Number(payload.Value); // Convert the user ID to a number
// 		}
// 		console.error("No token found");
		
// 		return null;
		
//   	};

// 	// * Filter users based on search query
// 	const filterUsers = (users: User[]) => {
// 		// * If there is no search query, return all users
// 		if (!searchQuery) {
// 			return users;
// 		}

// 		// * Normalize search query and user names for case-insensitive search
// 		const normalizedQuery = searchQuery.toLowerCase();
// 		const currentUserId = getCurrentUserId();
		
// 		// return users.filter((user) => {
// 		// 	const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
// 		// 	return fullName.includes(normalizedQuery);

// 		// });

// 		return users.filter((user) => {
// 			const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
// 			const isStudent = user.type === "student";
// 			const isStaff = user.type === "staff" && user.id === currentUserId;

// 			return fullName.includes(normalizedQuery) && (isStudent || isStaff);
// 		});
// 	};

// 	//* Handle user click event
// 	const handleUserClick = (user: User) => {
// 		setSelectedUser(user); //* Store selected user on click
// 		userClickedRef.current = true; // * Set the ref to true on user click
// 		setSearchQuery(`${user.firstName} ${user.lastName}`); //*  Set search query to the user's name
// 		console.log(selectedUser);
// 		console.log(user);
// 		setShowList(false); //* Hide the list on user click
// 	};

// 	//* Handle focus out event
// 	const handleFocusOut = () => {
// 		setTimeout(() => {
// 			if (!userClickedRef.current) {
// 				setShowList(false);
// 			}
// 			userClickedRef.current = false; //* Reset the ref after the timeout
// 		}, 100);
// 	};

// 	// * Handle form submit
// 	const handleSubmit = async (e: React.SyntheticEvent) => {
// 		e.preventDefault();
// 		//* Send a POST request to the server
// 		try {
// 			const response = await axios.post("/api/setBookBorrowed", {
// 				user: selectedUser,
// 				invNr: invNr,
// 			});
// 			//* Log the response status
// 			if (response.status === 200) {
// 				// Update frontend state based on response
// 				// For example, if the response includes the updated book:
// 				setSelectedBook(response.data.book);
// 			} else {
// 				console.error("Error borrowing book:", response.statusText);
// 			}
// 		} catch (error) {
// 			console.error("Error:", error);
// 		}
// 	};

// 	// * Render the page
// 	return (
// 		<main className="flex w-screen h-screen justify-center items-center bg-neutral-100 text-black dark:bg-gray-800">
// 			<ProtectedPage/>
// 			<div className="flex justify-between  ">
// 				{selectedUser && (
// 					<div className="w-96 rounded card-normal mr-20 h-auto shadow-md  bg-gray-800 text-neutral-50 dark:bg-neutral-50 dark:text-gray-500 " >
// 						<div className=" text-center">
// 							<button
// 								type="button"
// 								className="btn m-3 btn-wide btn-active btn-neutral bg-neutral-50 text-gray-500 dark:bg-gray-700 dark:text-white"
// 								onClick={() => setSelectedUser(null)}
// 							>
// 								Close
// 							</button>
// 						</div>

// 						<div className="m-10 justify-center items-center flex">
// 							<Image src={Profile} alt="profile" width={200} height={200} />
// 						</div>

// 						<div className="m-5 ">
// 							<p>
// 								Name: {selectedUser.firstName} {selectedUser.lastName}
// 							</p>
// 						</div>

// 						<div className="m-5">
// 							<p>Email: {selectedUser.email}</p>
// 						</div>

// 						<div className="m-5 ">
// 							<p>Class: {selectedUser.classroom}</p>
// 						</div>
// 					</div>
// 				)}

// 				<div className=" flex justify-center  items-center w-96 h-[27rem] mx-auto dark:bg-neutral-50  bg-gray-800  rounded-lg drop-shadow-2xl">
// 					<form
// 						onSubmit={handleSubmit}
// 						className="flex flex-col w-64"
// 						autoComplete="off"
// 					>
// 						<div className="flex justify-center mb-10 items-center m-3 ">
// 							<h1 className="text-4xl font-bold text-center text-neutral-50 dark:text-gray-700">Loan Book</h1>
// 						</div>

// 						<div>
// 							<div className="flex flex-col w-full  max-w-md">
// 								<label
// 									htmlFor="Users"
// 									className="mb-2  w-64 text-lg text-center font-semibold text-neutral-50 dark:text-gray-700 "
// 								>
// 									Member
// 								</label>
// 								<input
// 									id="Users"
// 									type="text"
// 									value={searchQuery}
// 									onChange={handleSearchChange}
// 									onFocus={() => setShowList(true)}
// 									onBlur={handleFocusOut}
// 									placeholder="Search User..."
// 									className="rounded-md  input font-medium bg-neutral-50  text-gray-700 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
// 								/>

// 								<div>
// 									{isLoading ? (
// 										<p>Loading data...</p>
// 									) : (
// 										//*  Conditionally render the list based on showList and searchQuery
// 										showList && (
// 											<div className=" mt-1 rounded-lg absolute no-scrollbar  overflow-x-auto overflow-scroll text-white w-64 h-64 bg-slate-800">
// 												<h1 className="m-1 text-xl text-center border-b border-gray-300 bg-slate-800  p-2 cursor-pointer ">
// 													Staff Users:
// 												</h1>
// 												{filterUsers(
// 													apiData.flatMap((data) => data.staffUsers),
// 												).map((staff) => (
// 													<ul
// 														className="border-b list-none  border-gray-300 bg-slate-800  p-2 cursor-pointer "
// 														key={staff.id}
// 													>
// 														<li>
// 															<button
// 																type="button"
// 																className="m-1"
// 																key={staff.id}
// 																onClick={() => handleUserClick(staff)}
// 															>
// 																{staff.firstName} {staff.lastName} (Admin)
// 															</button>
// 														</li>
// 													</ul>
// 												))}

// 												<h1 className="m-1 text-xl text-center border-b border-gray-300  bg-slate-800  p-2 cursor-pointer ">
// 													Student Users:
// 												</h1>
// 												{filterUsers(
// 													apiData.flatMap((data) => data.studentUsers),
// 												).map((student) => (
// 													<ul
// 														className="border-b list-none border-gray-300 bg-slate-800  p-2 cursor-pointer "
// 														key={student.id}
// 													>
// 														<li>
// 															<button
// 																type="button"
// 																className="m-1"
// 																key={student.id}
// 																onClick={() => handleUserClick(student)}
// 															>
// 																{student.firstName} {student.lastName} (Student)
// 															</button>
// 														</li>
// 													</ul>
// 												))}
// 											</div>
// 										)
// 									)}
// 								</div>
// 							</div>
// 						</div>

// 						<div className="mt-5 ">
// 							<label
// 								htmlFor="invNr"
// 								className="block mb-2 text-lg font-semibold text-gray-50 text-center dark:text-gray-700"
// 							>
// 								invNr
// 							</label>

// 							<div className="flex">
// 								<input
// 									type="text"
// 									id="invNr"
// 									placeholder="Enter InvNR..."
// 									value={invNr}
// 									onChange={handleinvNrChange}
// 									className="input bg-neutral-50  text-gray-700  font-medium text-sm rounded-l-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
// 								/>
// 							</div>
// 						</div>

// 						<div className="mt-10 mb-10 justify-center flex">
// 							<button
//     							type="button"
//     							onClick={() => window.history.back()}
//    								className="btn block m-3 bg-neutral-50  hover:text-gray-50 text-gray-500 dark:bg-gray-700 btn-active btn-neutral"
//  							>
//   							 	Go Back
//  							</button>
// 							<button
// 								type="submit"
// 								className="btn block   m-3 bg-neutral-50  hover:text-gray-50  text-gray-500 dark:bg-gray-700  btn-active btn-neutral"
// 							>
// 								Loan
// 							</button>
// 						</div>
// 					</form>
// 				</div>

// 				<div className="flex justify-end">
// 					{selectedBook && (
// 						<div className="w-[15rem] h-[20rem] ml-20 border">
// 							<Image
// 								src={`/${selectedBook.bookImg}`}
// 								alt="book cover"
// 								width={64}
// 								height={80}
// 							/>
// 							<h1 className="text-center mt-5 text-xl">{selectedBook.title}</h1>
// 						</div>
// 					)}
// 				</div>
// 			</div>
// 		</main>
// 	);
// }


"use client";
import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import axios from "axios";
import Profile from "../../../public/img/img.jpg";
import ProtectedPage from "../protectedPage/page";
// import Navgation from "../Navigation/page";

interface User {
	id: number;
	password: string;
	firstName: string;
	lastName: string;
	email: string;
	classroom: string;
	phone: string;
	image: string;
	qrCode: number;
	type: "student" | "staff";
}

interface ApiResponse {
	staffUsers: User[];
	studentUsers: User[];
}

interface Book {
	id: number;
	title: string;
	bookImg: string;
	author: string;
	invNr: number;
	available: boolean;
	regDate: string;
	isbn: number;
}

interface BookApiResponse {
	books: Book[];
}

interface UserToken {
    iat: number;
    role: string;
    user: {
        admin: boolean;
        email: string;
        firstName: string;
        id: number;
        lastName: string;
        password: string;
        phone: string;
        qrCode: string;
    };
}

export default function LoanBook() {
	const [apiData, setApiData] = useState<ApiResponse[]>([]);
	const [data2, setData2] = useState<BookApiResponse | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [searchQuery, setSearchQuery] = useState(""); // Add search query state
	const [showList, setShowList] = useState(false); // List hidden by default
	const [selectedUser, setSelectedUser] = useState<User | null>(null); // Add selected user state
	const userClickedRef = useRef(false); // Add this ref
	const [invNr, setInvNr] = useState("");
	const [selectedBook, setSelectedBook] = useState<Book | null>(null);
	const [userType, setUserType] = useState<UserToken>();

	

	// * Fetch users from the API
	useEffect(() => {
		const token = localStorage.getItem("token");
        if (token) {
            const decodedToken = JSON.parse(atob(token.split(".")[1]));
            setUserType(decodedToken);
        } else {
            console.log("no token");
        }
		const invNr = new URLSearchParams(window.location.search).get("invNr");
		if (invNr) {
			setInvNr(invNr); // Update the state with the passed invNr
		}
		const fetchData = async () => {
			try {
				const response = await fetch("../api/getUsers");
				const response2 = await fetch("../api/availableBooks");
				// * log the response status code:
				console.log("Response status:", response.status);

				// *  Check if the response is OK (status code 200)
				if (response.ok && response2.ok) {
					const data: ApiResponse = await response.json();
					const data2: BookApiResponse = await response2.json();

					// * Set the fetched data to the state
					setApiData([data]);

					// * Set the fetched data to the state
					setData2(data2);

					// * Log the fetched data
					console.log("Fetched data:", data, data2);

					// * Set loading state to false
					setIsLoading(false); // * Set loading state to false
				} else {
					// * Log the error status text
					console.error("Error fetching data:", response.statusText);
				}
			} catch (error) {
				console.error("Error:", error);
				// * Log the error
			}
		};

		fetchData();
	}, []);

	// * Handle search input change
	const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSearchQuery(event.target.value);
		setShowList(true); //* Show list on any search input

		if (event.target.value === "") {
			setSelectedUser(null); //* Clear selected user on empty search input
		}
	};

	const handleinvNrChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setInvNr(event.target.value);

		//* Search for a book with the entered invNr
		const book = data2?.books.find(
			(book) => book.invNr.toString() === event.target.value,
		);

		//*  Update the selected book
		setSelectedBook(book || null);
	};

	//* Add this function to get the current user's ID from the token
	// const getCurrentUserId = () => {
	// 	const token = localStorage.getItem("token");
  
	// 	if (token) {
	// 		const payload = JSON.parse(atob(token.split(".")[1]));
	// 		// return payload.Value;
	// 		return Number(payload.Value); // Convert the user ID to a number

	// 	}
	// 	return null;
  	// };

	// * Filter users based on search query
	const filterUsers = (users: User[]) => {
		// * If there is no search query, return all users
		if (!searchQuery) {
			return users;
		}

		// * Normalize search query and user names for case-insensitive search
		const normalizedQuery = searchQuery.toLowerCase();
		// const currentUserId = getCurrentUserId();
		
		return users.filter((user) => {
			const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
			return fullName.includes(normalizedQuery);

		});

		// return users.filter((user) => {
		// 	const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
		// 	const isStudent = user.type === 'student';
		// 	const isStaff = user.type === 'staff' && user.id === currentUserId;

		// 	return fullName.includes(normalizedQuery) && (isStudent || isStaff);
		// });
	};


	
	

	//* Handle user click event
	const handleUserClick = (user: User) => {
		setSelectedUser(user); //* Store selected user on click
		userClickedRef.current = true; // * Set the ref to true on user click
		setSearchQuery(`${user.firstName} ${user.lastName}`); //*  Set search query to the user's name
		console.log(selectedUser);
		console.log(user);
		setShowList(false); //* Hide the list on user click
	};

	//* Handle focus out event
	const handleFocusOut = () => {
		setTimeout(() => {
			if (!userClickedRef.current) {
				setShowList(false);
			}
			userClickedRef.current = false; //* Reset the ref after the timeout
		}, 100);
	};

	// * Handle form submit
	const handleSubmit = async (e: React.SyntheticEvent) => {
		e.preventDefault();
		//* Send a POST request to the server
		try {
			const response = await axios.post("/api/setBookBorrowed", {
				user: selectedUser,
				invNr: invNr,
				currentStaff: userType?.user.id,
			});
			//* Log the response status
			if (response.status === 200) {
				// Update frontend state based on response
				// For example, if the response includes the updated book:
				setSelectedBook(response.data.book);
			} else {
				console.error("Error borrowing book:", response.statusText);
			}
		} catch (error) {
			console.error("Error:", error);
		}
	};

	// * Render the page
	return (
		<main className="flex w-screen h-screen justify-center items-center bg-neutral-100 text-black dark:bg-gray-800">
			<ProtectedPage />
			<div className="flex justify-between  ">
				{selectedUser && (
					<div className="w-96 rounded card-normal mr-20 h-auto shadow-md  bg-gray-800 text-neutral-50 dark:bg-neutral-50 dark:text-gray-500 " >
						<div className=" text-center">
							<button
								type="button"
								className="btn m-3 btn-wide btn-active btn-neutral bg-neutral-50 text-gray-500 dark:bg-gray-700 dark:text-white"
								onClick={() => setSelectedUser(null)}
							>
								Close
							</button>
						</div>

						<div className="m-10 justify-center items-center flex">
							<Image src={Profile} alt="profile" width={200} height={200} />
						</div>

						<div className="m-5 ">
							<p>
								Name: {selectedUser.firstName} {selectedUser.lastName}
							</p>
						</div>

						<div className="m-5">
							<p>Email: {selectedUser.email}</p>
						</div>

						<div className="m-5 ">
							<p>Class: {selectedUser.classroom}</p>
						</div>
					</div>
				)}

				<div className=" flex justify-center  items-center w-96 h-[27rem] mx-auto dark:bg-neutral-50  bg-gray-800  rounded-lg drop-shadow-2xl">
					<form
						onSubmit={handleSubmit}
						className="flex flex-col w-64"
						autoComplete="off"
					>
						<div className="flex justify-center mb-10 items-center m-3 ">
							<h1 className="text-4xl font-bold text-center text-neutral-50 dark:text-gray-700">Loan Book</h1>
						</div>

						<div>
							<div className="flex flex-col w-full  max-w-md">
								<label
									htmlFor="Users"
									className="mb-2  w-64 text-lg text-center font-semibold text-neutral-50 dark:text-gray-700 "
								>
									Member
								</label>
								<input
									id="Users"
									type="text"
									value={searchQuery}
									onChange={handleSearchChange}
									onFocus={() => setShowList(true)}
									onBlur={handleFocusOut}
									placeholder="Search User..."
									className="rounded-md  input font-medium bg-neutral-50  text-gray-700 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
								/>

								<div>
									{isLoading ? (
										<p>Loading data...</p>
									) : (
										//*  Conditionally render the list based on showList and searchQuery
										showList && (
											<div className=" mt-1 rounded-lg absolute no-scrollbar  overflow-x-auto overflow-scroll text-white w-64 h-64 bg-slate-800">
												<h1 className="m-1 text-xl text-center border-b border-gray-300 bg-slate-800  p-2 cursor-pointer ">
													Staff Users:
												</h1>
												{filterUsers(
													apiData.flatMap((data) => data.staffUsers),
												).map((staff) => (
													<ul
														className="border-b list-none  border-gray-300 bg-slate-800  p-2 cursor-pointer "
														key={staff.id}
													>
														<li>
															<button
																type="button"
																className="m-1"
																key={staff.id}
																onClick={() => handleUserClick(staff)}
															>
																{staff.firstName} {staff.lastName} (Admin)
															</button>
														</li>
													</ul>
												))}

												<h1 className="m-1 text-xl text-center border-b border-gray-300  bg-slate-800  p-2 cursor-pointer ">
													Student Users:
												</h1>
												{filterUsers(
													apiData.flatMap((data) => data.studentUsers),
												).map((student) => (
													<ul
														className="border-b list-none border-gray-300 bg-slate-800  p-2 cursor-pointer "
														key={student.id}
													>
														<li>
															<button
																type="button"
																className="m-1"
																key={student.id}
																onClick={() => handleUserClick(student)}
															>
																{student.firstName} {student.lastName} (Student)
															</button>
														</li>
													</ul>
												))}
											</div>
										)
									)}
								</div>
							</div>
						</div>

						<div className="mt-5 ">
							<label
								htmlFor="invNr"
								className="block mb-2 text-lg font-semibold text-gray-50 text-center dark:text-gray-700"
							>
								invNr
							</label>

							<div className="flex">
								<input
									type="text"
									id="invNr"
									placeholder="Enter InvNR..."
									value={invNr}
									onChange={handleinvNrChange}
									className="input bg-neutral-50  text-gray-700  font-medium text-sm rounded-l-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
								/>
								{/* <i className="fa-solid fa-barcode ">
									<button
										className=" rounded-r-lg bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
										type="button"
									>
										code
									</button>
								</i> */}
							</div>
						</div>

						<div className="mt-10 mb-10 justify-center flex">
							<button
    							type="button"
    							onClick={() => window.history.back()}
   								className="btn block m-3 bg-neutral-50  text-gray-500 dark:bg-gray-700 btn-active btn-neutral"
 							>
  							 	Go Back
 							</button>
							<button
								type="submit"
								className="btn block   m-3 bg-neutral-50  text-gray-500 dark:bg-gray-700  btn-active btn-neutral"
							>
								Loan
							</button>
						</div>
					</form>
				</div>

				<div className="flex justify-end">
					{selectedBook && (
						<div className="w-[15rem] h-[20rem] ml-20 border">
							<Image
								src={`/${selectedBook.bookImg}`}
								alt="book cover"
								width={64}
								height={80}
							/>
							<h1 className="text-center mt-5 text-xl">{selectedBook.title}</h1>
						</div>
					)}
				</div>
			</div>
		</main>
	);
}
