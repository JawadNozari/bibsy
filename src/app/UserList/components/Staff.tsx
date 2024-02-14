import React, { useState } from "react"; // Importera React och useState-hook från React-biblioteket
import Image from "next/image"; // Importera Image-komponenten från Next.js-biblioteket för att visa bilder
import StaffEditModal from "./StaffEditModal"; // Importera StaffEditModal-komponenten från en annan fil

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

// Definierar en interface för egenskaper som StaffList-komponenten förväntar sig ta emot
interface StaffListProps {
	staffUsers: User[]; // En array av användare
	handleClick: (user: User | null) => void; // En funktion för att hantera klick på användare
}

// Definierar en funktionell komponent StaffList som tar emot egenskaper definierade av StaffListProps
const StaffList: React.FC<StaffListProps> = ({ staffUsers, handleClick }) => {
	// State-hooks
	const [showModal, setShowModal] = useState(false); // Visar eller döljer modalen för att redigera användare
	const [selectedUser, setSelectedUser] = useState<User | null>(null); // Den användare som är vald för redigering
	const [editedUser, setEditedUser] = useState<User | null>(null); // Den användare som redigeras
	const [editedFirstName, setEditedFirstName] = useState(""); // Det redigerade förnamnet
	const [editedLastName, setEditedLastName] = useState(""); // Det redigerade efternamnet
	const [editedEmail, setEditedEmail] = useState(""); // Den redigerade e-postadressen
	const [editedPhone, setEditedPhone] = useState(""); // Det redigerade telefonnumret
	const [editedAdmin, setEditedAdmin] = useState("false"); // Boolean-värdet för om användaren är administratör
	const [selectedImage, setSelectedImage] = useState<File | null>(null); // Den valda bilden för användaren
	const [imagePreview, setImagePreview] = useState<string | null>(null); // Förhandsgranskning av bilden
	const [showFullImage, setShowFullImage] = useState(false); // Visar hela bilden

	// Öppnar redigeringsmodalen för en specifik användare
	const openModal = (user: User) => {
		setSelectedUser(user);
		setEditedUser(user);
		setEditedFirstName(user.firstName);
		setEditedLastName(user.lastName);
		setEditedEmail(user.email);
		setEditedPhone(user.phone);
		setEditedAdmin(String(user.admin)); // Konvertera boolean-värdet till en sträng för radioknapp
		setImagePreview(user.image); // Visa förhandsgranskning av bilden när modalen öppnas
		setShowModal(true); // Visa modalen
	};

	// Stänger modalen
	const closeModal = () => {
		setShowModal(false); // Döljer modalen
	};

	// Hanterar redigeringen av en användare
	const handleEditUser = () => {
		if (editedUser) {
			const updatedUsers = [...staffUsers];
			const index = updatedUsers.findIndex((user) => user.id === editedUser.id);

			if (index !== -1) {
				updatedUsers[index] = {
					...updatedUsers[index],
					firstName: editedFirstName,
					lastName: editedLastName,
					email: editedEmail,
					phone: editedPhone,
					admin: editedAdmin === "true", // Konvertera strängen till boolean
					image: selectedImage ? selectedImage.name : editedUser.image, // Uppdatera bilden om en ny är vald
				};
			}

			console.log("Updated user information:", updatedUsers[index]); // Skriv ut uppdaterad användarinformation
			closeModal(); // Stänger modalen
		}
	};

	// Hanterar ändringar i inputfältet
	const handleInputChange = (
		event: React.ChangeEvent<HTMLInputElement>,
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
			case "admin":
				setEditedAdmin(value);
				break;
			case "image":
				// Uppdaterar bildstatet när en ny bild väljs
				if (event.target.files?.[0]) {
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
		// Uppdaterar editedUser-state
		setEditedUser((prevUser: User | null) => ({
			...prevUser,
			firstName: editedFirstName,
			lastName: editedLastName,
			email: editedEmail,
			phone: editedPhone,
			classroom: editedAdmin, // Antagande: Du vill uppdatera classroom också
			id: editedUser?.id || 0,
			password: editedUser?.password || "",
			admin: editedUser?.admin || false,
			qrCode: editedUser?.qrCode || 0,
			image: selectedImage ? selectedImage.name : editedUser?.image || "", // Tilldela en tom sträng om 'editedUser?.image' är undefined
		}));
	};

	// Renderar JSX-kod för StaffList-komponenten
	return (
		<>
			{/* Renderar en tabell med användare */}
			<thead>
				<tr>
					<th colSpan={4} className="text-lg font-bold px-6 py-3">
						Staff Users:
					</th>
				</tr>
			</thead>
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
						{/* Renderar användarinformation */}
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
						<td className="px-6 py-4">
							<div className="flex items-center">
								<div className="h-4 w-0.5">{user.admin ? "Yes" : "No"}</div>
							</div>
						</td>
						<td className="px-6 py-4">
							{/* Knapp för att öppna redigeringsmodalen */}
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
					</tr>
				</tbody>
			))}
			{/* Visar redigeringsmodalen om en användare är vald */}
			{selectedUser && (
				<StaffEditModal
					showModal={showModal}
					selectedUser={selectedUser}
					editedFirstName={editedFirstName}
					editedLastName={editedLastName}
					editedEmail={editedEmail}
					editedPhone={editedPhone}
					editedAdmin={editedAdmin}
					imagePreview={imagePreview}
					showFullImage={showFullImage}
					handleInputChange={handleInputChange}
					handleEditUser={handleEditUser}
					closeModal={closeModal}
					setShowFullImage={setShowFullImage} // Lägg till den saknade egenskapen
				/>
			)}
		</>
	);
};

export default StaffList; // Exporterar StaffList-komponenten
