import "./globals.css";
import Navigation from "./components/navigation";

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
			<body className="flex">
				<div>
					<Navigation />
				</div>
				{children}
			</body>
		</html>
	);
}
