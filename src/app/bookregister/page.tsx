//TODO Handle ERRORS!!!!
//TODO If image cant be loaded, show "no-cover-jpg" as default image

"use client";
import React, { useState } from "react";
import axios, { AxiosResponse } from "axios";
import Image from "next/image";
import { Book } from "@prisma/client";

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
	const [gotError, setGotError] = useState<boolean>(false);

	// Function to search for book by ISBN using Google Books API
	const searchByIsbn = async () => {
		try {
			const bookinfo: AxiosResponse<BookData> = await axios.get(
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
				console.log(imageUrl);
				console.log(isbn);
			}
		} catch (error) {
			setGotError(true);
			console.error(error);
		}
	};

	// Function to handle form submission
	const formSubmit = async () => {
		const formData = new FormData();
		let imagePath = "";
		if (file !== undefined) {
			formData.append("file", file || undefined);
			formData.append("path", "bookImage");
			imagePath = await axios
				.post("/api/uploader", formData, {
					headers: { "Content-Type": "multipart/form-data" },
				})
				.then((res) => {
					return res.data.path;
				})
				.catch((error: Error) => {
					console.debug(error);
					console.log("there is issue when getting path from uploader ");
				});
		}
		if (imageUrl) {
			const userData = { filename: isbn, url: imageUrl };
			imagePath = await axios
				.post("/api/fileDownloader", userData)
				.then((res) => {
					return res.data.path;
				})
				.catch((Err) => {
					setGotError(true);
					setMessage(Err);
				});
		}
		const userData: Book = {
			bookImg: imagePath,
			title: title,
			author: author,
			publishers: publishers,
			published: published,
			isbn: isbn,
			invNr: invNr,
			price: price,
			available: true,
			id: 0,
			regDate: new Date(),
		};

		// Post form data to backend
		await axios
			.post("/api/bookReg", userData)
			.then((res) => {
				setGotError(false);
				setMessage(res.data.Message);
			})
			.catch((err) => {
				setGotError(true);
				setMessage(err.message);
			});
	};

	return gotError ? (
		// Show error message
		<div className="flex justify-center items-center h-screen w-screen">
			{message}
		</div>
	) : (
		// Render form and book details
		<div className="flex flex-col h-100 w-100 justify-center items-center">
			{/* ISBN input for google book api search*/}
			<div>
				<label>ISBN</label>
				<input
					type="text"
					id="isbn"
					value={isbn}
					onChange={(e) => setIsbn(e.target.value)}
					placeholder="Enter ISBN"
					maxLength={13}
				/>
			</div>

			{/* Search button */}
			<div>
				<button type="button" onClick={searchByIsbn}>
					Search
				</button>
			</div>

			{/* Form fields */}
			<div>
				<label>Title</label>
				<input
					type="text"
					id="title"
					value={title}
					onChange={(e) => setTitle(e.target.value)}
					placeholder="Enter Title"
				/>
			</div>
			<div>
				<label>Author</label>
				<input
					type="text"
					id="author"
					value={author}
					onChange={(e) => setAuthor(e.target.value)}
					placeholder="Enter Author"
				/>
			</div>
			<div>
				<label>Publisher</label>
				<input
					type="text"
					id="publisher"
					value={publishers}
					onChange={(e) => setPublishers(e.target.value)}
					placeholder="Enter Publisher"
				/>
			</div>
			<div>
				<label>Published Date</label>
				<input
					type="date"
					id="publishedDate"
					value={published ? published.toISOString().split("T")[0] : ""}
					onChange={(e) => setPublished(new Date(e.target.value))}
					placeholder="Enter Published Date"
				/>
			</div>
			<div>
				<label>InvNr</label>
				<input
					type="number"
					id="invNr"
					value={invNr}
					onChange={(e) => setInvNr(e.target.valueAsNumber)}
					placeholder="Enter InvNr"
				/>
			</div>
			<div>
				<label>Price</label>
				<input
					type="number"
					id="price"
					value={price}
					onChange={(e) => setPrice(e.target.valueAsNumber)}
					placeholder="Enter Price"
				/>
			</div>
			<div>
				<input
					type="file"
					id="customFile"
					onChange={(e) => {
						setFile(e.target.files?.[0]);
					}}
				/>
			</div>
			{/* Display thumbnail URL */}
			<div>
				{imageUrl && (
					<div>
						<p>Thumbnail URL: {imageUrl}</p>
					</div>
				)}
			</div>
			{/* Submit button */}
			<div>
				<button type="button" onClick={formSubmit}>
					Submit
				</button>
			</div>

			{/* Display available book details */}
			{bookData?.items?.[0] && (
				<div className="mt-4">
					<h2 className="text-xl font-bold">Book Details:</h2>
					<p>Title: {title}</p>
					<p>Authors: {author}</p>
					<p>Publisher: {publishers}</p>
					{published && <p>Published Date: {published.toString()}</p>}
					{bookData?.items?.[0]?.volumeInfo?.imageLinks?.thumbnail && (
						<Image
							src={bookData.items[0].volumeInfo.imageLinks.thumbnail}
							alt="Book Cover"
							className="mt-2"
							width={100}
							height={150}
						/>
					)}
				</div>
			)}
		</div>
	);
}
