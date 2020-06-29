const mongoose = require("mongoose");

const authorSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  books: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book",
    },
  ],
  followers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  avatar: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
    required: true,
  },
  website: {
    type: String,
  },
});

module.exports = mongoose.model("Author", authorSchema, "Authors");
