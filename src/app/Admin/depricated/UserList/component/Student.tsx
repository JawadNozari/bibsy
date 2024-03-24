//! FIX UNUSED VARS
/* eslint-disable no-unused-vars */

import type React from "react";
import { useState } from "react";
import Image from "next/image";
import StudentEditModal from "./StudentEditModal";
import axios from "axios";


interface User {
	// Defines an interface for a user
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

// Defines an interface for the properties that the StudentList component expects to receive
interface StudentListProps {
	studentUsers: User[]; // Type for student users
	handleClick: (user: User | null) => void; // Function to handle click on a user
	setStudentUsers?: React.Dispatch<React.SetStateAction<User[]>>; // Function to update student users
	isAdmin: boolean; // Boolean indicating whether the user is an admin
}

// Defines a functional component StudentList that receives properties defined by StudentListProps
const StudentList: React.FC<StudentListProps> = ({
	studentUsers, // An array of student users to be displayed in the list
	handleClick, // A function that handles click events on a user in the list
	setStudentUsers, // A function to update student users (optional)
	isAdmin, // Boolean indicating whether the user is an admin
}) => {
	// State variables
	const [showModal, setShowModal] = useState(false); // Show or hide modal
	const [selectedUser, setSelectedUser] = useState<User | null>(null); // The selected user for editing
	const [editedUser, setEditedUser] = useState<User | null>(null); // The user being edited
	const [editedFirstName, setEditedFirstName] = useState(""); // Edited first name
	const [editedLastName, setEditedLastName] = useState(""); // Edited last name
	const [editedEmail, setEditedEmail] = useState(""); // Edited email address
	const [editedPhone, setEditedPhone] = useState(""); // Edited phone number
	const [editedPassword, setEditedPassword] = useState(""); // The edited password
	const [editedClassroom, setEditedClassroom] = useState(""); // Edited classroom
	const [selectedImage, setSelectedImage] = useState<File | null>(null); // The selected image for upload
	const [imagePreview, setImagePreview] = useState<string | null>(null); // Image preview
	const [showFullImage, setShowFullImage] = useState(false); // Show or hide full image

	// Function to open the editing modal for a user
	const openModal = (user: User) => {
		setSelectedUser(user);
		setEditedUser(user);
		setEditedFirstName(user.firstName);
		setEditedLastName(user.lastName);
		setEditedEmail(user.email);
		setEditedPhone(user.phone);
		setEditedPassword(user.password); // Set the edited password
		setEditedClassroom(user.classroom);
		setImagePreview(user.image); // Preview the image when the modal opens
		setShowModal(true);
	};

	// Function to close the modal
	const closeModal = () => {
		setShowModal(false);
	};

	// Function to handle editing of a user
	const handleEditUser = async () => {
		if (editedUser) {
			// Create a copy of the user list
			const updatedUsers = [...studentUsers];
			// Find the index of the edited user in the copied list
			const index = updatedUsers.findIndex((user) => user.id === editedUser.id);

			if (index !== -1) {
				// Update the user's information in the copied list
				updatedUsers[index] = {
					...updatedUsers[index],
					firstName: editedFirstName,
					lastName: editedLastName,
					email: editedEmail,
					phone: editedPhone,
					password: (editedPassword), // Update the password
					classroom: editedClassroom,
					image: selectedImage ? selectedImage.name : editedUser.image, // Update the image if a new one has been selected
				};
				if (selectedImage !== null && selectedImage !== undefined) {
					const formData = new FormData();
					formData.append("file", selectedImage || undefined);
					formData.append("path", "StudentPFP");
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
						image: imagePath,
					};
				}
				const user = {
					...updatedUsers[index],
					userType: "Student",
				};
				await axios.post("/api/editUsers", user, {
					headers: { "Content-Type": "application/json" },
				});

				// If the function to update the user list is provided, update the original user list
				if (setStudentUsers) {
					setStudentUsers(updatedUsers);
				}
			}

			closeModal(); // Close the modal after editing is done
		}
		window.location.reload();
	};

	// Function to handle changes in the input fields
	const handleInputChange = (
		event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
		field: string,
	) => {
		const value = event.target.value; // Get the value from the input field
		switch (field) {
			case "firstName":
				setEditedFirstName(value);
				break;
			case "lastName":
				setEditedLastName(value);
				break;
			case "email":
				setEditedEmail(value);
				break;
			case "phone":
				setEditedPhone(value);
				break;
			case "password":
				setEditedPassword(value); // Updates the edited password
				break;
			case "classroom":
				setEditedClassroom(value);
				break;
			case "image":
				// Update the image when a new image is selected
				if (
					event.target instanceof HTMLInputElement &&
					event.target.files?.[0]
				) {
					const selected = event.target.files[0];
					setSelectedImage(selected);
					const reader = new FileReader();
					reader.onload = () => {
						if (typeof reader.result === "string") {
							setImagePreview(reader.result);
						}
					};
					reader.readAsDataURL(selected);
				}
				break;
			default:
				break;
		}
		// Update the editedUser state with the edited information
		setEditedUser((prevUser: User | null) => ({
			...prevUser, // Spread the previous user object to retain unchanged properties
			firstName: editedFirstName, // Update the first name with the edited first name
			lastName: editedLastName, // Update the last name with the edited last name
			email: editedEmail, // Update the email with the edited email
			phone: editedPhone, // Update the phone number with the edited phone number
			classroom: editedClassroom, // Update the classroom with the edited classroom
			id: editedUser?.id || 0, // Keep the id the same or set it to 0 if it's undefined
			password: editedUser?.password || "", // Keep the password the same or set it to an empty string if it's undefined
			admin: editedUser?.admin || false, // Keep the admin status the same or set it to false if it's undefined
			qrCode: String(editedUser?.qrCode || 0), // Convert qrCode to string or set it to "0" if it's undefined
			image: selectedImage ? selectedImage.name : editedUser?.image || "", // Update the image name with the selected image's name or set it to an empty string if 'editedUser?.image' is undefined
		}));
	};

	return (
		<>
			<thead>
				<tr>
					<th colSpan={4} className="text-lg font-bold px-6 py-3">
						Student Users: {/* Header for student users */}
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
					Classroom {/* Classroom */}
				</th>
				{isAdmin ? (
					<th scope="col" className="px-6 py-3">
						Action {/* Action */}
					</th>
				) : (
					<></>
				)}
			</tr>
			{studentUsers?.map((user) => (
				<tbody key={user.id}>
					<tr
						className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
						tabIndex={0}
						aria-label={`User details for ${user.firstName} ${user.lastName}`}
						onClick={() => handleClick(user)}
						onKeyDown={(event) => {
							if (event.key === "Enter" || event.key === " ") {
								handleClick(user);
							}
						}}
					>
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
						<td className="px-6 py-4">{user.classroom}</td>
						{isAdmin ? (
							<td className="px-6 py-4">
								<button
									type="button"
									onClick={(e) => {
										e.stopPropagation();
										openModal(user);
									}}
									className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
								>
									Edit user {/* Edit user */}
								</button>
							</td>
						) : (
							<></>
						)}
					</tr>
				</tbody>
			))}

			{selectedUser && ( // If a user is selected, render the edit modal
				<StudentEditModal
					showModal={showModal}
					selectedUser={selectedUser}
					editedFirstName={editedFirstName}
					editedLastName={editedLastName}
					editedEmail={editedEmail}
					editedPhone={editedPhone}
					editedPassword={editedPassword}
					imagePreview={imagePreview}
					showFullImage={showFullImage}
					handleInputChange={handleInputChange}
					handleEditUser={handleEditUser}
					closeModal={closeModal}
					setShowFullImage={setShowFullImage}
				/>
			)}
		</>
	);
};

export default StudentList;
