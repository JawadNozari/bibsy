//! FIX UNUSED VARS
/* eslint-disable no-unused-vars */
"use client";
import React from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

//* This is the type for the data that is returned from the csv file
const Page = () => {
  const router = useRouter();

  React.useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    }
    const role = JSON.parse(atob(token.split(".")[1])).role;
    if (role !== "Admin" && role !== "Staff") {
      router.push("/login");
    }
  });

  const handleChange = (thing: string) => {
    axios.post("/api/specifiedUser", { qrCode: thing });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleChange(e.currentTarget.value);
      e.currentTarget.value = "";
    }
  };

  return (
    <div>
      {/* biome-ignore lint/a11y/noAutofocus: <Biome complaning about auto focus for bad code!!!!!!!!!!!!> */}
      <input type="text" onKeyDown={handleKeyDown} autoFocus={true} />
    </div>
  );
};

export default Page;
