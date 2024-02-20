"use client";
import { useState, useEffect } from "react";
import SelectComponent from "./SelectComponent";
import axios from "axios";
import Papa from "papaparse";

type PapaData = {
	data: string[];
};

export default function RegisterMember() {
	const [role, setRole] = useState<string>("");
	const [, setAdmin] = useState<boolean>(false);
	const [selectedValue, setSelectedValue] = useState("students");

	const [selectedOption, setSelectedOption] = useState("CSVUser");
	const [isSingleUser, setIsSingleUser] = useState(true);
	const [isMultipleUsers, setIsMultipleUsers] = useState(false);

	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [phone, setPhone] = useState("");

	useEffect(() => {
		// Uppdatera gränssnittet baserat på vald option
		setIsSingleUser(selectedOption === "CSVSingleUser");
		setIsMultipleUsers(selectedOption === "CSVMultipleUsers");
	}, [selectedOption]);

	const handleRoleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		const selectedRole = event.target.value;
		setRole(selectedRole);
		if (selectedRole !== "staff") {
			setAdmin(false);
		}
	};

	const handleRadioChange = (value: string) => {
		setSelectedValue(value);
	};

	const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files[0];

		//* Checks if its a multiple user file or a single user file, if its a multiple user file, then it sends the data to the server
		if (isMultipleUsers) {
			Papa.parse(file, {
				complete: (result) => {
					axios.post("/api/createUsersCSV", {
						data: result.data,
						userType: selectedValue,
					});
				},
			});
			alert("File uploaded");
		} 
		//* If its a single user file, then it parses the data and sets the state of the input fields
		else if (isSingleUser) {
			Papa.parse(file, {
				//* The type PapaData is defined at the top of this file, and is used to define the type of the result of the parse function
				complete: (result: PapaData) => {
					if (result.data) {
						setFirstName(result.data[0][0]);
						setLastName(result.data[0][1]);
						setPhone(result.data[0][2]);
					}
				},
			});
		}
		//* Resets the input field to be empty
		event.target.value = "";
	};

	return (
		<div className="flex justify-center items-center  md: h-screen bg-white dark:bg-gray-900 gap-11 w-full ">
			<div className="flex items-center justify-center  md:flex-row md:items-start w-full">
				<div className="shadow-2xl  shadow-black bg-gray-800  text-neutral-50 p-6 rounded-2xl max-w-2xl  w-10/12">
					<form>
						<div className="grid gap-10 md:grid-cols-2">
							<div className="relative z-0 mb-5 group">
								<input
									type="text"
									name="First Name"
									id="First Name"
									className="block py-2.5 px-0 w-full text-sm text-neutral-50 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
									placeholder=" "
									value={firstName}
									onChange={(e) => setFirstName(e.target.value)}
									required
								/>
								<label
									htmlFor="First Name"
									className="peer-focus:font-medium absolute text-xl text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 left-0 right-0 mx-auto -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 "
								>
									First Name
								</label>
							</div>
							<div className="relative z-0 mb-5 group">
								<input
									type="text"
									name="Last Name"
									id="Last Name"
									className="block py-2.5 px-0 w-full text-sm text-neutral-50 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
									placeholder=" "
									value={lastName}
									onChange={(e) => setLastName(e.target.value)}
									required
								/>
								<label
									htmlFor="Last Name"
									className="peer-focus:font-medium absolute text-xl text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 left-0 right-0 mx-auto -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
								>
									Last Name
								</label>
							</div>
							<div className="relative z-0 mb-5 group">
								<input
									type="number"
									name="Phone"
									id="Phone"
									className="block py-2.5 px-0 w-full text-sm text-neutral-50 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
									placeholder=" "
									value={phone}
									onChange={(e) => setPhone(e.target.value)}
									required
								/>
								<label
									htmlFor="Phone"
									className="peer-focus:font-medium absolute text-xl text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 left-0 right-0 mx-auto -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
								>
									Phone
								</label>
							</div>
							<div className="relative z-0 mb-5 group">
								<select
									name="role"
									id="role"
									className="block py-2.5 px-0 w-full text-sm text-neutral-50 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
									required
									onChange={handleRoleChange}
								>
									<option value="">Välj roll</option>
									<option value="student">Student</option>
									<option value="staff">Personal</option>
								</select>
								{role === "student" && (
									<div className="flex justify-center">
										<SelectComponent />
									</div>
								)}
								{role === "staff" && (
									<div className="flex items-center mt-5">
										<input
											type="checkbox"
											name="admin"
											id="admin"
											className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
											onChange={(e) => setAdmin(e.target.checked)}
										/>
										<label
											htmlFor="admin"
											className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
										>
											Admin
										</label>
									</div>
								)}
							</div>
							<div className="relative z-0 mb-5 group col-span-2">
								<input
									type="file"
									name="file"
									id="file"
									className="block py-2.5 px-0 w-full text-sm text-neutral-50 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
									required
								/>
								<label
									htmlFor="file"
									className="peer-focus:font-medium absolute text-xl text-center text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-100 top-3 left-0 right-0 mx-auto -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-2/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-100 peer-focus:-translate-y-6"
								>
									File Upload
								</label>
							</div>
						</div>
					</form>
					<div className="flex justify-around">
						<button
							type="submit"
							className=" btn block bg-neutral-50  hover:text-gray-100 hover:bg-gray-800  text-gray-500 dark:bg-gray-700  btn-active "
						>
							Register
						</button>

						<div className="relative z-0 mb-5 group">
							<div style={{ display: isSingleUser || isMultipleUsers ? "block" : "none" }}>
								<input
									type="file"
									name="fileUploader"
									id="fileUploader"
									className="block py-2.5 px-0 w-full text-sm text-neutral-50 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
									accept=".csv"
									onChange={(e) => { handleFileUpload(e); }}
								/>
								<div style={{ display: isMultipleUsers ? "block" : "none" }}>
									<label htmlFor="students">
										<input type="radio" value="students" onChange={() => handleRadioChange("students")} checked={selectedValue === "students"} />
										Students
									</label>
									<br />
									<label htmlFor="staff">
										<input type="radio" name="staff" onChange={() => handleRadioChange("staff")} value="staff" checked={selectedValue === "staff"} />
										Staff
									</label>
								</div>
							</div>
							<select
								className="block py-2.5 px-0 w-full text-sm text-neutral-50 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
								name="CSVUser"
								id="CSVUser"
								onChange={(e) => setSelectedOption(e.target.value)}
							>
								<option value="CSVUser">Välj CSV</option>
								<option value="CSVSingleUser">CSV SingleUser</option>
								<option value="CSVMultipleUsers">CSV MultipleUsers</option>
							</select>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
