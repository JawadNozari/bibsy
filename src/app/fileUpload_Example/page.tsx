"use client";
// a test for file upload
import React, { useState } from "react";
import axios from "axios";


export default function Home() {
	const [file, setFile] = useState<File | undefined>(undefined);
	const [message, setMessage] = useState<string | undefined>("");

	const submit = async () => {
		const formData = new FormData();
		if (file) {
			formData.append("file", file);
		}

		await axios
			.post("/api/utils/uploader", formData, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			})
			.then((res) => {
				setMessage(res.data.path);
			})
			.catch(() => {
				setMessage("There was a problem with the server");
			});
	};

	return (
		<div className="flex h-screen w-screen justify-center items-center flex-col">
			<h1 className="font-semibold text-lg">Upload File NextJS local server</h1>
			<form className="flex flex-col p-6 items-center justify-between">
				<div className="flex items-center flex-col">
					<input
						type="file"
						// style input file to make it look like a button with tailwind
						className="file-input file-input-bordered file-input-info w-full max-w-xs text-wh"
						id="customFile"
						onChange={(e) => {
							setFile(e.target.files?.[0]);
						}}
						//dont show chosen file name
					/>
					<label className="text-center mt-6" htmlFor="customFile">
						{message}
					</label>
				</div>

				<input
					type="button"
					onClick={(e) => {
						e.preventDefault();
						submit();
					}}
					value="Upload"
					className="rounded-xl mt-5 px-8 py-2 max-w-fit text-white bg-blue-600 hover:bg-blue-700 transition duration-200 ease-in-out"
				/>
			</form>
		</div>
	);
}
