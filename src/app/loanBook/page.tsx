//! FIX UNUSED VARS
/* eslint-disable no-unused-vars */
"use client";
import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import axios from "axios";

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




export default function Home() {
    const [apiData, setApiData] = useState<ApiResponse[]>([]);
	const [data2, setData2] = useState<BookApiResponse | null>(null);
    const [isLoading, setIsLoading] = useState(true); 
	const [searchQuery, setSearchQuery] = useState(""); // Add search query state
	const [showList, setShowList] = useState(false); // List hidden by default
	const [selectedUser, setSelectedUser] = useState<User | null>(null); // Add selected user state
	const userClickedRef = useRef(false); // Add this ref
	const [invNr, setinvNr] = useState("");
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

	return (
		<main className="flex min-h-screen flex-col items-center justify-between p-24">
			<p>Next.js</p>
			{apiData.map((data, index) => (
				// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
				<div key={index}>
					<p>Staff Users:</p>
					{data.staffUsers.map((staff) => (
						<p key={staff.id}>{staff.firstName}</p>
					))}

					<p>Students Users:</p>
					{data.studentUsers.map((student) => (
						<p key={student.id}>{student.firstName}</p>
					))}
				</div>
			))}
		</main>
	);
}
