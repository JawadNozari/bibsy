"use client";
import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";

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
	isbn: number;
	available: boolean;
	regDate: string; 
	invNr: number;

}
  
interface BookApiResponse {
	books: Book[];
}




export default function Home() {
    const [apiData, setApiData] = useState<ApiResponse[]>([]);
	const [data2, setData2] = useState<BookApiResponse | null>(null);
    const [isLoading, setIsLoading] = useState(true); 
	const [searchQuery, setSearchQuery] = useState(""); // Add search query state
	const [showList, setShowList] = useState(false); // List hidden by default
	const [selectedUser, setSelectedUser] = useState<User | null>(null); // Add selected user state
	const userClickedRef = useRef(false); // Add this ref
	const [isbn, setIsbn] = useState("");
	const [selectedBook, setSelectedBook] = useState<Book | null>(null);


	// * Fetch users from the API
	useEffect(() => {
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
				  console.log("Fetched data:", data , data2);

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
	  setShowList(true); // Show list on any search input

	    if (event.target.value === "") {
		 setSelectedUser(null); // Clear selected user on empty search input
	    }
	};

	const handleISBNChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setIsbn(event.target.value);
	  
		// Search for a book with the entered ISBN
		const book = data2?.books.find((book) => book.invNr.toString() === event.target.value);
	  
		// Update the selected book
		setSelectedBook(book || null);
	};
  
	// * Filter users based on search query
	const filterUsers = (users: User[]) => {
		if (!searchQuery) {
		   	return users;
		}
		
		// Normalize search query and user names for case-insensitive search
		const normalizedQuery = searchQuery.toLowerCase();
		return users.filter((user) => {
		    const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
		    return fullName.includes(normalizedQuery);
		});
    };  
     
	// * Handle user click event
	const handleUserClick = (user: User) => {
		setSelectedUser(user); // Store selected user on click
		userClickedRef.current = true; // Set the ref to true on user click
		setSearchQuery(`${user.firstName} ${user.lastName}`); // Set search query to the user's name
		console.log(selectedUser?.image);
		console.log(selectedUser);
	};
 
	// * Handle focus out event
	const handleFocusOut = () => {

		if (!searchQuery) {
			setTimeout(() => {
				if (!selectedUser) {
					setShowList(false);
				}
				userClickedRef.current = false; // Reset the ref after the timeout´
			},  500);
		}
	};
  
  
	return (
	 	<main className="flex min-h-screen items-center justify-around bg-neutral-50 text-black"> {/* flex min-h-screen flex-col items-center justify-between p-24 */}
		    <div className="flex  justify">
				{selectedUser && (
					<div className="w-[25rem] border card-normal  mr-10 h-[30rem] ">
						<div className=" text-center">
							<button type="button" className="btn m-3 btn-wide btn-active btn-neutral" onClick={() => setSelectedUser(null)}>Close</button> 
							{/* <h2>Selected User Details</h2> */}
						</div>
						<div className="m-10 justify-center items-center flex">
							{/* <img src={selectedUser.image} alt={`${selectedUser.firstName} ${selectedUser.lastName}`} className="w-20 h-20 rounded-full m-5" />	 */}
							<Image src="https://www.w3schools.com/w3images/avatar2.png" alt={`${selectedUser.firstName} ${selectedUser.lastName}`} className="w-28 h-28 mask mask-hexagon m-5" />
						</div>
						<div className="m-5 ">
							<p>Name: {selectedUser.firstName} {selectedUser.lastName}</p>
						</div>
						<div className="m-5">
							<p>Email: {selectedUser.email}</p> 
						</div>
					    <div className="m-5 "> 
							<p>Class: {selectedUser.classroom}</p>
						</div>
					</div>
				)}
				<div className="justify-center flex w-[25rem] h-[27rem] bg-neutral-200 rounded-md">
				    <form className="flex flex-col w-64" autoComplete="off">
						<div className="flex justify-center mb-10 items-center m-3 border">
							<h1 className="text-4xl font-bold text-center">Loan Book</h1>
						</div>
					    
						<div>
						    <div className="flex flex-col w-full  max-w-md">
								<label htmlFor="Users" className="mb-2  w-64 text-lg text-center font-medium">Member</label>
								<input
			  	 					id="Users"
			 						type="text"
			 						value={searchQuery}
									onChange={handleSearchChange}
									onFocus={() => setShowList(!showList)} 
									onBlur={handleFocusOut}
									placeholder="Search by name..."
									className="rounded-md  input  bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
								/>
						        
                                <div className="  ">
									{isLoading ? (
										<p>Loading data...</p>
										) : (
										// Conditionally render the list based on showList and searchQuery
										showList && (
											<div className=" mt-1 rounded-lg absolute no-scrollbar  overflow-x-auto overflow-scroll text-white w-64 h-64 bg-slate-800">
												<h1 className="m-1 text-xl text-center border-b border-gray-300 bg-slate-800  p-2 cursor-pointer ">Staff Users:</h1>
												{filterUsers(apiData.flatMap((data) => data.staffUsers))
													.map((staff) => (
										  		 	    <ul className="border-b list-none  border-gray-300 bg-slate-800  p-2 cursor-pointer " key={staff.id}>
															<li>
																<button type="button" className="m-1" key={staff.id} onClick={() => handleUserClick(staff)}>
																	{staff.firstName} {staff.lastName} (Admin)
																</button>
															</li>
														</ul>
													)
												)}
					  

												<h1 className="m-1 text-xl text-center border-b border-gray-300  bg-slate-800  p-2 cursor-pointer ">Student Users:</h1>
												{filterUsers(apiData.flatMap((data) => data.studentUsers))
					 								.map((student) => (
														<ul className="border-b list-none border-gray-300 bg-slate-800  p-2 cursor-pointer " key={student.id}>
															<li>
																<button type="button" className="m-1" key={student.id} onClick={() => handleUserClick(student)}>
																	{student.firstName} {student.lastName} (Student)
																</button>
															</li>
														</ul>
					  	   							)
												)}
											</div>
										)
									)}
								</div>
							</div>
						</div>

						<div className="mt-5">
  							<label htmlFor="isbn" className="block mb-2 text-lg font-medium text-gray-900 text-center">ISBN</label>
							<input type="text" id="isbn" value={isbn} onChange={handleISBNChange} className="input bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
						</div> 
						
						<div className="mt-10 justify-center flex">
							<button type="button"className="btn block   m-3  dark:bg-gray-700  btn-active btn-neutral">Laon</button>
						</div>
					</form>
				</div>

                {/* BookImg */}
				{/* <div className="ml-20">
					{data2 && data2.books.length > 0 && (
   						<div className="w-[15rem] h-[20rem] border">
    					  <img src={data2.books[31].bookImg} alt="book cover" className="w-[15rem] h-[20rem]" />
    					  <h1 className="text-center mt-5 text-xl">{data2.books[31].title}</h1>
   						</div>
 					)} 
				</div> */}
				<div className="ml-20">
 					{selectedBook && (
  						<div className="w-[15rem] h-[20rem] border">
    					  <Image src={selectedBook.bookImg} alt="book cover" className="w-[15rem] h-[20rem]" />
     					  <h1 className="text-center mt-5 text-xl">{selectedBook.title}</h1>
   						</div>
  					)}
				</div>
			</div>
		</main>
	);
}
