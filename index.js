require("dotenv").config();
const express = require("express");
const app = express();
const session = require("express-session");
const mongoose = require("mongoose");
mongoose.set("useCreateIndex", true);
const uri = process.env.DB_URI;

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(express.json());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
  })
);

require("./routes/v0/index")(app);

const port = process.env.PORT || 3028;
app.listen(port, () => {
  console.log(`Listening Port: ${port}`);
});
