"use client";
import Image from "next/image";
import { useState, type FormEvent, type ChangeEvent, Suspense, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

type alertType = "alert-success" | "alert-error";
const Page = () => {
	// Hooks
	// eslint-disable-next-line no-unused-vars
	const [rememberMe, setRememberMe] = useState<boolean>(false);
	const [showPassword, setShowPassword] = useState<boolean>(false);
	//! Fix Remember me
	// eslint-disable-next-line no-unused-vars
	const [checked, setChecked] = useState<boolean>(false);
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [errorMessage, SetErrorMessage] = useState<string>("");
	const [err, setErr] = useState<boolean>(false);
	const [alertType, setAlertType] = useState<alertType>("alert-success");
	const router = useRouter();
	useEffect(() => {
		if (err) {
			setTimeout(() => {
				setErr(false);
			}, 5000);
		}
	}, [err]);
	useEffect(() => {
		const token = localStorage.getItem("token");
		if (token) {
			router.push("/");
		}
	}, [router]);

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
				setAlertType("alert-success");
				const responseData = res.data;
				localStorage.setItem("token", responseData.token);
				//const decodedToken = JSON.parse(atob(responseData.token.split(".")[1])); // * Decode JWT to get user details

				/* if (decodedToken.user.admin === true) {
					router.push("/");
				} */
				router.push("/");
			})
			.catch((e) => {
				setErr(true);
				setAlertType("alert-error");
				if (e.response.status === 401) {
					SetErrorMessage("Invalid email or password");
				} else {
					SetErrorMessage(e.message);
				}
				console.error("Login failed:", e);
			});
	};

	// eslint-disable-next-line no-unused-vars
	const handleRememberChange = (e: ChangeEvent<HTMLInputElement>) => {
		setRememberMe(e.target.checked);
		setChecked(e.target.checked);
	};

	return (
		<Suspense fallback={<div />}>
			<div className="h-screen w-screen bg-gradient-to-r from-gray-800 to-gray-950 flex items-center justify-center">
				<div className="h-full w-2/4 relative flex justify-center items-center">
					<div className="w-3/4 h-4/6 relative justify-center items-start flex rounded-lg">
						<div className="flex flex-col mt-3">
							<Image
								src="/icons/nti_logo_white.png"
								alt="Bibsy Logo"
								width={250}
								height={250}
								className=""
							/>
						</div>
						<div className="absolute top-0 left-0 h-full w-full flex flex-col items-center justify-center">
							<form
								onSubmit={handleSubmit}
								className="flex flex-col space-y-4 gap-4"
							>
								<div className="relative w-96 mb-6 ">
									<input
										type="email"
										value={email}
										onChange={(e) => setEmail(e.target.value)}
										placeholder="Email"
										className="peer h-10 w-full border-0 border-b-2 text-white border-gray-300 outline-none focus:border-rose-500 bg-transparent placeholder-transparent"
										id="email"
										required
										autoComplete="off"
										autoCorrect="off"
									/>
									<label
										htmlFor="username"
										className="absolute left-0 -top-3.5 text-white peer-placeholder-shown:text-gray-400  peer-placeholder-shown:text-base peer-placeholder-shown:top-2 transition-all duration-500 peer-focus:-top-3.5 peer-focus:text-white peer-focus:text-sm"
										style={{ pointerEvents: "none" }}
									>
										Email
									</label>
								</div>
								<div className="relative mb-6 flex items-center">
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
										onClick={() => setShowPassword(!showPassword)}
										className="ml-2 absolute right-0"
									>
										{showPassword ? (
											<div className="h-6 w-6 text-white" />
										) : (
											<div className="h-6 w-6 text-white" />
										)}
									</button>
									<label
										htmlFor="password"
										className="absolute left-0 -top-3.5 text-white peer-placeholder-shown:text-gray-400  peer-placeholder-shown:text-base peer-placeholder-shown:top-2 transition-all duration-500 peer-focus:-top-3.5 peer-focus:text-white peer-focus:text-sm"
										style={{ pointerEvents: "none" }}
									>
										Password
									</label>
								</div>
								<div className="flex ">
									<input
										type="checkbox"
										checked={rememberMe}
										onChange={handleRememberChange}
										className="mr-2 "
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
									className="p-2 bg-blue-700 text-white rounded hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-800"
								>
									Sign in
								</button>
							</form>
						</div>
					</div>
				</div>
			</div>
			{/* <div className="fixed bottom-10 right-10">
				{err && <Alert message={errorMessage} alertType={alertType} />}
			</div> */}
		</Suspense>
	);
};

export default Page;
