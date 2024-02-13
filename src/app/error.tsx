"use client";

import { useEffect } from "react";
import Link from "next/link";
// biome-ignore lint/suspicious/noShadowRestrictedNames: <explanation>
export default function Error({
	error,

	// eslint-disable-next-line no-unused-vars
	reset,
}: {
	//suggestion: Try to show the actual error message to the user
	error: Error & { digest?: string };
	reset: () => void;
}) {
	useEffect(() => {
		// Optionally log the error to an error reporting service
		console.error(error);
	}, [error]);

	return (
		//! this can be called if a page OR a component is not working as expected
		<main className="flex h-screen w-screen flex-col items-center justify-center">
			<span className="text-8xl pb-6">😵</span>
			<h1> Looks like some bugs found there way to our code</h1>
			<h2>
				Our team is working on it. Please contact our support team for more
				information.
			</h2>
			<h2>Something went wrong!!!</h2>

			<Link
				href="/"
				className="mt-4 rounded-full bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-400"
			>
				Home page
			</Link>
		</main>
	);
}
