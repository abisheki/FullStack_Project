const express = require('express');
const router = express.Router();
const Book = require('../models/Book'); // Assuming you have a Book model
//const { authMiddleware } = require('../middleware/auth');

// Route to get all books
router.get('/', async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching books' });
  }
});

// Route to add a new book
router.post('/', async (req, res) => {
  const { title, author, genre, condition, status, userName } = req.body; // Get username from the request

  console.log('Request body:', req.body); // Log request data to verify

  try {
    const newBook = new Book({
      title,
      author,
      genre,
      condition,
      status,
      userName, // Store the username
    });

    await newBook.save();
    res.status(201).json(newBook);
  } catch (error) {
    console.error('Error creating book:', error);
    res.status(500).json({ message: 'Failed to create book', error: error.message });
  }
});


// Get books by userName
router.get('/user', async (req, res) => {
  console.log("Received request for books with userName:", req.query.userName);  // Log userName query

  const { userName } = req.query;  // Get userName from query parameters

  if (!userName) {
    return res.status(400).json({ message: 'userName query parameter is required' });
  }

  try {
    const books = await Book.find({ username: userName });
    if (books.length === 0) {
      return res.status(404).json({ message: 'No books found for this user' });
    }
    res.json({ books });
  } catch (error) {
    console.error('Error fetching books:', error);
    res.status(500).json({ message: 'Error fetching books' });
  }
});


// DELETE route to remove a book by ID
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const book = await Book.findByIdAndDelete(id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.json({ message: 'Book deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting book' });
  }
});

// PUT route to update book details
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { title, author, genre, condition, status } = req.body;
  try {
    const book = await Book.findByIdAndUpdate(id, { title, author, genre, condition, status }, { new: true });
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.json(book);  // Return updated book
  } catch (error) {
    res.status(500).json({ message: 'Error updating book' });
  }
});

// Route to search books based on multiple criteria
router.get('/search', async (req, res) => {
  const { searchQuery, genre, status, page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;
  const query = {};

  if (searchQuery) {
    query.$or = [
      { title: { $regex: searchQuery, $options: 'i' } },
      { author: { $regex: searchQuery, $options: 'i' } },
      { genre: { $regex: searchQuery, $options: 'i' } },
    ];
  }
  if (genre) query.genre = genre;
  if (status) query.status = status;

  try {
    const books = await Book.find(query).limit(limit).skip(skip);  // Find books based on query
    const totalBooks = await Book.countDocuments(query);  // Count total books matching query
    const totalPages = Math.ceil(totalBooks / limit);  // Calculate total pages for pagination
    res.json({ books, totalPages });  // Send response with books and pagination info
  } catch (error) {
    res.status(500).json({ message: 'Error fetching books' });  // Handle error
  }
});

module.exports = router;
