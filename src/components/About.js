import React from 'react';
import './About.css';

function About() {
  return (
    <div className="about-container container mt-5">
      <h1 className="about-title mb-4">About Us</h1>
      
      <div className="about-content">
        <p className="intro-text">
          Welcome to <strong>Book Exchange System</strong>, a community-driven platform for book enthusiasts who believe in the joy of sharing. Our goal is to create a space where readers can come together to exchange books, save money, and discover new worlds through reading.
        </p>
        
        <div className="about-section">
          <h2 className="section-title">Our Mission</h2>
          <p>
            At Book Exchange System, we aim to foster a love of reading by making books more accessible. We believe that books should be shared, not just shelved. Our mission is to build a sustainable and vibrant book-sharing network, where every reader can access the books they love without barriers.
          </p>
        </div>
        
        <div className="about-section">
          <h2 className="section-title">Why Join Us?</h2>
          <p>
            Becoming part of the Book Exchange System means joining a community of like-minded readers. Not only can you save on book costs, but you also contribute to a sustainable practice by giving books a new life in the hands of another reader. Our platform allows you to browse, request, and share books with ease, bringing people and knowledge together.
          </p>
        </div>

        <div className="about-section">
          <h2 className="section-title">Get Started Today!</h2>
          <p>
            Whether you're a student, a casual reader, or a bookworm, there's something for everyone here. Sign up, explore available books, and start exchanging today!
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;
