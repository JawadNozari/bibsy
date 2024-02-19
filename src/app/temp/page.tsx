//! FIX UNUSED VARS
/* eslint-disable no-unused-vars */
"use client";
import React from "react";
import axios from "axios";
import Papa from "papaparse";

const Page = () => {
	const [file, setFile] = React.useState();

	React.useEffect(() => {
		console.log("useEffect");
	}, []);

  const handleSearch = (value: string) => {
    console.log(users.length);
    if (value === "") {
      setSearchedUsers(users);
      return;
    }
    // || user.email.toLowercase().includes(value.toLocaleLowerCase())

    setSearchedUsers(
      users.filter((user: any) => {
        if (user.qrCode.toLowerCase() === value.toLocaleLowerCase()) {
          setSearchValue(user.firstName + " " + user.lastName);
          return user;
        }
        return (
          user.firstName.toLowerCase().includes(value.toLocaleLowerCase()) ||
          user.lastName.toLowerCase().includes(value.toLocaleLowerCase()) ||
          user.qrCode.toLowerCase().includes(value.toLocaleLowerCase) ||
          user.email
            .toString()
            .toLowerCase()
            .includes(value.toLocaleLowerCase())
        );
      })
    );
    if (searchedUsers.length === 0) {
      console.log("no users found");
      setSearchedUsers(users);
    }
  };

  const handleSelect = (e: any) => {
    if (parseInt(e.target.value) === (users.length + 1)) {
      try {
        setSearchValue(self.firstName + " " + self.lastName);
        setSelectedUserValue(e.target.value);
      }
      catch {
        console.log("error");
      }
    } else {
      try {
        setSearchValue(users[parseInt(e.target.value) - 1].firstName + " " + users[parseInt(e.target.value) - 1].lastName);
        setSelectedUserValue(e.target.value);
      }
      catch {
        console.log("error");
      }
    }
  };

  return (
    <div>
      <input
        type="text"
        name="studentName"
        id="studentName"
        placeholder="Student Name"
        onChange={(e) => {
          setSearchValue(e.target.value), handleSearch(e.target.value);
        }}
        value={searchValue}
        style={{ color: "white" }}
      />
      <select
        name="userType"
        id="userType"
        onChange={(e) => handleSelect(e)}
        value={selectedUserValue}
        style={{ color: "white" }}
      >
        {searchedUsers.map((user: any) => {
          return (
            <option key={user.id} value={user.id} style={{ color: "black" }}>
              {user.firstName + " " + user.lastName}
            </option>
          );
        })}
        {self ? (
          <option key={users.length + 1} value={users.length + 1} style={{ color: "black" }}>
            {self.firstName + " " + self.lastName}
          </option>
        ) : (
          ""
        )}
      </select>
    </div>
  );
};
export default Page;
