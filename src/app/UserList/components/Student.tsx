import React, { useState } from "react";
import Image from "next/image";

interface StudentListProps {
    studentUsers: User[];
    handleClick: (user: User | null) => void;
    setStudentUsers?: React.Dispatch<React.SetStateAction<User[]>>;
}

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

const SelectComponent: React.FC = () => {
    const [selectedClassroom, setSelectedClassroom] = useState<string>('');

    
    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedClassroom(event.target.value);
    };
    
    const generateClassroomOptions = () => {
        const currentYear = new Date().getFullYear();
        const specialties = ['TEK', 'EL', 'DES'];
        const lastYearClassroom = 'TE4';
        
        const classroomOptions = specialties.flatMap(specialty =>
            Array.from({ length: 4 }, (_, index) => `${(currentYear - index).toString().slice(-2)}${specialty}`)
            );
            
            // Add TE4 for the last year
            classroomOptions.push(lastYearClassroom);
            
            // Sort the classroom options based on the extracted numbers
            classroomOptions.sort((a, b) => {
                const numA = parseInt(a.slice(0, 2));
                const numB = parseInt(b.slice(0, 2));
                return numA - numB;
            });
            
            return classroomOptions;
        };
        const classroomOptions = generateClassroomOptions();
        
    return (
        <div>
            <select value={selectedClassroom} onChange={handleChange}>
                <option value="">Select</option>
                {classroomOptions.map(classroom => (
                    <option key={classroom} value={classroom}>
                        {classroom}
                    </option>
                ))}
            </select>
        </div>
    );
};

const StudentList: React.FC<StudentListProps> = ({
    studentUsers,
    handleClick,
    setStudentUsers,
}) => {
    // Statevariabler:
    const [showModal, setShowModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    // State för redigerad användarinformation:
    const [editedUser, setEditedUser] = useState<User | null>(null);
    const [editedFirstName, setEditedFirstName] = useState("");
    const [editedLastName, setEditedLastName] = useState("");
    const [editedEmail, setEditedEmail] = useState("");
    const [editedPhone, setEditedPhone] = useState("");
    const [editedClassroom, setEditedClassroom] = useState("");

    // Funktioner för att hantera modalfönstret:
    const openModal = (user: User) => {
        setSelectedUser(user);
        setEditedUser(user);
        setEditedFirstName(user.firstName);
        setEditedLastName(user.lastName);
        setEditedEmail(user.email);
        setEditedPhone(user.phone);
        setEditedClassroom(user.classroom);
        setShowModal(true);
    };

    // ... (stänger modal, rensar redigeringsinformation)
    const closeModal = () => {
        setShowModal(false);
    };

    // Funktion för att hantera redigering av användare:
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
                };

                if (setStudentUsers) {
                    setStudentUsers(updatedUsers); // Update the parent component's state
                }
            }

            console.log("Updated user information:", updatedUsers[index]);
            closeModal();
        }
    };

    // Funktion för att hantera ändringar i redigeringsfälten:
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
            image: editedUser?.image || "",
            admin: editedUser?.admin || false,
            qrCode: editedUser?.qrCode || 0,
        }));
    };

    return (
        <>
            <thead>
                <tr>
                    <th colSpan={4} className="text-lg font-bold px-6 py-3">
                        Student Users:
                        {/* <hr className="mt-4" /> */}
                    </th>
                </tr>
            </thead>
            <tr className="text-xs uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <th scope="col" className="px-6 py-3">
                    Name
                </th>
                <th scope="col" className="px-6 py-3">
                    Phone
                </th>
                <th scope="col" className="px-6 py-3">
                    Classroom
                </th>
                <th scope="col" className="px-6 py-3">
                    Action
                </th>
            </tr>
            {studentUsers?.map((user) => (
                <tbody key={user.id}>
                    <tr
                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                        tabIndex={0} // Make rows focusable
                        aria-label={`User details for ${user.firstName} ${user.lastName}`}
                        onClick={() => handleClick(user)}
                        onKeyDown={(event) => {
                            if (event.key === "Enter" || event.key === " ") {
                                handleClick(user); // Trigger handleClick on 'Enter' or 'Space'
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
                                src={`/image/${user.image}`} // Bygg upp den fullständiga sökvägen
                                alt={`${user.firstName} ${user.lastName}`}
                            />
                            <div className="ps-3">
                                <div className="text-base font-semibold">{`${user.firstName} ${user.lastName}`}</div>
                                <div className="font-normal text-gray-500">{user.email}</div>
                            </div>
                        </th>
                        <td className="px-6 py-4">{user.phone}</td>
                        <td className="px-6 py-4">
                        {user.classroom}                        </td>
                        <td className="px-6 py-4">
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

            {/* Modal */}
            {selectedUser && (
                <div
                    className={`fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-500 bg-opacity-50 ${
                        showModal ? "" : "hidden"
                    }`}
                >
                    <div className="bg-white p-6 md:p-8 w-full max-w-md mx-auto rounded-lg shadow-lg z-50">
                        <div className="flex items-center justify-between border-b">
                            <h2 className="text-lg font-semibold text-gray-900">
                                Edit {`${selectedUser.firstName} ${selectedUser.lastName}`}
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
                            {/* Edit form content */}
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
                                        htmlFor="classroom"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Classroom
                                    </label>
                                    <SelectComponent />
                                </div>
                            </form>
                        </div>
                        <div className="mt-6 flex justify-end">
                            <button
                                type="button"
                                onClick={handleEditUser}
                                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none"
                            >
                                Confirm
                            </button>
                            <button
                                type="button"
                                onClick={closeModal}
                                className="ml-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default StudentList;
