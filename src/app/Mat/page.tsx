"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Page() {
	const [currentLunch, setCurrentLunch] = useState<string | null>(null);
	const [currentVegetarian, setCurrentVegetarian] = useState<string | null>(
		null,
	);
	const [closingTime, setClosingTime] = useState<Date | null>(null);
	const [currentTime, setCurrentTime] = useState<string>("");
	const [lunchTime, setLunchTime] = useState<string | null>(null);
	const [closingIn, setClosingIn] = useState<string | JSX.Element>(
		"Currently closed",
	);

	useEffect(() => {
		axios
			.get("http://localhost:3000/api/matsal")
			.then((res) => {
				console.log(res.data.weeks[0]);
				setCurrentLunch(res.data.weeks[0].days[0].items[0]);
				setCurrentVegetarian(res.data.weeks[0].days[0].items[1]);
			})
			.catch((err) => {
				console.log("error", err.code);
			});

		// Set closing time to 13:00 for today
		const today = new Date();
		const closingTimeToday = new Date(today);
		const openingTimeToday = new Date(today);
		closingTimeToday.setHours(13, 0, 0, 0);
		openingTimeToday.setHours(11, 0, 0, 0);

		if (today.getHours() >= 11 && today.getHours() < 13) {
			setClosingTime(closingTimeToday);
		} else {
			setClosingIn("Currently closed");
		}

		// Start interval to update current time
		const interval = setInterval(() => {
			const date = new Date();
			const timeString = date.toLocaleTimeString("sv-SE", {
				hour: "2-digit",
				minute: "2-digit",
			});
			setCurrentTime(timeString);
		}, 1000);

		// Clear interval on component unmount
		return () => clearInterval(interval);
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
		}, 1000);

		return () => clearInterval(interval);
	}, [closingTime]);

	return (
		<div>
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
						<img className="w-8" src="./icons/timer.png" alt="timer icon" />
						<h4 className="text-xl">Closing in:</h4>
						<h3 className="text-xl">{closingIn}</h3>
					</div>
				</div>
				<div className="flex flex-col rounded-lg shadow-lg h-3/4 bg-white text-violet-500 w-3/5 items-center">
					<div className="flex flex-col items-center h-1/4 gap-10 pt-8 ">
						<img
							className="w-1/2"
							src="./icons/nti_logo.png"
							alt="Nti gymnasiet logo"
						/>
						<h2 className="text-3xl -mt-1">Last Check In</h2>
					</div>
					<div className="flex gap-[200%] grid-cols-2 mt-10 h-2/4 place-content-center">
						<div>
							<h3 className="text-2xl">Students</h3>
						</div>
						<div>
							<h3 className="text-2xl">Teachers</h3>
						</div>
					</div>
					<div className="flex flex-row h-1/4 text-xl gap-2 items-end pb-6">
						<img
							className="w-8"
							src="./icons/checkmark.png"
							alt="checkmark icon"
						/>
						<b>(Number)</b>
						<p>People checked in so far</p>
					</div>
				</div>
			</div>
		</div>
	);
}
