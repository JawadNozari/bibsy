"use client";
import SignInForm from "./components/form/SignInForm";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
export default function SignIn() {
	const { data: session } = useSession();
	return (
		<>
			{
				/* If user is already authenticated, redirect to home page */
				session ? (
					redirect("/")
				) : (
					<div className="flex flex-col h-full w-full justify-center items-center ">
						<div className="border dakr:border-white p-12 rounded-3xl">
							<SignInForm />
						</div>
					</div>
				)
			}
		</>
	);
}
