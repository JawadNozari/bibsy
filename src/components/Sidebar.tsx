/* eslint-disable no-unused-vars */
"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuIndicator,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
	NavigationMenuViewport,
	navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import MenuItems from "./MenuItems";
import React from "react";

import { ModeToggle } from "@/components/ThemeToggle";
import { Command, Home, Users, Package, Settings, School } from "lucide-react";

export default function Sidebar() {
	const { data: session } = useSession();
	
	if (!session) {
		return <></>;
	}
	return (
		<aside
			id="sidebar"
			className="relative left-0 top-0 z-40 h-screen w-64 transition-transform text-nowrap"
			aria-label="Sidebar"
		>
			<div className="flex h-full flex-col overflow-y-auto border-r border-slate-200 bg-white px-3 py-4 dark:border-slate-700 dark:bg-slate-900">
				<div className="flex justify-between items-center py-3 px-3 space-x-5">
					<a
						href="https://ntigymnasiet.se"
						className="flex items-center rounded-lg  text-slate-900 dark:text-white"
					>
						<School />
						<span className="ml-3 text-base font-semibold">NTI Gymnasiet</span>
					</a>
					<ModeToggle />
				</div>
				<span className="border-t border-white" />
				<div className=" flex flex-col space-y-2 mt-4 dark:bg-sky-950 bg-sky-100 p-2 rounded-full">
					{session && (
						<div>
							<div className="flex justify-start items-center space-x-4">
								{session?.user?.image && (
									<Avatar>
										<AvatarImage
											src={session.user.image}
											alt="profile picture"
											width={320}
											height={320}
										/>
										<AvatarFallback>
											{session.user.name === null
												? session?.user?.name.split(" ").map((n) => n[0])
												: ""}
										</AvatarFallback>
									</Avatar>
								)}
								<span className="text-nowrap">{session?.user?.name}</span>
							</div>
						</div>
					)}
				</div>
				<ul className="space-y-2 text-sm font-medium mt-6">
					{MenuItems.sidebarNav.map((item, index) => (
						// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
						<li key={index}>
							<a
								href={item.href}
								className="flex items-center rounded-lg px-3 py-2 text-slate-900 hover:bg-slate-100 dark:text-white dark:hover:bg-slate-700"
							>
								{item.icon}
								<span className="ml-3 flex-1 whitespace-nowrap">
									{item.title}
								</span>
							</a>
						</li>
					))}
				</ul>
				<div className="flex h-full w-full justify-center items-end">
					<Button variant="destructive" onClick={() => signOut()}>
						Sign out
					</Button>
				</div>
			</div>
		</aside>
	);
}

// <div className="flex flex-col w-64 h-screen bg-gray-800 text-white">
// 	<div className="flex items-center pl-4 justify-start h-14 border-b border-gray-700">
// 		{session && (
// 			<div>
// 				<div className="flex items-center space-x-4">
// 					{session?.user?.image && (
// 						<Avatar>
// 							<AvatarImage
// 								src={session.user.image}
// 								alt="profile picture"
// 								width={320}
// 								height={320}
// 							/>
// 							<AvatarFallback>
// 								{session?.user?.name.split(" ").map((n) => n[0])}
// 							</AvatarFallback>
// 						</Avatar>
// 					)}
// 					<span className="text-nowrap">{session.user.name}</span>
// 				</div>
// 			</div>
// 		)}
// 	</div>
// 	<div className="flex flex-col items-center justify-center h-full">
// 		<NavigationMenu>
// 			<NavigationMenuList className="flex flex-col space-y-4 items-start">
// 				<NavigationMenuItem>Sidebar content</NavigationMenuItem>
// 			</NavigationMenuList>
// 		</NavigationMenu>
// 	</div>

// 	<div className="pb-4 justify-center flex">
// 		{session ? (
// 			<Button variant="destructive" onClick={() => signOut()}>
// 				Sign out
// 			</Button>
// 		) : (
// 			<Button onClick={() => signIn()}>Sign in</Button>
// 		)}
// 	</div>

// 	<div className="flex items-center justify-center h-14 border-t-2 border-gray-700">
// 		<ModeToggle />
// 	</div>
// </div>
