//! FIX UNUSED VARS
/* eslint-disable no-unused-vars */

import type React from "react"; // Import React and useState hook from React library
import { useState } from "react";
import Image from "next/image"; // Import Image component from Next.js library for displaying images
import StaffEditModal from "./StaffEditModal"; // Import StaffEditModal component from another file
import axios from "axios";



// Defines an interface for a user
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

// Defines an interface for the properties that the StaffList component expects to receive
interface StaffListProps {
	staffUsers: User[]; // An array of users
	handleClick: (user: User | null) => void; // A function to handle click on user
	isAdmin: boolean; // A boolean indicating whether the user is an admin
}

// Defines a functional component StaffList that receives properties defined by StaffListProps
const StaffList: React.FC<StaffListProps> = ({
	staffUsers,
	handleClick,
	isAdmin,
}) => {
	// State hooks
	const [showModal, setShowModal] = useState(false); // Shows or hides the modal for editing user
	const [selectedUser, setSelectedUser] = useState<User | null>(null); // The user selected for editing
	const [editedUser, setEditedUser] = useState<User | null>(null); // The user being edited
	const [editedFirstName, setEditedFirstName] = useState(""); // The edited first name
	const [editedLastName, setEditedLastName] = useState(""); // The edited last name
	const [editedEmail, setEditedEmail] = useState(""); // The edited email address
	const [editedPhone, setEditedPhone] = useState(""); // The edited phone number
	const [editedPassword, setEditedPassword] = useState(""); // The edited password
	const [editedAdmin, setEditedAdmin] = useState("false"); // The boolean value for whether the user is an admin
	const [selectedImage, setSelectedImage] = useState<File | null>(null); // The selected image for the user
	const [imagePreview, setImagePreview] = useState<string | null>(null); // Image preview
	const [showFullImage, setShowFullImage] = useState(false); // Shows the full image

	// Opens the editing modal for a specific user
	const openModal = (user: User) => {
		setSelectedUser(user); // Set the selected user
		setEditedUser(user); // Set the user being edited
		setEditedFirstName(user.firstName); // Set the edited first name
		setEditedLastName(user.lastName); // Set the edited last name
		setEditedEmail(user.email); // Set the edited email
		setEditedPhone(user.phone); // Set the edited phone number
		setEditedPassword(user.password); // Set the edited password
		setEditedAdmin(String(user.admin)); // Convert boolean value to string for radio button
		setImagePreview(user.image); // Show image preview when the modal opens
		setShowModal(true); // Show the modal
	};

	// Closes the modal
	const closeModal = () => {
		setShowModal(false); // Hides the modal
	};

	// Handles editing of a user
	const handleEditUser = async () => {
		if (editedUser) {
			const updatedUsers = [...staffUsers]; // Create a copy of the staffUsers array
			const index = updatedUsers.findIndex((user) => user.id === editedUser.id); // Finds the index of the user being edited

			if (index !== -1) {
				// If the user is found in the array
				updatedUsers[index] = {
					...updatedUsers[index], // Spread the existing user properties
					firstName: editedFirstName, // Update the first name
					lastName: editedLastName, // Update the last name
					email: editedEmail, // Update the email
					phone: editedPhone, // Update the phone number
					password: (editedPassword), // Update the password
					admin: editedAdmin === "true", // Convert the string to boolean and update the admin status
					image: selectedImage ? selectedImage.name : editedUser.image, // Update the image if a new one is selected
				};
				if (selectedImage !== null && selectedImage !== undefined) {
					const formData = new FormData();
					formData.append("file", selectedImage || undefined);
					formData.append("path", "staffPFP");
					const imagePath = await axios
					.post("/api/uploader", formData, {
						headers: { "Content-Type": "multipart/form-data" },
					})
					.then((res) => {
						return res.data.path;
					})
					.catch((error: Error) => {
						console.debug(error);
					});
					updatedUsers[index] = {
						...updatedUsers[index],
						image: imagePath
					};
				}
				const user = {
					...updatedUsers[index],
					userType: "Staff",
				};
				await axios.post("/api/editUsers", user, {
					headers: { "Content-Type": "application/json" },
				});
			}

			closeModal(); // Close the modal
		}
		window.location.reload();

	};

	// Handles changes in the input field
	const handleInputChange = (
		event: React.ChangeEvent<HTMLInputElement>,
		field: string,
	) => {
		const value = event.target.value; // Get the value from the input field
		switch (field) {
			case "firstName":
				setEditedFirstName(value); // Updates the edited first name
				break;
			case "lastName":
				setEditedLastName(value); // Updates the edited last name
				break;
			case "email":
				setEditedEmail(value); // Updates the edited email
				break;
			case "phone":
				setEditedPhone(value); // Updates the edited phone number
				break;
			case "password":
				setEditedPassword(value); // Updates the edited password
				break;
			case "admin":
				setEditedAdmin(value); // Updates the edited admin status
				break;
			case "image":
				// Updates the image state when a new image is selected
				if (event.target.files?.[0]) {
					const selected = event.target.files[0]; // Get the selected image file
					setSelectedImage(selected); // Set the selected image file
					const reader = new FileReader(); // Create a new FileReader object
					reader.onload = () => {
						if (typeof reader.result === "string") {
							setImagePreview(reader.result); // Set the image preview with the base64 data URL
						}
					};
					reader.readAsDataURL(selected); // Read the selected image as a data URL
				}
				break;
			default:
				break;
		}

		// Updates the editedUser state
		setEditedUser((prevUser: User | null) => ({
			...prevUser, // Keeps the previous user properties
			firstName: editedFirstName, // Updates the first name with the edited value
			lastName: editedLastName, // Updates the last name with the edited value
			email: editedEmail, // Updates the email with the edited value
			phone: editedPhone, // Updates the phone number with the edited value
			classroom: editedAdmin, // Updates the classroom with the edited admin status
			id: editedUser?.id || 0, // Assigns the user id if available, otherwise assign 0
			password: editedUser?.password || "", // Assigns the user password if available, otherwise assign an empty string
			admin: editedUser?.admin || false, // Assigns the user admin status if available, otherwise assign false
			qrCode: String(editedUser?.qrCode || 0), // Converts the qrCode to a string and assigns the value if available, otherwise assign "0"
			image: selectedImage ? selectedImage.name : editedUser?.image || "", // Assigns the selected image name if available, otherwise assign the previous image name or an empty string
		}));
	};

	// Renders JSX code for StaffList component
	return (
		<>
			{/* Render a table with users */}
			<thead>
				<tr>
					<th colSpan={4} className="text-lg font-bold px-6 py-3">
						Staff Users:
					</th>
				</tr>
			</thead>
			<tr className=" border-b-4 border-indigo-500 text-xs uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
				<th scope="col" className="px-6 py-3">
					Name {/* Name */}
				</th>
				<th scope="col" className="px-6 py-3">
					Phone {/* Phone */}
				</th>
				<th scope="col" className="px-6 py-3">
					Admin {/* Classroom */}
				</th>
				{isAdmin ? (
					<th scope="col" className="px-6 py-3">
						Action {/* Action */}
					</th>
				) : (
					<></>
				)}
			</tr>
			{staffUsers?.map((user) => (
				<tbody key={user.id}>
					<tr
						className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 active:bg-gray-50   cursor-pointer "
						tabIndex={0}
						aria-label={`User details for ${user.firstName} ${user.lastName}`}
						onClick={() => handleClick(user)}
						onKeyDown={(event) => {
							if (event.key === "Enter" || event.key === " ") {
								handleClick(user);
							}
						}}
					>
						{/* Render user information */}
						<th
							scope="row"
							className="flex items-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
						>
							<Image
								className="w-10 h-10 rounded-full"
								width={10}
								height={10}
								src={user.image.includes(".") ? `/${user.image}` : "/pfp.jpg"}
								alt={"Image"}
							/>
							<div className="ps-3">
								<div className="text-base font-semibold">{`${user.firstName} ${user.lastName}`}</div>
								<div className="font-normal text-gray-500">{user.email}</div>
							</div>
						</th>
						<td className="px-6 py-4">{user.phone}</td>
						<td className="px-6 py-4">
							<div className="flex items-center">
								<div className="h-4 w-0.5">{user.admin ? "Yes" : "No"}</div>
							</div>
						</td>
						{isAdmin ? (
							<td className="px-6 py-4">
								{/* Button to open the editing modal */}
								<button
									type="button"
									onClick={(e) => {
										e.stopPropagation();
										openModal(user);
									}}
									className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
								>
									Edit user
								</button>
							</td>
						) : (
							<></>
						)}
					</tr>
				</tbody>
			))}
			{/* Show the editing modal if a user is selected */}
			{selectedUser && (
				<StaffEditModal
					showModal={showModal}
					selectedUser={selectedUser}
					editedFirstName={editedFirstName}
					editedLastName={editedLastName}
					editedEmail={editedEmail}
					editedPhone={editedPhone}
					editedPassword={editedPassword}
					editedAdmin={editedAdmin}
					imagePreview={imagePreview}
					showFullImage={showFullImage}
					handleInputChange={handleInputChange}
					handleEditUser={handleEditUser}
					closeModal={closeModal}
					setShowFullImage={setShowFullImage} // Add the missing property
				/>
			)}
		</>
	);
};

export default StaffList; // Export the StaffList component
