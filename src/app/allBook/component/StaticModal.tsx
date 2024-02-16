import React from "react";

interface StaticModalProps {
  showModal: boolean; // Prop to determine whether the modal should be displayed
  toggleModal: () => void; // Function to toggle the modal
}

const StaticModal: React.FC<StaticModalProps> = ({ showModal, toggleModal }) => {
  return (
    <>
      {/* Modal overlay */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          {/* Modal content */}
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
            {/* Modal header */}
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-gray-900">Book info</h3>
              <button
                type="button"
                onClick={toggleModal}
                className="text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <title>Close</title>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            {/* Modal body */}
            <div>
                <div className="flex justify-center items-center bg-gray-100">
                    <div className="p-8 bg-white shadow-lg rounded-lg">
                        <h1 className="text-2xl font-bold mb-4">Your Card Title</h1>
                        <p className="text-lg text-gray-700">
                        This is your card content. You can customize it as needed.
                        </p>
                    </div>
                </div>
            </div>
            {/* Modal footer */}
            <div className="mt-4 flex justify-end">
              <button
                onClick={toggleModal}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
                type="button"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default StaticModal;