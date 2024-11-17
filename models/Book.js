const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  genre: { type: String, required: true },
  condition: { type: String, required: true },
  status: { type: String, required: true },
  userName: { type: String, required: true },
});

module.exports = mongoose.model('Book', BookSchema);
