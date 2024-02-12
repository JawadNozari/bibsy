"use client";
import React from "react";
import { Book, Student, Staff, borrowedBooks } from "@prisma/client";
import { useRouter } from "next/navigation";
import axios from "axios";

const Page = () => {
  const router = useRouter();
  const [books, setBooks] = React.useState<Book[]>([]);
  const [borrowedBooks, setBorrowedBooks] = React.useState<borrowedBooks[]>([]);
  const [students, setStudents] = React.useState<Student[]>([]);
  const [staff, setStaff] = React.useState<Staff[]>([]);

  React.useEffect(() => {
    const getBooks = async () => {
      const response = await axios("/api/registeredBooks");
      if (response.data.books !== null) {
        setBooks(response.data.books);

        await axios("/api/borrowedBooks").then((res) => {
          setBorrowedBooks(res.data.books);
        }).catch((Err: Error) => {
          console.debug(Err);
          return [];
        });
      }

      const users = await axios("/api/getUsers");
      setStudents(users.data.studentUsers);
      setStaff(users.data.staffUsers);
    };
    getBooks();
  }, []);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const userId = (event.currentTarget[0] as HTMLInputElement).value as unknown as number;
    const response = await axios.post("/api/borrowedBooks", { userId, userType: "staff" });
    setBorrowedBooks(response.data.books);
  };

  const setBookMissing = async (event: React.MouseEvent<HTMLElement>, bookId: number) => {
    event.stopPropagation();
    console.log(borrowedBooks);
    borrowedBooks.map((borrowedBook) => {
      if (borrowedBook.bookId === bookId) {
        borrowedBooks.splice(borrowedBooks.indexOf(borrowedBook), 1);
      }
    });
    setBorrowedBooks(borrowedBooks);

    const response = await axios.post("/api/setBookMissing", {
      bookId,
    });
    console.log(response.data);
  };

  const setBookAvailable = async (event: React.MouseEvent<HTMLElement>, bookId: number) => {
    event.stopPropagation();
    borrowedBooks.map((borrowedBook) => {
      if (borrowedBook.bookId === bookId) {
        borrowedBooks.splice(borrowedBooks.indexOf(borrowedBook), 1);
      }
    });
    setBorrowedBooks(borrowedBooks);

    const response = await axios.post("/api/setBookAvailable", {
      bookId,
      userType: "student",
      listType: "borrowed",
    });
    console.log(response.data);
  };

  const handleSearch = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const bookTitle = (event.currentTarget[0] as HTMLFormElement).value;
    const response = await axios.post("/api/searchForBooks", {
      bookTitle,
      listType: "borrowed",
    });
    setBooks(response.data.books);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-between  p-24 bg-neutral-50">
      <div className=" overflow-x-auto shadow-md sm:rounded-lg overflow-scroll w-4/5 h-[38rem] dark:bg-gray-600">
        <h1 className="text-4xl text-center font-bold  dark:bg-gray-700   dark:text-gray-100 p-10">
          Borrowed Books
        </h1>
        <form onSubmit={onSubmit}>
          <input type="text" name="userId" style={{ color: "black" }} placeholder="User ID" />
          <button type="submit">Submit</button>
        </form>
        <form
          method="POST"
          onSubmit={handleSearch}
        >
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
                Notes
              </th>
              <th scope="col" className="px-6 py-3">
                Registered
              </th>
              <th scope="col" className="px-6 py-3">
                Staff ID
              </th>
              <th scope="col" className="px-6 py-3">
                Student ID
              </th>
              <th scope="col" className="px-6 py-3" />
              <th scope="col" className="px-6 py-3" />
            </tr>
          </thead>
          <tbody>
            {books.map((book) => {
              return borrowedBooks.map((borrowedBook) => {
                if (borrowedBook.bookId === book.id) {
                  return (
                    <tr
                      className="bg-white border-b dark:bg-gray-600 dark:border-gray-500 hover:bg-gray-50 dark:hover:bg-gray-500 cursor-pointer active:bg-gray-200 dark:active:bg-gray-700"
                      key={book.invNr}
                      onClick={() =>
                        router.push(`/home/bookDetails/${book.invNr}`)
                      }
                      onKeyDown={() =>
                        router.push(`/home/bookDetails/${book.invNr}`)
                      }
                      style={{ zIndex: 1 }}
                    >
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >{`${book.title}`}</th>
                      <td className="px-6 py-4">{`${book.author}`}</td>
                      <td className="px-6 py-4">{`${borrowedBook.note}`}</td>
                      {/* //suggestion: this part needs cleanup */}
                      <td className="px-6 py-4">{`${`${(book.regDate).toString().split("T")[0]} ${(book.regDate).toString().split("T")[1].split(".")[0]}`
                        }`}</td>
                      <td className="px-6 py-4">{
                        staff.map((staffMember) => {
                          if (staffMember.id === borrowedBook.staffId) {
                            return `${staffMember.firstName} ${staffMember.lastName} | ID: ${staffMember.id}`;
                          }
                          return `${borrowedBook.staffId}`;
                        })
                      }</td>
                      <td className="px-6 py-4">{
                        students.map((student: Student) => {
                          if (student.id === borrowedBook.studentId) {
                            return `${student.firstName} ${student.lastName} | ID: ${student.id}`;
                          }
                          return `${borrowedBook.studentId}`;
                        })
                      }</td>
                      <td className="px-6 py-4">
                        <button
                          type="button"
                          onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => setBookMissing(e, borrowedBook.bookId)}
                          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                          style={{ zIndex: 2 }}
                        >
                          MISSING
                        </button>
                      </td>
                      <td className="px-6 py-4">
                        <button
                          type="button"
                          onClick={(e) => setBookAvailable(e, borrowedBook.bookId)}
                          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                        >
                          RETURNED
                        </button>
                      </td>
                    </tr>
                  );
                }
                return null;
              });
            })}
          </tbody>
        </table>
      </div>
      <div
        style={{ width: 1000, display: "flex", justifyContent: "space-around" }}
      >
        <button
          type="button"
          onClick={() => router.push("/home/allbooks")}
          style={{ backgroundColor: "lightblue", color: "black" }}
        >
          All Books
        </button>
        <button
          type="button"
          onClick={() => router.push("/home/available")}
          style={{ backgroundColor: "lightblue", color: "black" }}
        >
          Available Books
        </button>
        <button
          type="button"
          onClick={() => router.push("/home/borrowed")}
          style={{ backgroundColor: "lightblue", color: "black" }}
        >
          Borrowed Books
        </button>
        <button
          type="button"
          onClick={() => router.push("/home/missing")}
          style={{ backgroundColor: "lightblue", color: "black" }}
        >
          Missing Books
        </button>
        <button
          type="button"
          onClick={() => router.push("/home/history")}
          style={{ backgroundColor: "lightblue", color: "black" }}
        >
          History
        </button>
      </div>
    </div>
  );
};

export default Page;
