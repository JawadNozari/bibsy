import React from "react";
import Image from "next/image";
import SelectComponent from "./SelectComponent"; // Importerar SelectComponent-komponenten

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

interface StudentEditModalProps {
  showModal: boolean; // Boolean som indikerar om modalen ska visas eller inte
  selectedUser: User | null; // Den valda användaren som ska redigeras, eller null om ingen användare är vald
  editedFirstName: string; // Den redigerade förnamnet för den valda användaren
  editedLastName: string; // Den redigerade efternamnet för den valda användaren
  editedEmail: string; // Den redigerade e-postadressen för den valda användaren
  editedPhone: string; // Den redigerade telefonnumret för den valda användaren
  imagePreview: string | null; // En förhandsgranskning av användarens bild, eller null om ingen bild valts
  showFullImage: boolean; // Boolean som indikerar om den fullständiga bilden ska visas eller inte
  setShowFullImage: React.Dispatch<React.SetStateAction<boolean>>; // Funktion för att uppdatera showFullImage-variabeln
  handleInputChange: (
    event: React.ChangeEvent<HTMLInputElement>,
    field: string,
  ) => void; // Funktion för att hantera ändringar i inmatningsfält
  handleEditUser: () => void; // Funktion för att utföra redigeringen av användaren
  closeModal: () => void; // Funktion för att stänga modalen
}

const StudentEditModal: React.FC<StudentEditModalProps> = ({
  showModal,
  selectedUser,
  editedFirstName,
  editedLastName,
  editedEmail,
  editedPhone,
  imagePreview,
  showFullImage,
  setShowFullImage,
  handleInputChange,
  handleEditUser,
  closeModal,
}) => {
  function handleKeyDown(event: React.KeyboardEvent<HTMLDivElement>): void {
    throw new Error("Function not implemented."); // Funktion för att kasta ett felmeddelande om en tangenttryckning inte är implementerad
  }

  return (
    <div
      className={`fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-500 bg-opacity-50 ${
        showModal ? "" : "hidden" // Visar eller döljer modalen beroende på showModal-värdet
      }`}
    >
      <div className="bg-white p-6 md:p-8 w-full max-w-md mx-auto rounded-lg shadow-lg z-50">
        <div className="flex items-center justify-between border-b">
          <h2 className="text-lg font-semibold text-gray-900">
            Edit {`${selectedUser?.firstName} ${selectedUser?.lastName}`} {/* Rubrik för att redigera användarens för- och efternamn */}
          </h2>
          <button
            type="button"
            onClick={closeModal} // Funktion för att stänga modalen när knappen klickas
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
                First Name {/* Label för förnamnsfält */}
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
                Last Name {/* Label för efternamnsfält */}
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
                Email {/* Label för e-postfält */}
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
                Phone {/* Label för telefonfält */}
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
                Classroom {/* Label för klassrumsfält */}
              </label>
              {/* Passar user.classroom som prop till SelectComponent */}
              {selectedUser && (
                <SelectComponent initialClassroom={selectedUser.classroom} />
              )}
            </div>
            <div className="mb-4">
              <label
                htmlFor="image"
                className="block text-sm font-medium text-gray-700"
              >
                Image {/* Label för bildfält */}
              </label>
              <input
                type="file"
                id="image"
                accept="image/*"
                onChange={(e) => handleInputChange(e, "image")}
                className="mt-1 p-1 border rounded-md"
              />
              {/* Om det finns en bildpreview, visas en miniatyrbild som kan klickas för att visa den i full storlek */}
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Selected"
                  className="mt-2 rounded-md cursor-pointer"
                  style={{ maxWidth: "100px" }}
                  onClick={() => setShowFullImage(true)} // Visa fullstorlek på bild vid klick
                  onKeyDown={handleKeyDown} // Lägg till denna rad
                />
              )}
              {/* Om fullbildsvisning är aktiverad, visas bilden i full storlek */}
              {showFullImage && (
                <div
                  className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-500 bg-opacity-50"
                  onClick={() => setShowFullImage(false)} // Stäng fullbildsvisning vid klick utanför bilden
                  onKeyDown={handleKeyDown} // Lägg till denna rad
                >
                  <div className="relative">
                    <Image
                      src={
                        imagePreview !== null
                          ? imagePreview
                          : "/default-image.png"
                      } // Ange en standardbild om det inte finns någon förhandsvisning
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
            {/* Lägg till fler formulärfält här */}
          </form>
        </div>
        <div className="mt-6 flex justify-end">
          <button
            type="button"
            onClick={handleEditUser} // Funktion för att bekräfta redigeringen av användaren
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none"
          >
            Confirm
          </button>
          <button
            type="button"
            onClick={closeModal} // Funktion för att avbryta redigeringen och stänga modalen
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
