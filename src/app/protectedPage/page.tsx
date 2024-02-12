// ! AUTHORIZATION !

"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const checkToken = () => {
  //* Grab jwt from local storage  
  const token = localStorage.getItem("token");
  
  if (!token) {
    return { exists: false, token: null };
  }

  //* Decode token to be readable
  const decodedToken = JSON.parse(atob(token.split(".")[1]));

  return { exists: true, token: decodedToken };
};

const ProtectedPage = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  
  const router = useRouter();

  useEffect(() => {
    //* Check for token when the page is visited
    const { exists, token } = checkToken();

    setLoggedIn(exists);

    //* If no token found, redirect to login page
    if (!exists) {
      router.push("/login");
      console.log("no token found");
    //* If student, redirect to main page
    } else if (token.role === "Student") {
      router.push("/");
      console.log("student");
    }

    
  }, [router]);

  return (
    <div>
      {loggedIn ? (
        <div>
          <h1>Protected Page Content</h1>
        </div>

      ) : (
        <h1>Loading...</h1>
      )}
    </div>
  );
};

export default ProtectedPage;
