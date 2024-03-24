import * as React from "react";
import { getServerSession } from "next-auth";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Footer } from "../components/footer";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function Home() {
	"use server";
	const session = await getServerSession();
	return (
		<>
			<div className="flex flex-col w-full">
				<div className="flex flex-col h-full w-full items-center justify-center">
					<div className="   text-center">
						{session ? (
							<Alert variant="default">
								<AlertTitle>Authenticated</AlertTitle>
								<AlertDescription>
									You are authenticated as {session.user.name}
								</AlertDescription>
							</Alert>
						) : (
							<>
								<Alert variant="destructive">
									<AlertTitle>Not Authenticated</AlertTitle>
									<AlertDescription>
										Unathorized user will not be able to see this page
									</AlertDescription>
								</Alert>
								<Button className="mt-4">
									<Link href="/auth/signIn">Sign in</Link>
								</Button>
							</>
						)}
					</div>
				</div>

				<Footer />
			</div>
		</>
	);
}
