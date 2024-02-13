import React, { useState } from "react";
import Image from "next/image";
import StudentEditModal from "./StudentEditModal";

interface User {
	// Definierar en interface för en användare
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

// Definierar en interface för egenskaper som StudentList-komponenten förväntar sig ta emot
interface StudentListProps {
	studentUsers: User[]; // Typ för studentanvändare
	handleClick: (user: User | null) => void; // Funktion för att hantera klick på en användare
	setStudentUsers?: React.Dispatch<React.SetStateAction<User[]>>; // Funktion för att uppdatera studentanvändare
}

// Definierar en funktionell komponent StudentList som tar emot egenskaper definierade av StudentListProps
const StudentList: React.FC<StudentListProps> = ({
	studentUsers, // En array av studentanvändare som ska visas i listan
	handleClick, // En funktion som hanterar klickhändelser på en användare i listan
	setStudentUsers, // En funktion för att uppdatera studentanvändare (valfri)
}) => {
	// State variabler
	const [showModal, setShowModal] = useState(false); // Visa eller dölj modal
	const [selectedUser, setSelectedUser] = useState<User | null>(null); // Den valda användaren för redigering
	const [editedUser, setEditedUser] = useState<User | null>(null); // Den användare som är under redigering
	const [editedFirstName, setEditedFirstName] = useState(""); // Redigerad förnamn
	const [editedLastName, setEditedLastName] = useState(""); // Redigerat efternamn
	const [editedEmail, setEditedEmail] = useState(""); // Redigerad e-postadress
	const [editedPhone, setEditedPhone] = useState(""); // Redigerat telefonnummer
	const [editedClassroom, setEditedClassroom] = useState(""); // Redigerat klassrum
	const [selectedImage, setSelectedImage] = useState<File | null>(null); // Den valda bilden för uppladdning
	const [imagePreview, setImagePreview] = useState<string | null>(null); // Förhandsgranskning av bilden
	const [showFullImage, setShowFullImage] = useState(false); // Visa eller dölj fullständig bild

	// Funktion för att öppna redigeringsmodalen för en användare
	const openModal = (user: User) => {
		setSelectedUser(user);
		setEditedUser(user);
		setEditedFirstName(user.firstName);
		setEditedLastName(user.lastName);
		setEditedEmail(user.email);
		setEditedPhone(user.phone);
		setEditedClassroom(user.classroom);
		setImagePreview(user.image); // Förhandsgranska bilden när modalen öppnas
		setShowModal(true);
	};

	// Funktion för att stänga modalen
	const closeModal = () => {
		setShowModal(false);
	};

	// Funktion för att hantera redigeringen av en användare
	const handleEditUser = () => {
		if (editedUser) {
			const updatedUsers = [...studentUsers];
			const index = updatedUsers.findIndex((user) => user.id === editedUser.id);

			if (index !== -1) {
				updatedUsers[index] = {
					...updatedUsers[index],
					firstName: editedFirstName,
					lastName: editedLastName,
					email: editedEmail,
					phone: editedPhone,
					classroom: editedClassroom,
					image: selectedImage ? selectedImage.name : editedUser.image, // Uppdatera bilden om en ny har valts
				};

				if (setStudentUsers) {
					setStudentUsers(updatedUsers); // Uppdatera användarlistan
				}
			}

			console.log("Updated user information:", updatedUsers[index]);
			closeModal(); // Stäng modalen efter redigeringen är klar
		}
	};

	// Funktion för att hantera ändringar i inputfälten
	const handleInputChange = (
		event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
		field: string,
	) => {
		const value = event.target.value;
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
			case "classroom":
				setEditedClassroom(value);
				break;
			case "image":
				// Uppdatera bilden när en ny bild väljs
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
		setEditedUser((prevUser: User | null) => ({
			...prevUser,
			firstName: editedFirstName,
			lastName: editedLastName,
			email: editedEmail,
			phone: editedPhone,
			classroom: editedClassroom,
			id: editedUser?.id || 0,
			password: editedUser?.password || "",
			admin: editedUser?.admin || false,
			qrCode: editedUser?.qrCode || 0,
			image: selectedImage ? selectedImage.name : editedUser?.image || "", // Tilldela en tom sträng om 'editedUser?.image' är undefined
		}));
	};

	// Funktion för att hantera tangentbordstryck (ej implementerad i detta skede)
	function handleKeyDown(event: React.KeyboardEvent<HTMLDivElement>): void {
		throw new Error("Function not implemented.");
	}

	return (
		<>
			<thead>
				<tr>
					<th colSpan={4} className="text-lg font-bold px-6 py-3">
						Student Users: {/* Rubrik för studentanvändare */}
					</th>
				</tr>
			</thead>
			<tr className=" border-b-4 border-indigo-500 text-xs uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
				<th scope="col" className="px-6 py-3">
					Name {/* Namn */}
				</th>
				<th scope="col" className="px-6 py-3">
					Phone {/* Telefon */}
				</th>
				<th scope="col" className="px-6 py-3">
					Classroom {/* Klassrum */}
				</th>
				<th scope="col" className="px-6 py-3">
					Action {/* Åtgärd */}
				</th>
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
								src={`/image/${user.image}`}
								alt={`${user.firstName} ${user.lastName}`}
							/>
							<div className="ps-3">
								<div className="text-base font-semibold">{`${user.firstName} ${user.lastName}`}</div>
								<div className="font-normal text-gray-500">{user.email}</div>
							</div>
						</th>
						<td className="px-6 py-4">{user.phone}</td>
						<td className="px-6 py-4">{user.classroom}</td>
						<td className="px-6 py-4">
							<button
								type="button"
								onClick={(e) => {
									e.stopPropagation();
									openModal(user);
								}}
								className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
							>
								Edit user {/* Redigera användare */}
							</button>
						</td>
					</tr>
				</tbody>
			))}

			{selectedUser && (
				<StudentEditModal
					showModal={showModal}
					selectedUser={selectedUser}
					editedFirstName={editedFirstName}
					editedLastName={editedLastName}
					editedEmail={editedEmail}
					editedPhone={editedPhone}
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
