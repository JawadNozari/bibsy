"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";

type foodUser = {
	firstName: string;
	lastName: string;
	usertype: string;
	name?: string;
}

let i = 0;
let numberOfUsers = 0;

export default function Page() {
	const [currentLunch, setCurrentLunch] = useState<string | null>(null);
	const [currentVegetarian, setCurrentVegetarian] = useState<string | null>(
		null,
	);
	const [closingTime, setClosingTime] = useState<Date | null>(null);
	const [currentTime, setCurrentTime] = useState<string>("");

	// eslint-disable-next-line no-unused-vars
	const [lunchTime, setLunchTime] = useState<string | null>(null);
	const [closingIn, setClosingIn] = useState<string | JSX.Element>(
		"Currently closed",
	);

	const [students, setStudents] = React.useState<foodUser[]>([]);
	const [teachers, setTeachers] = React.useState<foodUser[]>([]);


	useEffect(() => {
		const fetchData = async () => {
			await axios
				.get("http://localhost:3000/api/matsal")
				.then((res) => {
					setCurrentLunch(res.data.weeks[0].days[0].items[0]);
					setCurrentVegetarian(res.data.weeks[0].days[0].items[1]);
				})
				.catch((err) => {
					throw err;
				});

			// Set closing time to 13:00 for today
			const close = 13;
			const open = 11;

			let today = new Date();
			let closingTimeToday = new Date(today);
			let openingTimeToday = new Date(today);

			closingTimeToday.setHours(close, 0, 0, 0);
			openingTimeToday.setHours(open, 1, 0, 0);

			const isOpen = () => {
				const rightNow = new Date();

				if (rightNow.getHours() >= 23 && rightNow.getMinutes() >= 59) {
					localStorage.removeItem("scannedStudents");
					localStorage.removeItem("scannedStaff");
				}

				if ((today.getHours() >= open && today.getHours() < close) || (rightNow.getHours() >= open && rightNow.getHours() < close)) {
					setClosingTime(closingTimeToday);
				} else {
					setClosingIn("Currently closed");
				}
			};
			isOpen();

			// Start interval to update current time
			const interval = setInterval(() => {
				today = new Date();
				closingTimeToday = new Date(today);
				openingTimeToday = new Date(today);

				closingTimeToday.setHours(close, 0, 0, 0);
				openingTimeToday.setHours(open, 1, 0, 0);

				const timeString = today.toLocaleTimeString("sv-SE", {
					hour: "2-digit",
					minute: "2-digit",
				});
				setCurrentTime(timeString);
				console.debug(timeString);
				isOpen();
			}, 1000);

			// Clear interval on component unmount
			return () => clearInterval(interval);
		};

		fetchData();
	}, []);


	useEffect(() => {
		const interval = setInterval(() => {
			const now = new Date();
			if (closingTime) {
				const timeRemaining = closingTime.getTime() - now.getTime();
				if (timeRemaining <= 0) {
					clearInterval(interval);
					// Lunchtime is over
					setClosingTime(null);
					setClosingIn("Currently closed");
				} else {
					const hours = Math.floor((timeRemaining / (1000 * 60 * 60)) % 24);
					const minutes = Math.floor((timeRemaining / 1000 / 60) % 60);
					setClosingIn(`${hours}h ${minutes}m`);
				}
			}
		}, 10);

		return () => clearInterval(interval);
	}, [closingTime]);


	const handleChange = async (thing: string) => {
		console.debug(thing);
		await axios
			.post("/api/specifiedUser", { qrCode: thing })
			.then((res) => {
				const theUser: foodUser = {
					firstName: res.data.userdata.firstName,
					lastName: res.data.userdata.lastName,
					usertype: res.data.userType,
				};
				console.debug(res.data.userType);
				axios.post("/api/getFoodHistory", theUser)
					.then((res) => {
						console.debug(res.data);
					})
					.catch((err) => {
						console.debug(err);
					});
				numberOfUsers++;
			})
			.catch((err) => {
				console.debug(err);
			});
	};

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter") {
			handleChange(e.currentTarget.value);
			e.currentTarget.value = "";
		}
	};

	//* Makes the page reload when the page is focused because auto focus was the only working fix
	const setFocused = () => {
		//window.location.reload();
	};

	return (
		<div>
			{/* biome-ignore lint/a11y/noAutofocus: <explanation> */}
			<input type="text" onKeyDown={handleKeyDown} autoFocus={true} className="bg-indigo-100 absolute outline-none text-indigo-100" onBlur={() => setFocused()} />
			<div className="flex items-center gap-10 grid-cols-2 place-content-center w-screen h-screen bg-indigo-100">
				<div className="flex flex-col rounded-lg shadow-lg h-3/4 bg-white text-violet-500 w-1/3 place-content-center ">
					<div className="flex flex-col  items-center h-1/4 gap-10 pt-8">
						<h1 className="text-4xl">{currentTime}</h1>
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
						<h4 className="text-xl">Closing in:</h4>
						<h3 className="text-xl">{closingIn}</h3>
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
					<div className="flex gap-[200%] grid-cols-2 mt-10 h-2/4 place-content-center">
						<div>
							<h3 className="text-2xl">Students</h3>
							{students.map((student) => {
								i++;
								return (
									<p key={student.name + i}>
										{student.name}
									</p>
								);
							})}
						</div>
						<div>
							<h3 className="text-2xl">Teachers</h3>
							{teachers.map((teacher) => {
								i++;
								return (
									<p key={teacher.name + i}>
										{teacher.name}
									</p>
								);
							})}
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
		</div >
	);
}
