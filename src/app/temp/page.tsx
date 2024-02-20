//! FIX UNUSED VARS
/* eslint-disable no-unused-vars */
"use client";
import React from "react";
import axios from "axios";
import Papa from "papaparse";

//* This is the type for the data that is returned from the csv file
type Temp = {
  data: string[][];
}

const Page = () => {
  const [selectedValue, setSelectedValue] = React.useState("students");
  const [file, setFile] = React.useState<File>();

  //* Handles the file input and sets the state
  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setFile(e.target.files[0]);
  };

  //* Handles the radio input and sets the state
  const handleRadioChange = (value: string) => {
    setSelectedValue(value);
  };

  //* Handles the form submit and sends the data to the server to be processed
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file || !selectedValue) {
      return;
    }
    Papa.parse(file, {
      complete: (result: Temp) => {
        axios.post("/api/createUsersCSV", {
          data: result.data,
          userType: selectedValue,
        });
      },
    });

  };

  return (
    <div>
      <form method="post" encType="multipart/form-data" onSubmit={(e) => { handleSubmit(e); }}>
        <input
          type="file"
          name="csvFile"
          id="csvFile"
          accept=".csv"
          onChange={(e) => { handleFile(e); }}
          style={{ color: "white" }}
        />
        <br />
        <label htmlFor="students">
          <input type="radio" value="students" onChange={() => handleRadioChange("students")} checked={selectedValue === "students"} />
          Students
        </label>
        <br />
        <label htmlFor="staff">
          <input type="radio" name="staff" onChange={() => handleRadioChange("staff")} value="staff" checked={selectedValue === "staff"} />
          Staff
        </label>
        <br />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default Page;