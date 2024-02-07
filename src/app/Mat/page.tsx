"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Page() {
	const [currentLunch, setCurrentLunch] = useState(null);
	const [currentVegetarian, setCurrentVegetarian] = useState(null);

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
	}, []);
	return (
		<div>
			<div className="flex items-center gap-10 grid-cols-2 place-content-center w-screen h-screen bg-indigo-100">
				<div className="flex flex-col rounded shadow-lg h-3/4 bg-white text-violet-500 w-1/3 place-content-center ">
					<div className="flex flex-col  items-center h-1/4 gap-10 pt-8">
						<h1 className="text-4xl">Time</h1>
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

					<div className="flex flex-row place-content-center items-end h-1/4 gap-2 pb-8">
						<p>Icon img här</p>
						<h4 className="text-xl">Closing in:</h4>
						<h3 className="text-xl">Tid här</h3>
					</div>
				</div>
				<div className="flex flex-col rounded shadow-lg h-3/4 bg-white text-black w-3/5 place-content-center items-center">
					<div>
						<h1>Hello 2</h1>
					</div>
					<div>
						<h2>Last Check In</h2>
					</div>
					<div className="flex items-center gap-10 grid-cols-2 place-content-center">
						<div className="mr-10">
							<h3>Students</h3>
						</div>
						<div className="ml-10">
							<h3>Teachers</h3>
						</div>
					</div>
					<div>test</div>
				</div>
			</div>
		</div>
	);
}
