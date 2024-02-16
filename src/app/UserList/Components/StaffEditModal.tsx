import React from "react"; // Import React library for using React components
import Image from "next/image"; // Import Image component from Next.js for optimized image loading

// Defines interface for User object
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
	qrCode: number;
}

// Defines interface for props passed to StaffEditModal component
interface StaffEditModalProps {
	showModal: boolean; // Boolean to control whether modal is shown or not
	selectedUser: User | null; // Selected user object for editing
	editedFirstName: string; // Edited first name
	editedLastName: string; // Edited last name
	editedEmail: string; // Edited email
	editedPhone: string; // Edited phone number
	editedAdmin: string; // Edited admin status
	imagePreview: string | null; // Preview of selected image
	showFullImage: boolean; // Boolean to control whether full image is shown or not
	setShowFullImage: React.Dispatch<React.SetStateAction<boolean>>; // Setter function for showFullImage state
	handleInputChange: (
		event: React.ChangeEvent<HTMLInputElement>,
		field: string,
	) => void; // Function to handle input changes
	handleEditUser: () => void; // Function to handle user editing
	closeModal: () => void; // Function to close modal
}

// Define StaffEditModal component
const StaffEditModal: React.FC<StaffEditModalProps> = ({
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
}) => {
	// Function to handle keydown event
	function handleKeyDown(event: React.KeyboardEvent<HTMLDivElement>): void {
		if (event.key === "Escape") {
			// If Escape key is pressed
			setShowFullImage(false); // Hide full image
		}
	}

	console.log(imagePreview);

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
						{/* Display the name of the selected user */}
					</h2>
					<button
						type="submit"
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
								htmlFor="admin"
								className="block text-sm font-medium text-gray-700"
							>
								Admin
							</label>
							<div className="flex items-center mt-2">
								<input
									type="radio"
									id="admin-yes"
									name="admin"
									value="true"
									checked={editedAdmin === "true"}
									onChange={(e) => handleInputChange(e, "admin")}
									className="mr-1"
								/>
								<label htmlFor="admin-yes" className="mr-4">
									Yes
								</label>
								<input
									type="radio"
									id="admin-no"
									name="admin"
									value="false"
									checked={editedAdmin === "false"}
									onChange={(e) => handleInputChange(e, "admin")}
									className="mr-1"
								/>
								<label htmlFor="admin-no">No</label>
							</div>
						</div>
						<div className="mb-4">
							<label
								htmlFor="image"
								className="block text-sm font-medium text-gray-700"
							>
								Image
							</label>
							<input
								type="file"
								id="image"
								accept="image/*"
								onChange={(e) => handleInputChange(e, "image")}
								className="mt-1 p-1 border rounded-md"
							/>
							{/* If there is an image preview, a thumbnail is displayed that can be clicked to view it full size */}
							{imagePreview && (
								<Image
									src={`/${imagePreview}`} // Provide a default image
									alt="Selected"
									className="mt-2 rounded-md cursor-pointer"
									width={100}
									height={100}
									onClick={() => setShowFullImage(true)} // Show full size image on click
									onKeyDown={handleKeyDown}
								/>
							)}
							{/* If full screen display is enabled, the image is displayed in full size */}
							{showFullImage && (
								<div
									className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-500 bg-opacity-50"
									onClick={() => setShowFullImage(false)} // Close full-size image on click outside
									onKeyDown={handleKeyDown} // Close full-size image on Escape key
								>
									<div className="relative">
										<Image
											src={
												imagePreview !== null
												? `/images/${imagePreview}`
												: "/default-image.png"
											} // Provide a default image
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
												if (event.key === "Enter" || event.key === "Space") { // Close full-size image on Enter or Space key
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
						{/* Add more form fields here */}
					</form>
				</div>
				<div className="mt-6 flex justify-end">
					<button
						type="submit"
						onClick={handleEditUser} // Function to confirm the edit
						className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none"
					>
						Confirm
					</button>
					<button
						type="submit"
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

export default StaffEditModal;
