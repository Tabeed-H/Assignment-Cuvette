const mongoose = require("mongoose");
require("dotenv").config();
const DB_connection_URL = process.env.URI;

mongoose
  .connect(DB_connection_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB Server");
  })
  .catch((err) => {
    console.log(err);
  });
