import React, { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import './App.css'

function App() {
  const [books, setbooks]=useState([]);
  const [error,seterror]=useState('');

  useEffect(()=>{
    axios.get("https://reactnd-books-api.udacity.com/books",{ headers: { 'Authorization': 'whatever-you-want' }})
    .then(res=>{
      console.log(res.data.books[0])
      setbooks(res.data.books)
    }
    )
    .catch(error=>{
      if (error.response) {
        if (error.response.status === 404) {
          seterror('Resource not found (404)');
        } else {
          seterror('An error occurred: ' + error.message);
        }
      } else {
        seterror('An error occurred: ' + error.message);
      }
    })
  },[])
  

  return (
    <div className="App">
      <h1>Book List</h1>
      {error && <p className="error">{error}</p>}
      <ul>
        {books.map(book => (
          <li key={book.id} className="book-item">
            <h2>{book.title}</h2>
            <img src={book.imageLinks.thumbnail} alt={book.title} />
            <p>{book.description}</p>
            <p>Authors: {book.authors.join(', ')}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
