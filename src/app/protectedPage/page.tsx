// ! AUTHORIZATION !

"use client";
import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

const checkToken = () => {
  //* Grab jwt from local storage  
  const token = localStorage.getItem("token");
  
  if (!token) {
    return { exists: false, token: null, codedToken: null };
  }

  //* Decode token to be readable
  const decodedToken = JSON.parse(atob(token.split(".")[1]));

  const codedToken = token;

  return { exists: true, token: decodedToken, codedToken: codedToken };
};

const ProtectedPage = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  
  const router = useRouter();

  var pathname = usePathname();

  const secretKey = String(process.env.NEXT_PUBLIC_SECRET_KEY); 

  useEffect(() => {
    //* Check for token when the page is visited
    const { exists, token, codedToken } = checkToken();

    setLoggedIn(exists);

    console.log(codedToken);

    //* If no token found, redirect to login page
    if (!exists) {
      router.push("/login");
      
    //* Authorization for user roles begin here
    } else if (token.role === "Student" && pathname !== "/") { // Only allow access to main page if student
        router.push("/");
    } else if (token.role === "Staff" && token.user.admin == false && pathname === "/adminTest" || pathname === "/login") { // Go back if staff but not admin
        router.back();
    };
    
  }, [router]);


  return (
    <div>
      {loggedIn ? (
        <div>
        </div>

      ) : (
        <div style={{height: 1000, color: "white"}}>
          <h1>Checking if logged in. . .</h1>
        </div>
      )}
    </div>
  );
};

export default ProtectedPage;
