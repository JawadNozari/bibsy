"use client"; // Använder klientens syntax (Next.js)

import React, { useEffect, useState } from "react"; // Importera nödvändiga React-komponenter
import Image from "next/image"; // Importera Image-komponenten från Next.js för att hantera bilder
import "../globals.css"; // Importera globala CSS-stilar

// Skapa typer för användarobjekt och API-svar
interface User {
	id: number;
	password: string;
	firstName: string;
	lastName: string;
	email: string;
	phone: string;
	image: string;
	class: string;
	qrCode: number;
}

interface ApiResponse {
	staffUsers: User[];
	studentUsers: User[];
}

// Skapa funktionen som representerar startsidan
export default function Home() {
	// Tillståndsvariabler för att hantera API-data, vald användare och sökterm
	const [apiData, setApiData] = useState<ApiResponse | null>(null);
	const [searchTerm, setSearchTerm] = useState<string>("");

	// Effekt som hämtar data från API:et vid montering av komponenten
	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch("/api/getUsers"); // Hämta användaruppgifter från API:et
				const data: ApiResponse = await response.json(); // Konvertera svaret till JSON-format
				setApiData(data); // Uppdatera API-data-variabeln med den hämtade datan
				console.log(response); // Logga svaret från API:et
			} catch (error) {
				console.error(error); // Logga eventuella fel som uppstår vid hämtning av data
			}
		};

		fetchData(); // Anropa funktionen för att hämta data vid montering
	}, []); // Tom array som andra argument för att köra effekten bara vid montering

	// Funktion för att hantera ändringar i söktermen
	const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(event.target.value); // Uppdatera söktermen vid ändringar i input-fältet
	};

	// Funktion för att rendera användarlistan med filtrering baserat på söktermen
	const renderUsers = (users: User[] | undefined) => {
		const filteredUsers = users?.filter((user) => {
			const fullName = `${user.firstName} ${user.lastName}`;
			return fullName.toLowerCase().includes(searchTerm.toLowerCase());
		});

		return filteredUsers?.map((user) => (
			// biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
<tr
				key={user.id}
				className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
			>
				<th
					scope="row"
					className="flex items-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
				>
					<Image
						className="w-10 h-10 rounded-full"
						width={200}
						height={200}
						src={`/images/${user.image}`} // Uppdaterad sökväg för användarens bild
						alt={`${user.firstName} ${user.lastName}`} // Inkludera null-koll för användarnamn
					/>
					<div className="ps-3">
						<div className="text-base font-semibold">{`${user.firstName} ${user.lastName}`}</div>
						<div className="font-normal text-gray-500">{user.email}</div>
					</div>
				</th>
				<td className="px-6 py-4">{user.phone}</td>
				<td className="px-6 py-4">
					<div className="flex items-center">
						<div className="h-4 w-0.5">{user.class}</div>
					</div>
				</td>
				<td className="px-6 py-4">{user.phone}</td>
			</tr>
		));
	};

	// Returnera JSX-koden för startsidan
	return (
		<main className="flex border items-center h-screen justify-around p-4">
			{/* Detaljkort för den valda användaren */}
			<div className="flex border items-center justify-center max-w-xs">
				<div className="max-h-screen items-center flex-col justify-center h-5/6 w-96 bg-white shadow-xl rounded-lg py-3">
					<Image
						className="w-10 h-10 rounded-full"
						width={200}
						height={200}
						src={`/images/${selectedUser?.image}`} // Uppdaterad sökväg för användarens bild
						alt={`${selectedUser?.firstName} ${selectedUser?.lastName}`} // Inkludera null-koll för användarnamn
					/>
					<div className="p-2">
						<h3 className="text-center text-4xl text-gray-900 font-medium leading-8">
							{selectedUser?.firstName} {selectedUser?.lastName}
						</h3>
						<div className="text-center text-gray-400 text-xs font-semibold">
							<p>Web Developer</p>
						</div>
						<table className="text-1xl my-3">
							<tbody>
								<tr>
									<td className="px-4 py-4 text-gray-500 font-semibold">
										Email
									</td>
									<td className="px-4 py-4">{selectedUser?.email}</td>
								</tr>
								<tr>
									<td className="px-4 py-4 text-gray-500 font-semibold">
										Phone
									</td>
									<td className="px-4 py-4">{selectedUser?.phone}</td>
								</tr>
								<tr>
									<td className="px-4 py-4 text-gray-500 font-semibold">
										Class
									</td>
									<td className="px-4 py-4">{selectedUser?.class}</td>
								</tr>
							</tbody>
						</table>

						<div className="text-center my-3">
							<a
								className="text-xs text-indigo-500 italic hover:underline hover:text-indigo-600 font-medium"
								href="/"
							>
								View Profile
							</a>
						</div>
					</div>
				</div>
			</div>

			{/* Användarlistan med sökfunktion */}
			<div className="flex flex-col overflow-y-auto max-h-screen w-2/3 h-3/4 shadow-md sm:rounded-lg">
				<div className="flex flex-col items-center justify-between flex-wrap md:flex-row space-y-4 md:space-y-0 pb-4 bg-white dark:bg-gray-900">
					<div>
						<h2 className="text-3xl normal font-bold px-4 py-2">
							Loaned Books
						</h2>
					</div>
					<label htmlFor="table-search" className="sr-only">
						Search
					</label>
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
							type="text"
							id="table-search-users"
							className="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
							placeholder="Search for users"
							value={searchTerm}
							onChange={handleSearchChange}
						/>
					</div>
					<table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
						<thead className="text-xs sticky top-[60px] text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
							<tr>
								<th scope="col" className="px-6 py-3">
									Book
								</th>
								<th scope="col" className="px-6 py-3">
									Author
								</th>
								<th scope="col" className="px-6 py-3">
									Registered Date
								</th>
								<th scope="col" className="px-6 py-3">
									Status
								</th>
							</tr>
						</thead>
						<tbody>
							{apiData && (
								<>
									<tr>
										<th colSpan={4} className="text-lg font-bold px-6 py-4">
											Staff Users:
										</th>
									</tr>
									{renderUsers(apiData.staffUsers)}

									<tr>
										<th colSpan={4} className="text-lg font-bold px-6 py-4">
											Student Users:
										</th>
									</tr>
									{renderUsers(apiData.studentUsers)}
								</>
							)}
						</tbody>
					</table>
				</div>
			</div>
		</main>
	);
}
