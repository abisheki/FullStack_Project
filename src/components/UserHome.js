import React from 'react';
import { useNavigate } from 'react-router-dom';
import './UserHome.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import bookImage from '../assets/img4.jpg'; 

function UserHome() {
  const userName = localStorage.getItem('userName');
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <div className="user-home-container bg-light py-5">
      {/* Welcome Section */}
      <div className="container text-center">
        <h2 className="mb-4 display-5">
          Welcome, <span className="text-primary">{userName}</span>!
        </h2>
        <p className="lead mb-4">
          Your personalized library dashboard. Explore, borrow, and manage your books effortlessly.
        </p>
      </div>

      {/* Featured Book Section */}
      <div className="container text-center mt-4">
        <div className="card shadow-lg border-0">
          <img
            src={bookImage}
            alt="Library Hub"
            className="card-img-top img-fluid rounded"
          />
          <div className="card-body">
            <h5 className="card-title">Discover Our Collection</h5>
            <p className="card-text">
              Dive into a world of literature. Browse through a vast collection of books across various genres.
            </p>
            <button
              className="btn btn-primary"
              onClick={() => handleNavigate('/search-books')}
            >
              Browse Books
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserHome;
