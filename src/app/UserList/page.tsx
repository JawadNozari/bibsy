"use client";

// import '../student&user.css';

export default function Home() {
    const student = {
        name: "Bob Bergman",
        email: "User@ntig.ga.se",
        class: "T04",
        phone: "07693434256",
        image: "https://www.gravatar.com/avatar/2acfb745ecf9d4dccb3364752d17f65f?s=260&d=mp", // Replace with the actual image URL
    };

    const forLoopList = () => { 
        const list = [];
        for (let i = 0; i < 100; i++) {
            list.push(
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th scope="row" className="flex items-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    <img className="w-10 h-10 rounded-full" src={student.image} alt="Bob Bergman"/>
                    <div className="ps-3">
                        <div className="text-base font-semibold">{student.name}</div>
                        <div className="font-normal text-gray-500">{student.email}</div>
                    </div>  
                </th>
                <td className="px-6 py-4">
                    {student.phone}
                </td>
                <td className="px-6 py-4">
                    <div className="flex items-center">
                        <div className="h-4 w-0.5"></div> {student.class}
                    </div>
                </td>
                <td className="px-6 py-4">
                    <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit user</a>
                </td>
            </tr>
            );
        }
        return list;
    };


    return (  
        <main className="mainbox justify-between p-4">      
            <div className="studentbox flex-col">
                {/* Student Detail */}
                <div className=" items-center h-screen w-full justify-center">
                    <div className="max-w-xs">
                        <div className="studentcard bg-white shadow-xl rounded-lg py-3">
                            <h2 className="text-xl font-bold">Student detail</h2>
                            <div className="photo-wrapper p-2">
                                <img className="w-32 h-32 rounded-full mx-auto" src={student.image} alt="Bob Bergman"/>
                            </div>
                            <div className="p-2">
                                <h3 className="text-center text-xl text-gray-900 font-medium leading-8">{student.name}</h3>
                                
                                <table className="changetext text-xs my-3">
                                    <tbody>
                                        
                                        <tr>
                                            <td className="px-2 py-2 text-gray-500 font-semibold">Email</td>
                                            <td className="px-2 py-2">{student.email}</td>
                                        </tr>
                                        <tr>
                                            <td className="px-2 py-2 text-gray-500 font-semibold">Phone</td>
                                            <td className="px-2 py-2">{student.phone}</td>
                                        </tr>
                                        <tr>
                                            <td className="px-2 py-2 text-gray-500 font-semibold">Class</td>
                                            <td className="px-2 py-2">{student.class}</td>
                                        </tr>
                                    </tbody>
                                </table>

                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* User List */}
            <div className="changebox overflow-y-auto relative shadow-md sm:rounded-lg">
                <div className="flex items-center  sticky top-0 justify-between flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 pb-4 bg-white dark:bg-gray-900">
                    <div>
                        <h2 className="text-xl font-bold px-4 py-2">User list</h2>           
                    </div>
                    <label htmlFor="table-search" className="sr-only">Search</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                            </svg>
                        </div>
                        <input type="text" id="table-search-users" className="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search for users"/>
                    </div>
                </div>

                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs sticky top-[60px] text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Phone
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Class
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody className="overflow-y-scroll">
                        {/* List of users (you can replace these with your actual data) */}
                        {/* <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                            <th scope="row" className="flex items-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                <img className="w-10 h-10 rounded-full" src={student.image} alt="Bob Bergman"/>
                                <div className="ps-3">
                                    <div className="text-base font-semibold">{student.name}</div>
                                    <div className="font-normal text-gray-500">{student.email}</div>
                                </div>  
                            </th>
                            <td className="px-6 py-4">
                                {student.phone}
                            </td>
                            <td className="px-6 py-4">
                                <div className="flex items-center">
                                    <div className="h-4 w-0.5"></div> {student.class}
                                </div>
                            </td>
                            <td className="px-6 py-4">
                                <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit user</a>
                            </td> 
                        </tr> */}
                        {forLoopList()}
                        {/* Repeat similar code for other users */}
                    </tbody>
                </table>
            </div>
        </main>
    );
}


//   npm install react-jsx-runtime om koden säger "JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.ts(7026)"
