import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import NavigationBar from './components/Navbarold';
import Home from './components/Home';
import About from './components/About';
import Login from './components/Login';
import Register from './components/Register';
import UserHome from './components/UserHome';
import Requests from './components/Requests';
import Profile from './components/Profile';
import AddBook from './components/AddBook';
import BookSearch from './components/BookSearch';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState(''); // state for username
  
  const PrivateRoute = ({ element }) => {
    return isAuthenticated ? element : <Navigate to="/" />;
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUsername('');
    localStorage.removeItem('token');
  };

  return (
    <div className="App">
      <Router>
        <NavigationBar isAuthenticated={isAuthenticated} username={username} onLogout={handleLogout} />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} setUsername={setUsername} />} />
          <Route path="/register" element={<Register />} />

          {/* Protected Routes */}
          <Route path="/user-home" element={<PrivateRoute element={<UserHome />} />} />
          <Route path="/requests" element={<PrivateRoute element={<Requests />} />} />
          <Route path="/search-books" element={<PrivateRoute element={<BookSearch />} />} />
          <Route path="/profile" element={<PrivateRoute element={<Profile />} />} />
          <Route path="/add" element={<PrivateRoute element={<AddBook />} />} />
          <Route path="/edit/:id" element={<PrivateRoute element={<AddBook />} />} /> 
        </Routes>
      </Router>
    </div>
  );
}

export default App;
