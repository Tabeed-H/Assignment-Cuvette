const path = require("path");
const express = require("express");
require("dotenv").config();
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require("./db/db");
const app = express();
const port = process.env.PORT || 3000;

/**************NECESSARY INCLUDES*********** */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.options("*", cors());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,PATCH");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, X-Callback-Type, Content-Type, Accept"
  );
  res.header("Cache-Control", "no-cache");
  if ("OPTIONS" == req.method) {
    res.send(200);
  } else {
    next();
  }
});
//**********IMPORTING ROUTES********* */
const errorController = require("../src/middleware/errorHandler");
const userRoutes = require("../src/modules/user/user.routes");
const jobRoutes = require("../src/modules/job/job.routes");
//*****************USING THE ROUTES************************* */
app.use("/v1/user", userRoutes);
app.use("/v1/jobs", jobRoutes);
app.use(errorController);

//**************************SERVER STARTS***********************************/

app.listen(port, () => {
  console.log(
    "***************************************************************"
  );
  console.log(
    `Server is up on port ${port}! Started at ${new Date().toUTCString()}`
  );
  console.log(`*************************************************************`);
});
