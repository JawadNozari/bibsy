import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { getServerSession } from "next-auth";
import SessionProvider from "../components/SessionProvider";

import Sidebar from "../components/Sidebar";
export default async function RootLayout({
	children,
}: { children: React.ReactNode }) {
	const session = await getServerSession();
	return (
		<>
			<html lang="en" suppressHydrationWarning>
				<head />
				<body>
					<ThemeProvider
						attribute="class"
						defaultTheme="system"
						enableSystem
						disableTransitionOnChange
					>
						<SessionProvider session={session}>
							<div className="flex flex-col h-screen w-screen">
								<div className="flex h-full w-full">
									{/* <Navigation /> */}
									<Sidebar />
									{children}
								</div>
							</div>
						</SessionProvider>
					</ThemeProvider>
				</body>
			</html>
		</>
	);
}
