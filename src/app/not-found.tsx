import Link from "next/link";

export default function NotFound() {
	return (
		<main className="flex h-screen w-screen flex-col items-center justify-center gap-2">
			<span className="text-8xl">🫣</span>
			<h2 className="text-2xl font-bold text-red-600">❌ 404 Not Found </h2>
			<p>Oops. Looks like you are lost.</p>
			<p>We couldn't find the page you were looking for.</p>
			<p>Let's get you back home page.</p>
			<Link
				href="/"
				className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-400"
			>
				Go Back
			</Link>
		</main>
	);
}
