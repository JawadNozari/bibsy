"use client";

import React from "react";

export default function page() {
  return (
		// <div className="group flex justify-between items-start flex-col h-[100dvh] bg-violet-950 w-16 transition-all ease-in-out duration-200 pl-1 hover:w-64">
		// 	<div className="flex justify-start items-center flex-col h-full w-14 gap-8 mt-6">
		// 		<div className="flex flex-row items-center gap-10 w-10 rounded-3xl transition-all duration-300 hover:bg-slate-900 hover:bg-opacity-40 hover:pl-3 group-hover:w-[240px] group-hover:ml-[200px]">
		// 			<img
		// 				className="rounded-full w-10"
		// 				src="Navbar_img/pfp.jpg"
		// 				alt="profile pictue"
		// 			/>
		// 			<p className="text-lg transition !duration-150 ease-in-out hidden group-hover:block">
		// 				Profile
		// 			</p>
		// 		</div>
		// 		<span className="w-8 h-4 border border-t-2 border-l-0 border-r-0 border-b-0 rounded-sm transistion-all duration-200 group-hover:w-[220px] group-hover:ml-[188px]">
		// 			{""}
		// 		</span>
		// 		<div className="flex flex-row items-center gap-10 w-10 ml-1 rounded-3xl transition-all duration-300 hover:bg-slate-900 hover:bg-opacity-40 hover:pl-3 group-hover:w-[240px] group-hover:ml-[204px] focus:bg-slate-600">
		// 			<img
		// 				className="w-9"
		// 				src="Navbar_img/table.png"
		// 				alt="Dashboard icon"
		// 			/>
		// 			<p className="text-lg transition-all !duration-150 ease-in-out hidden group-hover:block">
		// 				Dashboard
		// 			</p>
		// 		</div>
		// 		<div className="flex flex-row items-center gap-10 w-10 ml-1 rounded-3xl transition-all duration-300 hover:bg-slate-900 hover:bg-opacity-40 hover:pl-3 group-hover:w-[240px] group-hover:ml-[204px]">
		// 			<img className="w-9" src="Navbar_img/People.png" alt="Members icon" />
		// 			<p className="text-lg transition-all !duration-150 ease-in-out hidden group-hover:block">
		// 				Members
		// 			</p>
		// 		</div>
		// 		<div className="flex flex-row items-center gap-10 w-10 rounded-3xl transition-all duration-300 hover:bg-slate-900 hover:bg-opacity-40 hover:pl-3 group-hover:w-[240px] group-hover:ml-[200px]">
		// 			<img className="w-10" src="Navbar_img/Book.png" alt="Books icon" />
		// 			<p className="text-lg transition-all !duration-150 ease-in-out hidden group-hover:block">
		// 				Books
		// 			</p>
		// 		</div>
		// 		<div className="flex flex-row items-center gap-10 w-10 rounded-3xl transition-all duration-300 hover:bg-slate-900 hover:bg-opacity-40 hover:pl-3 group-hover:w-[240px] group-hover:ml-[200px]">
		// 			<img
		// 				className="w-10"
		// 				src="Navbar_img/BoxImportant.png"
		// 				alt="Not Returned icon"
		// 			/>
		// 			<p className="text-lg transition-all !duration-150 ease-in-out whitespace-nowrap hidden group-hover:block">
		// 				Not Returned
		// 			</p>
		// 		</div>
		// 		<div className="flex flex-row items-center gap-10 w-10 rounded-3xl transition-all duration-300 hover:bg-slate-900 hover:bg-opacity-40 hover:pl-3 group-hover:w-[240px] group-hover:ml-[200px]">
		// 			<img
		// 				className="w-10"
		// 				src="Navbar_img/ReturnBook.png"
		// 				alt="Returned icon"
		// 			/>
		// 			<p className="text-lg transition-all !duration-150 ease-in-out hidden group-hover:block">
		// 				Returned
		// 			</p>
		// 		</div>
		// 		<div className="flex flex-row items-center gap-10 w-10 rounded-3xl transition-all duration-300 hover:bg-slate-900 hover:bg-opacity-40 hover:pl-3 group-hover:w-[240px] group-hover:ml-[200px]">
		// 			<img
		// 				className="w-10"
		// 				src="Navbar_img/DeliveryTime.png"
		// 				alt="Time remaining to return book icon"
		// 			/>
		// 			<p className="text-lg transition-all !duration-150 ease-in-out whitespace-nowrap hidden group-hover:block">
		// 				Remaining Time
		// 			</p>
		// 		</div>
		// 	</div>
		// 	<div className="flex justify-end flex-col h-full w-14 gap-8 items-center mb-6">
		// 		<div className="flex flex-row items-center gap-10 w-10 rounded-3xl transition-all duration-300 hover:bg-slate-900 hover:bg-opacity-40 hover:pl-3 group-hover:w-[240px] group-hover:ml-[200px]">
		// 			<img
		// 				className="w-10"
		// 				src="Navbar_img/LogoutRoundedLeft.png"
		// 				alt="Logout icon"
		// 			/>
		// 			<p className="text-lg transition-all !duration-150 ease-in-out hidden group-hover:block">
		// 				Logout
		// 			</p>
		// 		</div>
		// 	</div>
		// </div>

		<label className="btn btn-circle swap swap-rotate">
			{/* this hidden checkbox controls the state */}
			<input type="checkbox" />
			{/* hamburger icon */}
			<svg
				className="swap-off fill-current"
				xmlns="http://www.w3.org/2000/svg"
				width="32"
				height="32"
				viewBox="0 0 512 512"
			>
			<title>Menu Icon</title>
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
			<title>Menu Icon Close</title>
				<polygon points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49" />
			</svg>
		</label>
  );
}
