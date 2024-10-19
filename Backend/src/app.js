// const path = require("path");
const express = require("express");
require("dotenv").config();
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require("./db/db");

const app = express();
const port = process.env.PORT || 3000;

// Use body-parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Enable CORS for all routes
app.use(cors());

// Importing routes
const errorController = require("../src/middleware/errorHandler");
const userRoutes = require("../src/modules/user/user.routes");
const jobRoutes = require("../src/modules/job/job.routes");

// Using the routes
app.use("/v1/user", userRoutes);
app.use("/v1/jobs", jobRoutes);
app.use(errorController);

// Server starts
app.listen(port, () => {
  console.log(
    "***************************************************************"
  );
  console.log(
    `Server is up on port ${port}! Started at ${new Date().toUTCString()}`
  );
  console.log("*************************************************************");
});
