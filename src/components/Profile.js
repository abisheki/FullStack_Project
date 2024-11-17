import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Profile.css'; // Import the CSS file

function Profile() {
  const [books, setBooks] = useState([]);
  const [message, setMessage] = useState('');
  const userName = localStorage.getItem('userName');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state && location.state.successMessage) {
      setMessage(location.state.successMessage);
    }

    const fetchBooks = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/books/search`, {
          params: { userName },
        });
        setBooks(response.data.books || []);
      } catch (error) {
        console.error('Error fetching user books:', error);
        setMessage('Error fetching books');
      }
    };

    fetchBooks();
  }, [userName]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/books/${id}`);
      setBooks(books.filter((book) => book._id !== id));
      setMessage('Book deleted successfully');
    } catch (error) {
      console.error('Error deleting book', error);
      setMessage('Error deleting book');
    }
  };

  return (
    <div className="profile-container">
      <h2>My Books</h2>
      {message && <p className="message">{message}</p>}
      
      <button onClick={() => navigate('/add')} className="add-book-button">
        Add Book
      </button>

      <table className="books-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Genre</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.length > 0 ? (
            books.map((book) => (
              <tr key={book._id}>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.genre}</td>
                <td>{book.status}</td>
                <td>
                  <Link to={`/edit/${book._id}`} className="action-link">Edit</Link>
                  <button onClick={() => handleDelete(book._id)} className="delete-button">Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No books available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Profile;
