// AddBook.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function AddBook() {
  const { id } = useParams();  // Get the book ID from the URL for editing
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [genre, setGenre] = useState('');
  const [condition, setCondition] = useState('');
  const [status, setStatus] = useState('Available');
  const [message, setMessage] = useState('');
  const userName = localStorage.getItem('userName'); // Retrieve username from localStorage
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      // Fetch book details for editing
      axios.put(`http://localhost:5000/api/books/${id}`)
        .then((response) => {
          const book = response.data;
          setTitle(book.title);
          setAuthor(book.author);
          setGenre(book.genre);
          setCondition(book.condition);
          setStatus(book.status);
        })
        .catch((error) => {
          console.error('Error fetching book details:', error);
          setMessage('Failed to load book details for editing.');
        });
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const bookData = { title, author, genre, condition, status, userName };
    try {
      if (id) {
        // Update the book if an ID is present
        await axios.put(`http://localhost:5000/api/books/${id}`, bookData);
        setMessage("Book updated successfully!");
      } else {
        // Create a new book
        await axios.post('http://localhost:5000/api/books', bookData);
        setMessage("Book added successfully!");
      }
      // Navigate to profile with a success message
      navigate('/profile', { state: { successMessage: message } });
    } catch (error) {
      console.error('Error saving book:', error);
      setMessage('Error saving book. Please try again.');
    }
  };

  return (
    <div>
      <h2>{id ? 'Edit Book' : 'Add Book'}</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          placeholder="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
        />
        <input
          placeholder="Genre"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          required
        />
        <input
          placeholder="Condition"
          value={condition}
          onChange={(e) => setCondition(e.target.value)}
          required
        />
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="Available">Available</option>
          <option value="Unavailable">Unavailable</option>
        </select>
        <button type="submit">{id ? 'Update Book' : 'Add Book'}</button>
      </form>
    </div>
  );
}

export default AddBook;
