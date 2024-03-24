// import type React from "react";
// import Image from "next/image";

// interface StaticModalProps {
// 	bookInfo: {
// 		id: number;
// 		price: number;
// 		title: string;
// 		author: string;
// 		publishers: string;
// 		published: string;
// 		invNr: number;
// 		isbn: string;
// 		bookImg: string;
// 	};
// }
// // Component
// const BookInfo: React.FC<StaticModalProps> = ({ bookInfo }) => {
// 	return (
// 		<div>
// 			<div className="flex justify-center items-center bg-gray-100 dark:bg-gray-700">
// 				<div className="p-2 bg-white shadow-lg rounded-lg dark:bg-gray-800 my-3">
// 					{/* Title */}
// 					<h3 className="text-lg text-black dark:text-gray-100 font-bold mb-2">
// 						{bookInfo.title}
// 					</h3>
// 					{/* Image */}
// 					<div className="relative h-64 w-48 m-auto">
// 						<Image
// 							className="m-auto"
// 							src={`/${bookInfo.bookImg}`}
// 							alt={`${bookInfo.title} book cover`}
// 							layout="fill"
// 						/>
// 					</div>
// 					{/* Author */}  
// 					<p className="text-gray-700 text-base mt-4 dark:text-gray-100">
// 						<span className="font-semibold">Author:</span> {bookInfo.author}
// 					</p>
// 					{/* Published */}
// 					<p className="text-gray-700 text-base dark:text-gray-100">
// 						<span className="font-semibold">Published:</span>{" "}
// 						{bookInfo.published.split("T")[0]}
// 					</p>
// 					{/* Publishers */}
// 					<p className="text-gray-700 text-base dark:text-gray-100">
// 						<span className="font-semibold">Publishers:</span>{" "}
// 						{bookInfo.publishers}
// 					</p>
// 					{/* Isbn and invNr */}
// 					<p className="text-gray-700 text-base dark:text-gray-100">
// 						<span className="font-semibold">ISBN:</span> {bookInfo.isbn}{" "}
// 						<span className="font-semibold"> invNr:</span> {bookInfo.invNr}
// 					</p>
// 				</div>
// 			</div>
// 		</div>
// 	);
// };

// export default BookInfo;
