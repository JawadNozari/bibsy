"use client";
import Image from "next/image";
import { useState, FormEvent, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import { EyeIcon, EyeOffIcon } from "@heroicons/react/outline";
import axios from "axios";

const Page = () => {
	// Hooks
	// eslint-disable-next-line no-unused-vars
	const [rememberMe, setRememberMe] = useState<boolean>(false);
	const [showPassword, setShowPassword] = useState<boolean>(false);
	//! Fix Remember me
	const [checked, setChecked] = useState<boolean>(false);
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [errorMessage, SetErrorMessage] = useState<string>("");
	const [Err, setErr] = useState(false);

	const router = useRouter();

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const userData = {
			email,
			password,
			rememberMe,
		};

		await axios
			.post("/api/login", { userData })
			.then((res) => {
				setErr(false);
				const responseData = res.data;
				console.log(`Got Token from Backend:  ${responseData}`);
				localStorage.setItem("token", responseData.token);
				//const decodedToken = JSON.parse(atob(responseData.token.split(".")[1])); // * Decode JWT to get user details

				/* if (decodedToken.user.admin === true) {
					router.push("/");
				} */
				router.push("/");
			})
			.catch((e) => {
				setErr(true);
				if (e.response.status === 401) {
					SetErrorMessage("Invalid email or password");
				} else {
					SetErrorMessage(e.message);
				}
				console.error("Login failed:", e);
			});
	};

	const handleRememberChange = (e: ChangeEvent<HTMLInputElement>) => {
		setRememberMe(e.target.checked);
		setChecked(e.target.checked);
	};

	return (
		<>
			{Err ? (
				<>
					<div>Error</div>
					<div>{errorMessage}</div>
				</>
			) : (
				<>
					<div className="h-screen w-screen bg-gradient-to-r from-purple-400 to-pink-500 flex items-center justify-center">
						<div className="h-full w-2/4 relative flex justify-center items-center">
							<Image
								src="/login.png"
								alt="Login page"
								layout="fill"
								objectFit="cover"
								className="rounded-lg h-full w-full"
							/>
							<div className="w-2/5 h-2/5 bg-black opacity-78 relative bottom-12  flex rounded-lg p-[8.5rem]">
								<div className="absolute top-0 left-0 h-full w-full flex flex-col items-center justify-center">
									<form
										onSubmit={handleSubmit}
										className="flex flex-col space-y-4"
									>
										<div className="relative h-11 mb-6">
											<input
												type="email"
												value={email}
												onChange={(e) => setEmail(e.target.value)}
												placeholder="Email"
												className="peer h-10 w-full border-0 border-b-2 text-white border-gray-300 outline-none focus:border-rose-500 bg-transparent placeholder-transparent"
												id="email"
												required
												autoComplete="off"
											/>
											<label
												htmlFor="username"
												className="absolute left-0 -top-3.5 text-white peer-placeholder-shown:text-gray-400  peer-placeholder-shown:text-base peer-placeholder-shown:top-2 transition-all duration-500 peer-focus:-top-3.5 peer-focus:text-white peer-focus:text-sm"
											>
												Email
											</label>
										</div>
										<div className="relative h-11 mb-6 flex items-center">
											<input
												type={showPassword ? "test" : "password"}
												value={password}
												onChange={(e) => setPassword(e.target.value)}
												placeholder="Lösenord"
												className="peer h-10 w-full border-0 border-b-2 text-white border-gray-300 outline-none focus:border-rose-500 bg-transparent placeholder-transparent"
												id="password1"
												required
												autoComplete="off"
											/>
											<button
												type="button"
												onClick={(e) => setShowPassword(!showPassword)}
												className="ml-2 absolute right-0"
											>
												{showPassword ? (
													<EyeOffIcon className="h-6 w-6 text-white" />
												) : (
													<EyeIcon className="h-6 w-6 text-white" />
												)}
											</button>
											<label
												htmlFor="password"
												className="absolute left-0 -top-3.5 text-white peer-placeholder-shown:text-gray-400  peer-placeholder-shown:text-base peer-placeholder-shown:top-2 transition-all duration-500 peer-focus:-top-3.5 peer-focus:text-white peer-focus:text-sm"
											>
												Password
											</label>
										</div>
										<div className="flex items-center">
											<input
												type="checkbox"
												checked={rememberMe}
												onChange={(e) => handleRememberChange(e)}
												className="mr-2"
												id="remember"
											/>
											{/* //! Fix Remember me  */}
											<label
												htmlFor="remember"
												className="text-gray-800"
												style={{ color: checked ? "white" : "gray" }}
											>
												Remember Me
											</label>
										</div>
										<button
											type="submit"
											className="p-2 bg-purple-600 text-white rounded hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-800"
										>
											Sign in
										</button>
									</form>
								</div>
							</div>
						</div>
					</div>
				</>
			)}
		</>
	);
};

export default Page;
