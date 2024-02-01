"use client";
import React from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();
  const [books, setBooks] = React.useState([]);
  React.useEffect(() => {
    const getBooks = async () => {
      try {
        const response = await axios.get("/api/registeredBooks");
        setBooks(response.data.books);
      } catch (err) {
        console.log(err);
      }
    };
    getBooks();
  }, []);

  const handleSearch = async (event: any) => {
    event.preventDefault();
    const bookTitle = event.target.bookTitle.value;
    const response = await axios.post("/api/searchForBooks", {
      bookTitle,
      listType: "allBooks",
    });
    setBooks(response.data.books);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-between  p-24 bg-neutral-50">
      <div className=" overflow-x-auto shadow-md sm:rounded-lg overflow-scroll w-4/5 h-[38rem] dark:bg-gray-600">
        <h1 className="text-4xl text-center font-bold  dark:bg-gray-700   dark:text-gray-100 p-10">
          Registered Books
        </h1>
        <form method="POST" onSubmit={handleSearch}>
          <input
            type="text"
            name="bookTitle"
            id="bookTitle"
            placeholder="Book Title"
            style={{ color: "black" }}
          />
          <button type="submit">Submit</button>
        </form>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xl sticky top-0 text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Title
              </th>
              <th scope="col" className="px-6 py-3">
                Author
              </th>
              <th scope="col" className="px-6 py-3">
                ISBN
              </th>
              <th scope="col" className="px-6 py-3">
                Published
              </th>
              <th scope="col" className="px-6 py-3">
                Registered
              </th>
              <th scope="col" className="px-6 py-3">
                Available
              </th>
            </tr>
          </thead>
          <tbody>
            {books.map((book: any) => {
              return (
                <tr
                  className="bg-white border-b dark:bg-gray-600 dark:border-gray-500 hover:bg-gray-50 dark:hover:bg-gray-600"
                  key={book.invNr}
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >{`${book.title}`}</th>
                  <td className="px-6 py-4">{`${book.author}`}</td>
                  <td className="px-6 py-4">{`${book.isbn}`}</td>
                  <td className="px-6 py-4">{`${
                    book.published.split("T")[0]
                  }`}</td>
                  <td className="px-6 py-4">{`${
                    book.regDate.split("T")[0] +
                    " " +
                    book.regDate.split("T")[1].split(".")[0]
                  }`}</td>
                  {book.available ? (
                    <td
                      className="px-6 py-4"
                      style={{ backgroundColor: "lightgreen", color: "black" }}
                    >{`${book.available}`}</td>
                  ) : (
                    <td
                      className="px-6 py-4"
                      style={{ backgroundColor: "tomato", color: "black" }}
                    >{`${book.available}`}</td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div
        style={{ width: 1000, display: "flex", justifyContent: "space-around" }}
      >
        <button
          onClick={() => router.push("/home/allbooks")}
          style={{ backgroundColor: "lightblue", color: "black" }}
        >
          All Books
        </button>
        <button
          onClick={() => router.push("/home/available")}
          style={{ backgroundColor: "lightblue", color: "black" }}
        >
          Available Books
        </button>
        <button
          onClick={() => router.push("/home/borrowed")}
          style={{ backgroundColor: "lightblue", color: "black" }}
        >
          Borrowed Books
        </button>
        <button
          onClick={() => router.push("/home/missing")}
          style={{ backgroundColor: "lightblue", color: "black" }}
        >
          Missing Books
        </button>
      </div>
    </div>
  );
};

export default Page;
