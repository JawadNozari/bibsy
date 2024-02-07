//Just a test page for the bookregister

"use client";
import React, { useState } from "react";
import axios from "axios";

export default function BookForm() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [isbn, setIsbn] = useState(0);
  const [invNr, setInvNr] = useState(0);
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     axios.post("api/bookRegister", {title:title, author:author, isbn:isbn, invNr:invNr})
//   };

const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    axios.post("/api/bookRegister", {
      title: title,
      author: author,
      isbn: isbn,
      invNr: invNr,
      price: price,
      image: image
      
    });
};


console.log(title);
  return (
    <form onSubmit={handleSubmit}>
      <span>Image:</span>
      <input 
        type="file" 
        accept="image/*"
        name="image"
        onChange={(e) => setImage(e.target.value)}
        value={image}
      />
      <span>Title:</span>
      <input  
        type="text"
        name="title"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
      />
      <span>Author:</span>
      <input 
        type="text"
        name="author"
        onChange={(e) => setAuthor(e.target.value)}
        value={author}
      />
      <span>ISBN:</span>
      <input 
        type="number"
        name="isbn"
        onChange={(e) => setIsbn(e.target.valueAsNumber)}
        value={isbn}
      />
      <span>invNr:</span>
      <input 
        type="number"
        name="invNr"
        onChange={(e) => setInvNr(e.target.valueAsNumber)}
        value={invNr}
      />
      <span>price:</span>
      <input 
        type="number"
        name="price"
        onChange={(e) => setPrice(e.target.valueAsNumber)}
        value={price}
      />

      <button type="submit">Submit</button>
    </form>
  );
}