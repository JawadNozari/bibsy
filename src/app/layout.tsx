import "./globals.css";

export const metadata = {
	title: "Bibsy",
	description: "TE4",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" className="Oxygen">
			<body>{children}</body>
		</html>
	);
}
