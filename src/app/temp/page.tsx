"use client";
import React from "react";
import axios from "axios";

const Page = () => {
  const [users, setUsers] = React.useState<any>([]);
  const [searchedUsers, setSearchedUsers] = React.useState<any>([]);
  const [searchValue, setSearchValue] = React.useState("");

  React.useEffect(() => {
    console.log("useEffect");
    const getUsers = async () => {
      const response = await axios.get("/api/getUsers");
      setUsers(response.data.studentUsers);
      setSearchedUsers(response.data.studentUsers);
    };
    getUsers();
  }, []);

  const handleSearch = (value: string) => {
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
    if(searchedUsers.length === 0) {
      console.log("no users found");
      setSearchedUsers(users);
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
        style={{ color: "black" }}
      />
      <select
        name="userType"
        id="userType"
        onChange={(e) => console.log(e.target)}
        value={searchValue}
        style={{ color: "black" }}
      >
        {searchedUsers.map((user: any) => {
          return (
            <option key={user.id} value={user.id} style={{ color: "black" }}>
              {user.firstName + " " + user.lastName}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default Page;
