"use client";
import "./globals.css";
import Navigation from "./components/navigation";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
// export const metadata = {
// 	title: "Bibsy",
// 	description: "TE4",
// };

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
	}) {
	
	const [isLoading, setIsLoading] = useState(true);
	const router = usePathname();	
	useEffect(() => {
		const token = localStorage.getItem("token");
		if (token) {
			setIsLoading(false);
		} else {
			setIsLoading(true);
		}
	}, [router]);
	
	return (
		<html lang="en" className="Oxygen">
			<body className="flex">
				<div>
					{!isLoading && <Navigation />}
				</div>
				{children}
			</body>
		</html>
	);
}
