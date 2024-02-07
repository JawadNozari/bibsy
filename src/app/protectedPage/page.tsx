// ! AUTHORIZATION !

"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const checkToken = () => {
  const token = localStorage.getItem("token");
  if (!token) {
    return false;
  }
  return true;
};

const ProtectedPage = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check for token when the page is visited
    const tokenExists = checkToken();
    setLoggedIn(tokenExists);
    
    // If no token found, redirect to login page
    if (!tokenExists) {
      router.push("/login");
    }
  }, [router]);

  return (
    <div>
      {loggedIn ? (
        <h1>Protected Page Content</h1>
      ) : (
        <h1>Loading...</h1>
      )}
    </div>
  );
};

export default ProtectedPage;
