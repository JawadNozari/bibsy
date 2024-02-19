"use client";
import React from "react";
import axios from "axios";
import Papa from "papaparse";

const Page = () => {
  const [file, setFile] = React.useState();

  React.useEffect(() => {
    console.log("useEffect");
  }, []);

  const handleFile = (e: any) => {
    setFile(e.target.files[0]);
    Papa.parse(e.target.files[0], {
      complete: (result: any) => {
        console.log(result.data);
      },
    });
  };

  return (
    <div>
      <input
        type="file"
        name="csvFile"
        id="csvFile"
        accept=".csv"
        onChange={(e) => { handleFile(e); }}
        style={{ color: "white" }}
      />
    </div>
  );
};

export default Page;