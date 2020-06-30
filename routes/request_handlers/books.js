const Book = require("../../models/Book");
const mongoose = require("mongoose");

const handleCreateBook = async (req, res, next) => {
  try {
    const bookBody = req.body;
    console.log(bookBody);
    const { title, author, cover, description } = bookBody;
    const book = Book({ title, author, cover, description });
    const createdBook = await book.save();
    return res.send({ book: createdBook });
  } catch (error) {
    return res.status(400).send({ error });
  }
};

const handleDeleteBook = async (req, res, next) => {
  try {
    const bookId = req.params.bookId;

    const book = await Book.findByIdAndDelete(bookId, {
      useFindAndModify: true,
    });

    if (!book) {
      return res.status(404).send({ error: "Book not found!" });
    }

    return res.send({ message: "success" });
  } catch (error) {
    return res.status(400).send({ error });
  }
};

const handleGetBook = async (req, res, next) => {
  try {
    const bookId = req.params.bookId;
    const book = await Book.findById(bookId);

    if (!book) {
      return res.status(404).send({ error: "Book not found!" });
    }

    return res.send({ book });
  } catch (error) {
    return res.status(400).send({ error });
  }
};

const handleUpdateBook = async (req, res, next) => {
  try {
    const bookId = req.params.bookId;
    const updatedData = req.body;

    const book = await Book.findByIdAndUpdate(
      bookId,
      {
        $set: {
          ...updatedData,
        },
      },
      { new: true, useFindAndModify: true }
    );

    const bookUpdated = await book.save();

    if (!book) {
      return res.status(404).send({ error: "Book not found!" });
    }

    return res.send({ book: bookUpdated });
  } catch (error) {
    return res.status(400).send({ error });
  }
};

module.exports = {
  handleCreateBook,
  handleDeleteBook,
  handleGetBook,
  handleUpdateBook,
};
