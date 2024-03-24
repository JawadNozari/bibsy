"use client";

import { useForm } from "react-hook-form";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import GoogleSignInButton from "./GoogleSignInButton";
import { signIn } from "next-auth/react";
const FormSchema = z.object({
	email: z.string().min(1, "Email is required").email("Invalid email"),
	password: z
		.string()
		.min(1, "Password is required")
		.min(8, "Password must be at least 8 characters long"),
	
});

const SignInForm = () => {
	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const onSubmit = async (
		values: z.infer<typeof FormSchema>,
		event: React.BaseSyntheticEvent,
	) => {
		event.preventDefault();
		
		await signIn("credentials", {
			email: values.email,
			password: values.password,
		})
			.then((res) => {
				console.log("res", res);
			})
			.catch((err) => {
				console.log("err", err);
			});
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
				<div className="space-y-6">
					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem>
								<FormLabel className="text-lg">Email</FormLabel>
								<FormControl>
									<Input placeholder="mail@example.com" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="password"
						render={({ field }) => (
							<FormItem>
								<FormLabel className="text-lg">Password</FormLabel>
								<FormControl>
									<Input
										type="password"
										placeholder="Enter your password"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
				<Button className="w-full mt-6" type="submit">
					Sign in
				</Button>
			</form>
			<div className="mx-auto my-4 flex w-full items-center justify-evenly before:mr-4 before:block before:h-px before:flex-grow before:bg-stone-400 after:ml-4 after:block after:h-px after:flex-grow after:bg-stone-400">
				or
			</div>
			<div className="flex justify-center items-center">
				<GoogleSignInButton />
			</div>

			<p className="text-center text-sm text-gray-600 mt-2">
				If you don&apos;t have an account, please&nbsp;
				<Link className="text-blue-500 hover:underline" href="/sign-up">
					Contact Admin
				</Link>
			</p>
		</Form>
	);
};

export default SignInForm;
