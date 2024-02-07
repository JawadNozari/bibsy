"use client";
import React from "react";
import axios from "axios";

/* 
! * THIS SHIT DOES NOT WORK!!!!!
* * Might fix it idk -Fredrik
*/

const Page = () => {
  const [users, setUsers] = React.useState<any>([]);
  const [self, setSelf] = React.useState<any>([]);
  const [searchedUsers, setSearchedUsers] = React.useState<any>([]);
  const [searchValue, setSearchValue] = React.useState("");
  const [selectedUserValue, setSelectedUserValue] = React.useState(0);

  const selfId = 1;

  React.useEffect(() => {
    console.log("useEffect");
    const getUsers = async () => {
      const response = await axios.get("/api/getUsers");
      let staff = response.data.staffUsers;
      staff.map((user: any) => {
        if (user.id === selfId) {
          setSelf(user);
        }
      });
      setUsers(response.data.studentUsers);
      setSearchedUsers(response.data.studentUsers);
    };
    getUsers();
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