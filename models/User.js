const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    required: true,
  },
  friends: {},
  followers: {},
  following: {},
  messages: {},
  books: {},
  shelves: {},
  reviews: {},
});

module.exports = mongoose.model("User", userSchema, "Users");
