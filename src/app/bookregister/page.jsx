//Just a test page for the bookregister

"use client"
import React, { useState } from 'react';
import axios from 'axios';

export default function BookForm() {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [isbn, setIsbn] = useState('');
  const [invNr, setInvNr] = useState('');

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     axios.post("api/bookRegister", {title:title, author:author, isbn:isbn, invNr:invNr})
//   };

const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('/api/bookRegister', {
      title: title,
      author: author,
      isbn: isbn,
      invNr: invNr,
    })
}


console.log(title)
  return (
    <form onSubmit={handleSubmit}>
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
        onChange={(e) => setIsbn(e.target.value)}
        value={isbn}
      />
      <span>invNr:</span>
      <input 
        type="number"
        name="invNr"
        onChange={(e) => setInvNr(e.target.value)}
        value={invNr}
      />

      <button type="submit">Submit</button>
    </form>
  );
}