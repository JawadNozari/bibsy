/* eslint-disable no-unused-vars */
"use client";
//TODO: Add phone number and other missing fields to the form
//TODO: Add option to make user admin, staff or student
import axios from "axios";
import type z from "zod";
import QRCode from "qrcode";
import Image from "next/image";
// import {InfoAlert} from "@/components/InfoAlert";
import formSchema from "./formSchema";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { type ChangeEvent, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
const FormSchema = formSchema();

export function UserRegisterForm() {
	const [selectedImage, setSelectedImage] = useState(null);
	const [error, setError] = useState({});
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
			phoneNumber: "",
			privilege: "student",
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
			const submitResult = FormSchema.safeParse(values);
			if (submitResult.success === false) {
				setError(submitResult.error.formErrors.fieldErrors);
			}
			// Data is valid, proceed with form submission
			[values].filter((item) => item.confirmPassword);
			const formData = new FormData();
			formData.append("file", values.image);
			formData.append("path", "Users");
			// Upload the image to the server and get the path
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
			const isAdmin = values.privilege === "admin";
			const isStaff = values.privilege === "staff";
			const isStudent = values.privilege === "student";
			const jsonData = {
				...values,
				image: imagePathOnServer,
				isAdmin,
				isStaff,
				isStudent,
			};

			console.log("dddd ", values);
			await axios
				.post("/api/Register/User", jsonData, {
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
			<div>
				{/* {error && (
					<InfoAlert title="Error" message={error} type="destructive" />
				)} */}
				<div className="flex flex-col px-4 md:px-6 lg:px-8 py-6 space-y-6 border rounded-xl">
					<div className="space-y-2 text-center">
						<h1 className="text-3xl font-bold">Create an account</h1>
						<p className="text-gray-500 dark:text-gray-400">
							Enter student or staff information to get started
						</p>
					</div>
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)}>
							<div className="flex flex-col space-y-4">
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
													<Input
														id="firstName"
														placeholder="Edvard"
														{...field}
													/>
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
									name="username"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Username</FormLabel>
											<FormDescription hidden>
												Enter your username
											</FormDescription>
											<FormControl>
												<Input id="username" placeholder="jpanes" {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
									<FormField
									control={form.control}
									name="qrCode"
									render={({ field }) => (
										<FormItem>
											<FormLabel>QRcode</FormLabel>
											<FormDescription hidden>
												Enter your QR code
											</FormDescription>
											<FormControl>
												<Input id="qrCode" placeholder="jpanes" {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

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
									name="phoneNumber"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Phone Number</FormLabel>
											<FormDescription hidden>
												Enter your phone number
											</FormDescription>
											<FormControl>
												<Input
													id="phoneNumber"
													placeholder="07XXXXXXXX"
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name="privilege"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Previlage</FormLabel>
											<FormDescription hidden>
												Enter your previlage
											</FormDescription>
											<FormControl>
												<RadioGroup
													className="flex flex-col space-y-2"
													name="previlage"
													onValueChange={field.onChange}
													value={field.value}
												>
													<div className="flex items-center space-x-2">
														<RadioGroupItem id="r1" value="admin">
															Admin
														</RadioGroupItem>
														<Label htmlFor="r1">Admin</Label>
													</div>
													<div className="flex items-center space-x-2">
														<RadioGroupItem id="r2" value="staff">
															Staff
														</RadioGroupItem>
														<Label htmlFor="r2">Staff</Label>
													</div>
													<div className="flex items-center space-x-2">
														<RadioGroupItem id="r3" value="student">
															Student
														</RadioGroupItem>
														<Label htmlFor="r3">Student</Label>
													</div>
												</RadioGroup>
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
												<Input
													id="password"
													placeholder="********"
													{...field}
												/>
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
			</div>
		</>
	);
}
