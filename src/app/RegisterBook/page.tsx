"use client";

import React, { useState, FormEvent } from "react";
import axios from "axios";

interface BookFormProps {}

const BookForm: React.FC<BookFormProps> = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [isbn, setIsbn] = useState("");
  const [invNr, setInvNr] = useState("");
  const [datePublished, setDatePublished] = useState("");
//   const [remember, setRemember] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("/api/bookRegister", {
        title,
        author,
        isbn,
        invNr,
        datePublished,
      });
      console.log("Book submitted successfully");
    } catch (error) {
      console.error("Error submitting book:", error);
    }
  };

  return (
    <div className="flex items-center  shadow-2xl justify-center h-screen bg-white w-ful ">
        <form onSubmit={handleSubmit} className=" shadow-2xl shadow-black bg-purple-600 p-6 rounded-2xl max-w-9xl h-5/6 w-10/12">
        <div className="grid gap-20	 mb-6 md:grid-cols-2">
            <div>
            <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
             <input
                type="text"
                id="title"
                name="title"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="The Catcher in the Rye"
                required
            />
            </div>
            <div>
            <label htmlFor="author" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Author</label>
            <input
                type="text"
                id="author"
                name="author"
                onChange={(e) => setAuthor(e.target.value)}
                value={author}
                className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="J.D. Salinger"
                required
            />
            </div>
            <div>
            <label htmlFor="isbn" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">ISBN</label>
            <input
                type="number"
                id="isbn"
                name="isbn"
                onChange={(e) => setIsbn(e.target.value)}
                value={isbn}
                className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="777"
                required
            />
            </div>
            <div>
            <label htmlFor="invNr" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">invNr</label>
            <input
                type="number"
                id="invNr"
                name="invNr"
                onChange={(e) => setInvNr(e.target.value)}
                value={invNr}
                className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="123456"
                required
            />
            </div>
            <div className=' my-8'>
            <label htmlFor="datePublished" className="block mb-2 text-sm font-medium  text-gray-900 dark:text-white">Scan</label>
            <input
                type="date"
                id="datePublished"
                name="datePublished"
                onChange={(e) => setDatePublished(e.target.value)}
                value={datePublished}
                className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 end-0	"
                placeholder="1951-07-16"
                required
            />
            </div>
        </div>

        
                
        
        <button type="submit" className="bg-blue-500 text-white text-sm my-24 font-medium px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-50 dark:focus:ring-offset-gray-700">Register</button>
        </form>
    </div>
  );
};

export default BookForm;
