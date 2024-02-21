"use client";
import React, { useState } from "react";
import axios from "axios";
import Image from "next/image";
import { Book } from "@prisma/client";
import Navigation from "../components/navigation";

interface VolumeInfo {
	title: string;
	authors?: string[];
	publisher: string;
	publishedDate: string;
	imageLinks: {
		thumbnail?: string;
	};
}

interface BookData {
	items: {
		volumeInfo: VolumeInfo;
	}[];
}

export default function Home() {
	// variables for form fields and book data
	const [file, setFile] = useState<File | undefined>(undefined);
	const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);
	const [isbn, setIsbn] = useState("");
	const [invNr, setInvNr] = useState<number>(0);
	const [price, setPrice] = useState<number>(0);
	const [title, setTitle] = useState<string>("");
	const [author, setAuthor] = useState<string>("");
	const [publishers, setPublishers] = useState<string>("");
	const [published, setPublished] = useState<Date>(new Date());
	// variables for book search result and error handling
	const [bookData, setBookData] = useState<BookData | null>(null);
	const [message, setMessage] = useState<string | undefined>("");
	const [status, setStatus] = useState<number>(0);

	// Function to search for book by ISBN using Google Books API
	const searchByIsbn = async () => {
		try {
			const bookinfo = await axios.get<BookData>(
				`https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`,
			);

			if (bookinfo.data.items && bookinfo.data.items.length > 0) {
				const bookVolumeInfo = bookinfo.data.items[0].volumeInfo;

				// Set form fields with book data
				setIsbn(isbn);
				setTitle(bookVolumeInfo.title);
				setAuthor(
					bookVolumeInfo.authors ? bookVolumeInfo.authors.join(", ") : "",
				);
				setPublishers(bookVolumeInfo.publisher);
				setPublished(new Date(bookVolumeInfo.publishedDate));

				setImageUrl(bookVolumeInfo.imageLinks.thumbnail || "");
				// Set book data
				setBookData(bookinfo.data);
			}
		} catch (error) {
			setMessage("Error occurred while fetching book data");
			console.error(error);
		}
	};

	const formSubmit = async () => {
		try {
			const formData = new FormData();
			let imagePath = "";

			// File upload logic (if needed)
			// Replace 'file' with your actual file input reference
			if (file !== undefined) {
				formData.append("file", file);
				formData.append("path", "bookImage");

				const uploadResponse = await axios.post("/api/uploader", formData, {
					headers: { "Content-Type": "multipart/form-data" },
				});
				imagePath = uploadResponse.data.path;
			}

			// Image download logic (if imageUrl is available)
			if (imageUrl) {
				const userData = { filename: isbn, url: imageUrl };
				const downloadResponse = await axios.post(
					"/api/fileDownloader",
					userData,
				);
				imagePath = downloadResponse.data.path;
			}

			// Create book data object
			const userData: Book = {
				bookImg: imagePath,
				title,
				author,
				publishers,
				published,
				isbn,
				invNr,
				price,
				available: true,
				id: 0,
				regDate: new Date(),
			};

			// Post form data to backend
			const response = await axios.post("/api/bookReg", userData);
			setStatus(response.data.status);
			setMessage(response.data.Message);

			// if (status === 405){
			//     setGotError(true);
			//     setMessage("Looks like this InvNr is already Registered");
			// }
		} catch (error) {
			setMessage("An error occurred while registering the book");
			console.error(error);
		}
	};


	// return status ? (
	// 	  // Show error message
	//   	<div className="flex justify-center items-center h-screen w-screen">
	// 	  	{/* if status is 405 (invNr already exist) it will show message here */}
	// 		  {status === 405 && <div className="text-red-500 mt-4">{message}</div>}
	// 	  </div>
	//   ) : (

  // flex justify-center items-center  md: h-screen bg-white gap-11 w-full 
  return (
    <div className="flex justify-center items-center  md: h-screen bg-white gap-11 w-full "> 
    <div>
      <Navigation />
    </div>
      <div className="flex items-center justify-center  md:flex-row md:items-start w-full">
        <div className="shadow-2xl  shadow-black bg-gray-800  text-neutral-50 p-6 rounded-2xl max-w-2xl  w-10/12">
          <form>
            <div className="grid gap-10 md:grid-cols-2">
              <div className="relative z-0 mb-5 group col-span-2 flex items-center justify-center">
                {/* ISBN input for google book api search*/}
                <input
                  type="number"
                  name="isbn"
                  id="isbn"
                  value={isbn}
                  onChange={(e) => setIsbn(e.target.value)}
                  className="block py-2.5 px-0 w-3/5 text-sm text-neutral-50 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                  maxLength={13}
                />
                {/* Search button */}
                <button
                  type="button"
                  onClick={searchByIsbn}
                  className=" btn ml-2 px-4 py-2 bg-neutral-50  text-gray-500 hover:text-gray-100 hover:bg-gray-800 dark:bg-gray-700   btn-active"
                >
                  Search
                </button>
                <label htmlFor="isbn" className="peer-focus:font-medium absolute text-xl text-center text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-100 top-3 left-0 right-0 mx-auto -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-2/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-100 peer-focus:-translate-y-6">
                  ISBN
                </label>
              </div>
        
              {/* Rest of the form fields */}
              <div className="relative z-0 mb-5 group">
                <input
                  type="text"
                  name="title"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="block py-2.5 px-0 w-full text-sm text-neutral-50 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                />
                <label
                  htmlFor="title"
                  className="peer-focus:font-medium absolute text-xl text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 left-0 right-0 mx-auto -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 "
                >
                  Title
                </label>
              </div>

              <div className="relative z-0 mb-5 group">
                <input
                  type="text"
                  name="author"
                  id="author"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  className="block py-2.5 px-0 w-full text-sm text-neutral-50 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                />
                <label
                  htmlFor="author"
                  className="peer-focus:font-medium absolute text-xl text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 left-0 right-0 mx-auto -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Author   
                </label>
              </div>

              <div className="relative z-0 mb-5 group">
                <input
                  type="number"
                  name="invNr"
                  id="invNr"
                  value={invNr}
                  onChange={(e) => setInvNr(e.target.valueAsNumber)}
                  className="block py-2.5 px-0 w-full text-sm text-neutral-50 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                  max={10}
                />
                <label
                  htmlFor="invNr"
                  className="peer-focus:font-medium absolute text-xl text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 left-0 right-0 mx-auto -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  invNr
                </label>
              </div>

              <div className="relative z-0 mb-5 group">
                <input
                  type="date"
                  name="datePublished"
                  id="datePublished"
                  value={published ? published.toISOString().split("T")[0] : ""}
                  onChange={(e) => setPublished(new Date(e.target.value))}
                  className="block py-2.5 px-0 w-full text-sm text-neutral-50 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                />
                <label
                  htmlFor="datePublished"
                  className="peer-focus:font-medium absolute text-xl text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 left-0 right-0 mx-auto -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Published Date
                </label>
              </div>

              <div className="relative z-0 mb-5 group">
                <input
                  type="number"
                  name="price"
                  id="price"
                  value={price}
                  onChange={(e) => setPrice(e.target.valueAsNumber)}
                  className="block py-2.5 px-0 w-full text-sm text-neutral-50 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                />
                <label
                  htmlFor="price"
                  className="peer-focus:font-medium absolute text-xl text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 left-0 right-0 mx-auto -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Price
                </label>
              </div>

              <div className="relative z-0 mb-5 group">
                <input
                  type="text"
                  name="publisher"
                  id="publisher"
                  value={publishers}
                  onChange={(e) => setPublishers(e.target.value)}
                  className="block py-2.5 px-0 w-full text-sm text-neutral-50 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                />
                <label
                  htmlFor="publisher"
                  className="peer-focus:font-medium absolute text-xl  text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 left-0 right-0 mx-auto -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Publisher
                </label>
              </div>
              
              {/* File upload input */}
              <div className="relative z-0 mb-5 group col-span-2">
                <input
                  type="file"
                  name="file"
                  id="file"
                  onChange={(e) => {
                    setFile(e.target.files?.[0]);
                  }}
                  className="block py-2.5 px-0 w-full text-sm text-neutral-50 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  required
                />
                <label
                  htmlFor="file"
                  className="peer-focus:font-medium absolute text-xl text-center text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-100 top-3 left-0 right-0 mx-auto -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-2/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-100 peer-focus:-translate-y-6"
                >
                  File Upload
                </label>
              </div>
            </div>
          </form>

          {/* Display book saved  message */}
          {message && <div>{message}</div>}
          {status === 405 && <div className="text-red-500 mt-4">{message}</div>}


          <button type="submit" onClick={formSubmit} className=" btn block bg-neutral-50  hover:text-gray-100 hover:bg-gray-800  text-gray-500 dark:bg-gray-700  btn-active ">
            Register
          </button>
        </div>

        {/* Display available book details */}
			  {bookData?.items?.[0] && (
				  <div className=" w-96 drop-shadow-2xl ">
					  <h2 className="text-3xl text-center font-bold">Book Image</h2>
					  {bookData?.items?.[0]?.volumeInfo?.imageLinks?.thumbnail && (
              <div className="flex  m-5 justify-center">
                <Image
                  src={bookData.items[0].volumeInfo.imageLinks.thumbnail}
                  alt="Book Cover"
                  className="mt-2"
                  width={300}
                  height={500}
                />
						  </div>
					  )}
				  </div>
			  )}
      </div>
    </div>
  );
};