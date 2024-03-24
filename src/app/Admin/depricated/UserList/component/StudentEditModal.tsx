//! FIX UNUSED VARS
/* eslint-disable no-unused-vars */

import type React from "react";
import Image from "next/image";
import SelectComponent from "./SelectComponent"; // Importing the SelectComponent component

// Defining interfaces for the User and StudentEditModalProps
interface User {
	id: number;
	password: string;
	firstName: string;
	lastName: string;
	email: string;
	phone: string;
	image: string;
	classroom: string;
	admin: boolean;
	qrCode: string;
}

interface StudentEditModalProps {
	showModal: boolean; // Boolean indicating whether the modal should be shown or not
	selectedUser: User | null; // The selected user to be edited, or null if no user is selected
	editedFirstName: string; // The edited first name for the selected user
	editedLastName: string; // The edited last name for the selected user
	editedEmail: string; // The edited email address for the selected user
	editedPhone: string; // The edited phone number for the selected user
	editedPassword: string; // Edited password
	imagePreview: string | null; // A preview of the user's image, or null if no image is selected
	showFullImage: boolean; // Boolean indicating whether the full image should be shown or not
	setShowFullImage: React.Dispatch<React.SetStateAction<boolean>>; // Function to update the showFullImage variable
	handleInputChange: (
		event: React.ChangeEvent<HTMLInputElement>,
		field: string,
	) => void; // Function to handle changes in input fields
	handleEditUser: () => void; // Function to perform the user edit
	closeModal: () => void; // Function to close the modal
}

// Defining the functional component StudentEditModal
const StudentEditModal: React.FC<StudentEditModalProps> = ({
	showModal,
	selectedUser,
	editedFirstName,
	editedLastName,
	editedEmail,
	editedPhone,
	editedPassword,
	imagePreview,
	showFullImage,
	setShowFullImage,
	handleInputChange,
	handleEditUser,
	closeModal,
}) => {
	// Function to handle keydown events
	function handleKeyDown(event: React.KeyboardEvent<HTMLDivElement>): void {
		if (event.key === "Escape") {
			// If Escape key is pressed
			setShowFullImage(false); // Hide full image
		}
	}

	return (
		<div
			className={`fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-500 bg-opacity-50 ${
				showModal ? "" : "hidden" // Shows or hides the modal depending on the showModal value
			}`}
		>
			<div className="bg-white p-6 md:p-8 w-full max-w-md mx-auto rounded-lg shadow-lg z-50">
				<div className="flex items-center justify-between border-b">
					<h2 className="text-lg font-semibold text-gray-900">
						Edit {`${selectedUser?.firstName} ${selectedUser?.lastName}`}{" "}
					</h2>
					<button
						type="button"
						onClick={closeModal} // Function to close the modal when the button is clicked
						className="text-gray-500 hover:text-gray-700 focus:outline-none"
					>
						<svg
							className="w-6 h-6"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
						>
							<title>Close</title>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M6 18L18 6M6 6l12 12"
							/>
						</svg>
					</button>
				</div>
				<div className="mt-4">
					<form>
						<div className="mb-4">
							<label
								htmlFor="firstName"
								className="block text-sm font-medium text-gray-700"
							>
								First Name
							</label>
							<input
								type="text"
								id="firstName"
								className="mt-1 p-1 border rounded-md"
								value={editedFirstName}
								onChange={(e) => handleInputChange(e, "firstName")}
							/>
						</div>
						<div className="mb-4">
							<label
								htmlFor="lastName"
								className="block text-sm font-medium text-gray-700"
							>
								Last Name
							</label>
							<input
								type="text"
								id="lastName"
								className="mt-1 p-1 border rounded-md"
								value={editedLastName}
								onChange={(e) => handleInputChange(e, "lastName")}
							/>
						</div>
						<div className="mb-4">
							<label
								htmlFor="email"
								className="block text-sm font-medium text-gray-700"
							>
								Email
							</label>
							<input
								type="email"
								id="email"
								className="mt-1 p-1 border rounded-md"
								value={editedEmail}
								onChange={(e) => handleInputChange(e, "email")}
							/>
						</div>
						<div className="mb-4">
							<label
								htmlFor="phone"
								className="block text-sm font-medium text-gray-700"
							>
								Phone
							</label>
							<input
								type="text"
								id="phone"
								className="mt-1 p-1 border rounded-md"
								value={editedPhone}
								onChange={(e) => handleInputChange(e, "phone")}
							/>
						</div>
						<div className="mb-4">
							<label
								htmlFor="password"
								className="block text-sm font-medium text-gray-700"
							>
								Password
							</label>
							<input
								type="password"
								id="password"
								className="mt-1 p-1 border rounded-md"
								value={editedPassword}
								onChange={(e) => handleInputChange(e, "password")}
							/>
						</div>
						<div className="mb-4">
							<label
								htmlFor="classroom"
								className="block text-sm font-medium text-gray-700"
							>
								Classroom
							</label>
							{/* Fits user.classroom as prop to SelectComponent */}
							{selectedUser && (
								<SelectComponent initialClassroom={selectedUser.classroom} />
							)}
						</div>
						<div className="mb-4">
							<label
								htmlFor="image"
								className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
							>
								Image
							</label>
							<input
								type="file"
								id="image"
								accept="image/*"
								onChange={(e) => handleInputChange(e, "image")}
								className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
							/>
							{/* If there is an image preview, a thumbnail is displayed that can be clicked to view it full size */}
							{imagePreview && (
								<Image
									src={`/${imagePreview}`} // Updated absolute path
									alt="Selected"
									className="mt-2 rounded-md cursor-pointer"
									width={100}
									height={100}
									onClick={() => setShowFullImage(true)} // Show full size image on click
									onKeyDown={handleKeyDown}
								/>
							)}
							{/* If the full screen display is enabled, the image is displayed in full size */}
							{showFullImage && (
								<div
									className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-500 bg-opacity-50"
									onClick={() => setShowFullImage(false)} // Close full-screen display when clicking outside the image
									onKeyDown={handleKeyDown}
								>
									<div className="relative">
										<Image
											src={
												imagePreview !== null
													? `/${imagePreview}`
													: "/default-image.png"
											} // Set a default image if there is no preview
											alt="Full size"
											layout="intrinsic"
											width={500}
											height={500}
											className="rounded-lg cursor-pointer"
										/>
										<span
											className="absolute top-2 right-2 text-white cursor-pointer"
											onClick={() => setShowFullImage(false)}
											onKeyDown={(event) => {
												if (event.key === "Enter" || event.key === "Space") {
													setShowFullImage(false);
												}
											}}
										>
											Close
										</span>
									</div>
								</div>
							)}
						</div>
					</form>
				</div>
				<div className="mt-6 flex justify-end">
					<button
						type="button"
						onClick={handleEditUser} // Function to confirm the edit by the user
						className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none"
					>
						Confirm
					</button>
					<button
						type="button"
						onClick={closeModal} // Function to cancel editing and close the modal
						className="ml-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none"
					>
						Cancel
					</button>
				</div>
			</div>
		</div>
	);
};

export default StudentEditModal;
