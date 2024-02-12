// ! AUTHORIZATION !

"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const checkToken = () => {
  const token = localStorage.getItem("token");
  if (!token) {
    return { exists: false, token: null };
  }
  const decodedToken = JSON.parse(atob(token.split(".")[1]));

  return { exists: true, token: decodedToken };
};

const ProtectedPage = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  // ! THIS IS JUST TO MAKE LINT WORK
  //const [decodedToken, setDecodedToken] = useState(null);
  const router = useRouter();

  useEffect(() => {
    //* Check for token when the page is visited
    const { exists } = checkToken(); // ! ADD THIS LATER ON! ", token"
    setLoggedIn(exists);

    // ! THIS IS JUST TO MAKE LINT WORK
    //setDecodedToken(token);


    //* If no token found, redirect to login page
    if (!exists) {
      router.push("/login");
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
