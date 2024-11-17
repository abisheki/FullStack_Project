import React from 'react';
import { Button, Container, Row, Col, Image, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import bookImage from '../assets/img1.jpg'; 

function Home() {
  return (
    <Container className="text-center mt-5" style={{ paddingBottom: '60px' }}>
      {/* Welcome Section */}
      <h1 className="display-4 fw-bold mb-3">Welcome to the Book Exchange System</h1>
      <p className="lead mb-4">
        Discover a world of books and share your favorite reads with others.<br />
        Join our community to lend, borrow, and exchange books with ease!
      </p>

      {/* Book Image */}
      <div className="d-flex justify-content-center mb-5">
        <Image 
          src={bookImage} 
          alt="Book Exchange" 
          style={{ width: '60%', borderRadius: '10px', boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.2)' }} 
          fluid 
        />
      </div>

      {/* Action Buttons */}
      <div className="mb-5">
        <Link to="/register">
          <Button variant="primary" size="lg" className="mx-2">Join Now</Button>
        </Link>
      </div>

      {/* Features Section */}
      <Row className="mt-5">
        <Col md={4}>
          <Card className="h-100 shadow-sm">
            <Card.Body>
              <Card.Title>Exchange Books</Card.Title>
              <Card.Text>
                Connect with a community that loves sharing books. Offer your favorites or find new ones to enjoy.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} className="mt-4 mt-md-0">
          <Card className="h-100 shadow-sm">
            <Card.Body>
              <Card.Title>Easy Borrowing</Card.Title>
              <Card.Text>
                Search and borrow books from others. Enjoy access to a variety of genres and titles effortlessly.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} className="mt-4 mt-md-0">
          <Card className="h-100 shadow-sm">
            <Card.Body>
              <Card.Title>Community Driven</Card.Title>
              <Card.Text>
                Become part of a vibrant community where sharing knowledge and stories is a priority.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Home;
