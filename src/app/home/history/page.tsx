"use client";
import React from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Staff, Student, Book, bookHistory } from "@prisma/client";

const Page = () => {
    const router = useRouter();
    const [history, setHistory] = React.useState<bookHistory[]>([]);
    const [books, setBooks] = React.useState<Book[]>([]);
    const [students, setStudents] = React.useState<Student[]>([]);
    const [staff, setStaff] = React.useState<Staff[]>([]);

    //* Gets all of the books and sets the state for each type of book (registered, history) and all of the users
    React.useEffect(() => {
        const getHistory = async () => {
            const response = await axios("/api/getHistory");
            setHistory(response.data.books);

            const response2 = await axios("/api/registeredBooks");
            setBooks(response2.data.books);

            const response3 = await axios("/api/getUsers");
            setStudents(response3.data.studentUsers);
            setStaff(response3.data.staffUsers);
        };
        getHistory();
    }, []);

    //* Returns the JSX for the page with the history of borrowed books and buttons to navigate to different pages
    const runThroughBooks = () => {
        return (history ? history.map((book) => {
            return books.map((registeredBook) => {
                if (book.bookId === registeredBook.id) {
                    return (
                        // biome-ignore lint/a11y/useKeyWithClickEvents: <Comment was needed to disable a biome error because its a false positive that used outdated code>
                        <tr
                            className="bg-white border-b dark:bg-gray-600 dark:border-gray-500 hover:bg-gray-50 dark:hover:bg-gray-500 cursor-pointer active:bg-gray-200 dark:active:bg-gray-700"
                            key={book.id}
                            onClick={() =>
                                router.push(`/home/bookDetails/${registeredBook.invNr}`)
                            }
                            tabIndex={0}
                        >
                            <th
                                scope="row"
                                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                            >{`${registeredBook.title}`}</th>
                            <td className="px-6 py-4">{registeredBook.author}</td>
                            <td className="px-6 py-4">{`${(book.regDate).toString().split("T")[0]
                                } ${(book.regDate).toString().split("T")[1].split(".")[0]}`}</td>
                            {/* //* Runs through the users to fetch their names */}
                            <td className="px-6 py-4">{
                                staff.map((staffMember) => {
                                    if (staffMember.id === book.staffId) {
                                        return `${staffMember.firstName} ${staffMember.lastName} | ID: ${staffMember.id}`;
                                    }
                                })
                            }</td>
                            <td className="px-6 py-4">{
                                students.map((student) => {
                                    if (student.id === book.studentId) {
                                        return `${student.firstName} ${student.lastName} | ID: ${student.id}`;
                                    }
                                })
                            }</td>
                        </tr>
                    );
                }
            });
        }) : "");
    };

    return (
        <div className="flex min-h-screen flex-col items-center justify-between  p-24 bg-neutral-50">
            <div className=" overflow-x-auto shadow-md sm:rounded-lg overflow-scroll w-4/5 h-[38rem] dark:bg-gray-600">
                <h1 className="text-4xl text-center font-bold  dark:bg-gray-700   dark:text-gray-100 p-10">
                    Borrowed History
                </h1>
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
                                Registered
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Staff ID
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Student ID
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {runThroughBooks()}
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