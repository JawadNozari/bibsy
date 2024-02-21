import React, { useRef } from "react";
import QRCode from "qrcode.react";
import { Staff, Student } from "@prisma/client";
import { toPng } from "html-to-image";

interface StaticModalProps {
	showModal: boolean; // Prop to determine whether the modal should be displayed
	toggleModal: () => void; // Function to toggle the modal
	selectedUser: Staff | Student | null; // Selected user data
}

const StaticModal: React.FC<StaticModalProps> = ({
	showModal,
	toggleModal,
	selectedUser,
}) => {
	const elementRef = useRef<HTMLDivElement>(null);

	const htmlToImageConvert = () => {
		if (elementRef.current) {
			toPng(elementRef.current, { cacheBust: false })
				.then((dataUrl) => {
					const link = document.createElement("a");
					link.download = "my-image-name.png";
					link.href = dataUrl;
					link.click();
				})
				.catch((err) => {
					console.debug(err);
				});
		}
	};

	return (
		<>
			{/* Modal overlay */}
			{showModal && (
				<div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 ">
					{/* Modal content */}
					<div className="bg-white  dark:bg-gray-800 rounded-lg shadow-lg p-8 max-w-md w-full">
						{/* Modal header */}
						<div className="flex items-center justify-between mb-4">
							<h3>NTI</h3>
							<h3 className="text-xl font-semibold text-gray-300">
								School Card
							</h3>
							<button
								type="button"
								onClick={toggleModal}
								className="flex justify-self-end text-gray-500 hover:text-gray-700"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="h-6 w-6"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
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
						{/* Modal body */}
						<div
							className="  dark:bg-gray-800 flex justify-center"
							ref={elementRef}
						>
							<div
								className="p-8 bg-white shadow-lg rounded-lg"
								style={{
									backgroundImage: "url('/cardResize.png')",
									backgroundSize: "cover",
									backgroundPosition: "center",
									height: "300px",
									width: "210px",
									position: "relative", // Ensure the QR code and text appear over the image
								}}
							>
								{/* Check if selectedUser exists */}
								{selectedUser && (
									<div className="flex flex-col justify-between h-full">
										<div
											style={{
												backgroundImage: `url('${selectedUser.image}')`,
												backgroundSize: "cover",
												backgroundPosition: "center",
												height: "300px",
												width: "100px",
												position: "relative",
												borderRadius: "10px",
												border: "1px solid white",
											}}
										/>
										<>
											<div className="w-2/3 text-center py-2">
												<p>
													<strong className="text-base text-white">
														{selectedUser.firstName}
													</strong>
												</p>
												<p>
													<strong className="text-base text-white">
														{selectedUser.lastName}
													</strong>
												</p>
												<hr className="h-px my-2 bg-white border-0" />
											</div>
											<div className="flex justify-center items-center">
												<QRCode
													value={selectedUser.qrCode}
													size={64}
													level={"H"}
												/>
											</div>
										</>
									</div>
								)}
							</div>
						</div>
						{/* Modal footer */}
						<div className="mt-4 flex justify-center">
							<button
								onClick={htmlToImageConvert}
								className="px-4 py-2 mr-2 bg-green-500 text-white rounded-md hover:bg-blue-600"
								type="button"
							>
								Download
							</button>
							<button
								onClick={toggleModal}
								className="px-4 py-2 ml-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
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
