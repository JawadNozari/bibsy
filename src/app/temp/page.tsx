//! FIX UNUSED VARS
/* eslint-disable no-unused-vars */
"use client";
import React from "react";

const Page = () => {
  const [code, setCode] = React.useState("");

  const handleChange = (thing: string) => {
    setCode(thing);
    /* console.log(thing); */
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
      <div>
        <p>{code}</p>
      </div>
    </div>
  );
};

export default Page;