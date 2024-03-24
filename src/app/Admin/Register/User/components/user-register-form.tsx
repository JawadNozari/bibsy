"use client";
//TODO: Add phone number and other missing fields to the form 
//TODO: Add option to make user admin, staff or student
import { Input } from "@/components/ui/input";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { type ChangeEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
const MAX_IMAGE_SIZE = 15728640; // 15MB
const ACCEPTED_IMAGE_TYPES = [
	"image/jpeg",
	"image/jpg",
	"image/png",
	"image/webp",
];

const FormSchema = z
	.object({
		firstName: z
			.string()
			.min(2, "firstName is too short.")
			.max(50, "firstName is too long."),
		lastName: z
			.string()
			.min(2, "lastName is too short.")
			.max(50, "lastName is too long."),
		email: z.string().min(1, "Email is required").email("Invalid email"),
		password: z
			.string()
			.min(1, "Password is required")
			.min(8, "Password must be at least 8 characters long"),
		confirmPassword: z
			.string()
			.min(1, "Password is required")
			.min(8, "Password must be at least 8 characters long"),
		image: z
			.any()
			.refine((file) => file?.size <= MAX_IMAGE_SIZE, "Max image size is 5MB.")
			.refine(
				(file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
				"Only .jpg, .jpeg, .png and .webp formats are supported.",
			),
	})
	.refine(
		(values) => {
			return values.password === values.confirmPassword;
		},
		{
			message: "Passwords must match!",
			path: ["confirmPassword"],
		},
	);

export function UserRegisterForm() {
	const [selectedImage, setSelectedImage] = useState(null);

	const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files[0];
		setSelectedImage(URL.createObjectURL(file));
	};

	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			firstName: "",
			lastName: "",
			email: "",
			password: "",
			confirmPassword: "",
			image: undefined,
		},
	});
	const onSubmit = async (
		values: z.infer<typeof FormSchema>,
		event: React.BaseSyntheticEvent,
	) => {
		event.preventDefault();
		try {
			FormSchema.parse(values);
			// Data is valid, proceed with form submission

			const formData = new FormData();
			formData.append("file", values.image);
			formData.append("path", "Users");
			const imagePathOnServer = await axios
				.post("/api/utils/uploader", formData, {
					headers: {
						"Content-Type": "multipart/form-data",
					},
				})
				.then((response) => {
					return response.data.path;
				})
				.catch((error) => {
					console.log(error);
				});
			const { firstName, lastName, email, password } = values;
			const user = {
				firstName,
				lastName,
				email,
				password,
				image: imagePathOnServer,
			};
			axios
				.post("/api/Register/User", user, {
					headers: {
						"Content-Type": "application/json",
					},
				})
				.then((response) => {
					console.log(response);
				})
				.catch((error) => {
					console.log(error);
				});
		} catch (error) {
			// Data is invalid, handle error
			console.error("Form validation error:", error);
		}
	};

	return (
		<>
			<div className="px-4 md:px-6 lg:px-8 py-6 space-y-6 border rounded-xl">
				<div className="space-y-2 text-center">
					<h1 className="text-3xl font-bold">Create an account</h1>
					<p className="text-gray-500 dark:text-gray-400">
						Enter student or staff information to get started
					</p>
				</div>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)}>
						<div className="flex flex-col pb-4 space-y-2">
							<FormField
								control={form.control}
								name="image"
								render={({ field }) => (
									<FormItem className="flex flex-col items-center w-full mb-6">
										<FormLabel>Profile Picture</FormLabel>
										<FormDescription hidden>
											Click on image to upload your profile picture
										</FormDescription>
										<label className="relative flex flex-col items-center">
											<FormControl>
												<Input
													className="fixed opacity-0"
													name="image"
													id="picture"
													accept="image/*"
													type="file"
													onChange={(e) => {
														handleImageChange(e);
														field.onChange(e.target.files[0] || null);
													}}
													ref={field.ref}
												/>
											</FormControl>
											<Image
												src={selectedImage || "/users/img.jpg"}
												alt="Picture of the author"
												width={300}
												height={300}
												objectFit="cover"
												className="h-40 w-40 rounded-full border-2 cursor-pointer "
											/>
										</label>

										<FormMessage />
									</FormItem>
								)}
							/>
							<div className="grid grid-cols-2 gap-4">
								<FormField
									control={form.control}
									name="firstName"
									render={({ field }) => (
										<FormItem>
											<FormLabel>First Name</FormLabel>
											<FormDescription hidden>
												Enter your first name
											</FormDescription>
											<FormControl>
												<Input id="firstName" placeholder="Edvard" {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="lastName"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Last Name</FormLabel>
											<FormDescription hidden>
												Enter your last name
											</FormDescription>
											<FormControl>
												<Input id="lastName" placeholder="Panes" {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
							<FormField
								control={form.control}
								name="email"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Email</FormLabel>
										<FormDescription hidden>Enter your email</FormDescription>
										<FormControl>
											<Input
												id="email"
												placeholder="example@example"
												{...field}
											/>
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
										<FormLabel>Password</FormLabel>
										<FormDescription hidden>
											Enter your password
										</FormDescription>
										<FormControl>
											<Input id="password" placeholder="********" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="confirmPassword"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Confirm Password</FormLabel>
										<FormDescription hidden>
											Confirm your password
										</FormDescription>
										<FormControl>
											<Input
												id="confirmPassword"
												placeholder="********"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<div className="space-y-4">
								<Button className="w-full" type="submit">
									Register
								</Button>
							</div>
						</div>
					</form>

					{/* </div> */}
				</Form>
			</div>
		</>
	);
}
