/* eslint-disable no-unused-vars */
import React from "react";
import Image from "next/image";
import SelectComponent from "./SelectComponent"; // Assuming this is used only for students

// Common User interface
interface User {
	id: number;
	password: string;
	firstName: string;
	lastName: string;
	email: string;
	phone: string;
	image: string;
	classroom?: string; // Optional, as it's specific to students
	admin?: boolean; // Optional, as it's specific to staff
	qrCode: number;
}

// Props interface, combining both Staff and Student modal props
interface EditModalProps {
	showModal: boolean;
	selectedUser: User | null;
	editedFirstName: string;
	editedLastName: string;
	editedEmail: string;
	editedPhone: string;
	editedAdmin?: string; // Optional, as it's specific to staff
	imagePreview: string | null;
	showFullImage: boolean;
	setShowFullImage: React.Dispatch<React.SetStateAction<boolean>>;
	handleInputChange: (
		event: React.ChangeEvent<HTMLInputElement>,
		field: string,
	) => void;
	handleEditUser: () => void;
	closeModal: () => void;
	userType: "staff" | "student"; // Additional prop to distinguish between staff and student
}

const EditModal: React.FC<EditModalProps> = ({
	showModal,
	selectedUser,
	editedFirstName,
	editedLastName,
	editedEmail,
	editedPhone,
	editedAdmin,
	imagePreview,
	showFullImage,
	setShowFullImage,
	handleInputChange,
	handleEditUser,
	closeModal,
	userType,
}) => {
	function handleKeyDown(event: React.KeyboardEvent<HTMLDivElement>): void {
		if (event.key === "Escape") {
			setShowFullImage(false);
		}
	}

	return (
		<div
			className={`fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-500 bg-opacity-50 ${
				showModal ? "" : "hidden"
			}`}
		>
			<div className="bg-white p-6 md:p-8 w-full max-w-md mx-auto rounded-lg shadow-lg z-50">
				<div className="flex items-center justify-between border-b">
					<h2 className="text-lg font-semibold text-gray-900">
						Edit {`${selectedUser?.firstName} ${selectedUser?.lastName}`}
					</h2>
					<button
						type="button"
						onClick={closeModal}
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
						{/* Common form fields */}
						<div className="mb-4">
							{/* Form fields like First Name, Last Name, Email, Phone here */}
						</div>
						{/* Conditional rendering based on userType */}
						{userType === "student" && (
							<div className="mb-4">
								<label
									htmlFor="classroom"
									className="block text-sm font-medium text-gray-700"
								>
									Classroom
								</label>
								{selectedUser && (
									<SelectComponent
										initialClassroom={selectedUser.classroom || ""}
									/>
								)}
							</div>
						)}
						{userType === "staff" && (
							<div className="mb-4">{/* Admin specific fields here */}</div>
						)}
						{/* Image upload and preview logic */}
						{/* More form fields and buttons */}
					</form>
				</div>
			</div>
		</div>
	);
};

export default EditModal;
