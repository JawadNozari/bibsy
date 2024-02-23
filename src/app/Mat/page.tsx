"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";

type foodUser = {
	firstName: string;
	lastName: string;
	usertype: string;
	name?: string;
};

export default function Page() {
	let numberOfUsers = 0;

	const [currentLunch, setCurrentLunch] = useState<string | null>(null);
	const [currentVegetarian, setCurrentVegetarian] = useState<string | null>(
		null,
	);
	const [currentTimeFormatted, setCurrentTimeFormatted] =
		useState<string>("00:00");

	const [students, setStudents] = React.useState<foodUser[]>([]);
	const [teachers, setTeachers] = React.useState<foodUser[]>([]);

	useEffect(() => {
		const fetchData = async () => {
			//! FETCHES TEMPORARY DATA, REPLACE WITH REAL API WHEN PRODUCTION
			await axios
				.get("http://localhost:3000/api/matsal")
				.then((res) => {
					setCurrentLunch(res.data.weeks[0].days[0].items[0]);
					setCurrentVegetarian(res.data.weeks[0].days[0].items[1]);
				})
				.catch((err) => {
					throw err;
				});
			//! ONLY ADD THIS WHEN USING THE REAL API, VERY LIMITED CODE
			/* const schoolId = "282367002";
			const TokenId = "o8vh8h52vyvhebxiwxoz";
			const clientVersion = "uwy42qerkv7s1bl4eysb";
			// Get the current day of the week (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
			const currentDayOfWeek = new Date().getDay();
			// Map the current day of the week to the index in the days array
			const dayIndex =
				currentDayOfWeek >= 1 && currentDayOfWeek <= 5
					? currentDayOfWeek - 1
					: 0;
			axios
				.get(
					`https://skolmaten.se/api/3/menu/?school=${schoolId}&client=${TokenId}&clientVersion=${clientVersion}`,
				)
				.then((res) => {
					setCurrentLunch(res.data.weeks[0].days[dayIndex].items[0]);
					setCurrentVegetarian(res.data.weeks[0].days[dayIndex].items[1]);
				})
				.catch((err) => {
					throw err;
				}); */
		};
		fetchData();

		//* Checks if the localstorage is empty and if it is then it sets the localstorage to an empty array
		if (localStorage.getItem("teacher") === null) {
			localStorage.setItem("teacher", JSON.stringify([]));
		} else if (localStorage.getItem("teacher") !== null) {
			setTeachers(JSON.parse(localStorage.getItem("teacher") || ""));
		}
		if (localStorage.getItem("student") === null) {
			localStorage.setItem("student", JSON.stringify([]));
		} else if (localStorage.getItem("student") !== null) {
			setStudents(JSON.parse(localStorage.getItem("student") || ""));
		}
	}, []);

	//* Updates the time, students and teachers every second and clears the localstorage at 23:50 every day
	useEffect(() => {
		setInterval(() => {
			const rightNow = new Date();
			if (
				(rightNow.getHours() > 13 && rightNow.getMinutes() > 55) ||
				(rightNow.getHours() < 11 && rightNow.getMinutes() > 55)
			) {
				localStorage.setItem("student", JSON.stringify([]));
				localStorage.setItem("teacher", JSON.stringify([]));
				setStudents([]);
				setTeachers([]);
			}
			const timeString = rightNow.toLocaleTimeString("sv-SE", {
				hour: "2-digit",
				minute: "2-digit",
			});

			if (localStorage.getItem("student") !== "[]") {
				setStudents(JSON.parse(localStorage.getItem("student")));
			}
			if (localStorage.getItem("teacher") !== "[]") {
				setTeachers(JSON.parse(localStorage.getItem("teacher")));
			}
			setCurrentTimeFormatted(timeString);
		}, 1000);
	}, []);

	//* Handles the input and sends the data to the server
	const handleChange = async (thing: string) => {
		await axios
			.post("/api/specifiedUser", { qrCode: thing })
			.then(async (res) => {
				const theUser: foodUser = {
					firstName: res.data.userdata.firstName,
					lastName: res.data.userdata.lastName,
					usertype: res.data.userType,
				};
				if (res.data.userType === "student") {
					setStudents([]);
					const currentStudents = students;
					currentStudents.unshift(theUser);
					setStudents(currentStudents);
					localStorage.setItem("student", JSON.stringify(currentStudents));
				} else if (res.data.userType === "staff") {
					setTeachers([]);
					const currentTeachers = teachers;
					currentTeachers.unshift(theUser);
					setTeachers(currentTeachers);
					localStorage.setItem("teacher", JSON.stringify(currentTeachers));
				}

				axios.post("/api/getFoodHistory", theUser).catch((err) => {
					console.debug(err);
				});
				numberOfUsers++;
			})
			.catch((err) => {
				console.debug(err);
			});
	};

	//* Handles the enter key press when the input is focused and sends the data another function (handleChange)
	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter") {
			handleChange(e.currentTarget.value);
			e.currentTarget.value = "";
		}
	};

	//* Makes the page reload when the page is focused because auto focus was the only working fix
	const setFocused = () => {
		window.location.reload();
	};

	return (
		<div>
			<input
				// biome-ignore lint/a11y/noAutofocus: <explanation>
				autoFocus={true}
				type="text"
				onKeyDown={handleKeyDown}
				className="bg-indigo-100 absolute outline-none text-indigo-100"
				onBlur={() => setFocused()}
			/>
			<div className="flex items-center gap-10 grid-cols-2 place-content-center w-screen h-screen bg-indigo-100">
				<div className="flex flex-col rounded-lg shadow-lg h-3/4 bg-white text-violet-500 w-1/3 place-content-center ">
					<div className="flex flex-col  items-center h-1/4 gap-10 pt-8">
						<h1 className="text-4xl">{currentTimeFormatted}</h1>
						<h2 className="text-3xl">Today's Lunch</h2>
					</div>
					<div className="flex place-content-center items-center h-1/2 mt-10">
						<div className="flex flex-col w-5/6 text-justfiy place-content-center">
							<h3 className="mb-2 text-2xl">Main dish</h3>
							<p className="text-black mb-4">{currentLunch}</p>
							<h3 className="mb-2 text-2xl">Vegetarian dish</h3>
							<p className="text-black">{currentVegetarian}</p>
						</div>
					</div>

					<div className="flex flex-row place-content-center items-end h-1/4 gap-2 pb-6">
						<Image
							className="w-8"
							src="/icons/timer.png"
							alt="timer icon"
							width={20}
							height={20}
						/>
						<h4 className="text-xl">{"Opens: 11:00 | Closes: 13:00"}</h4>
					</div>
				</div>
				<div className="flex flex-col rounded-lg shadow-lg h-3/4 bg-white text-violet-500 w-3/5 items-center overflow-hidden">
					<div className="flex flex-col items-center h-1/4 gap-10 pt-8 ">
						<Image
							className="w-1/2"
							src="/icons/nti_logo.png"
							alt="Nti gymnasiet logo"
							width={200}
							height={200}
						/>
						<h2 className="text-3xl -mt-1">Last Check In</h2>
					</div>
					<div className="flex justify-around w-4/5 grid-cols-2 mt-10 h-2/4 place-content-center">
						<div className="">
							<h3 className="text-2xl">Students</h3>
							{students
								? students.map((student) => {
										numberOfUsers++;
										return (
											<p
												key={
													student.firstName + student.lastName + numberOfUsers
												}
											>
												{`${student.firstName} ${student.lastName}`}
											</p>
										);
								  })
								: ""}
						</div>
						<div className="">
							<h3 className="text-2xl">Teachers</h3>
							{teachers
								? teachers.map((teacher) => {
										numberOfUsers++;
										return (
											<p
												key={
													teacher.firstName + teacher.lastName + numberOfUsers
												}
											>
												{`${teacher.firstName} ${teacher.lastName}`}
											</p>
										);
								  })
								: ""}
						</div>
					</div>
					<div className="flex flex-row h-1/4 text-xl gap-2 items-end pb-6">
						<Image
							className="w-8"
							src="/icons/checkmark.png"
							alt="checkmark icon"
							width={20}
							height={20}
						/>
						<b>{numberOfUsers}</b>
						<p>People checked in so far</p>
					</div>
				</div>
			</div>
		</div>
	);
}
