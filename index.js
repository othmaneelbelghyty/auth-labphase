const express = require("express");
const mongoose = require("mongoose");
const UserSchema = require("./db/UserSchema");

const app = express();
const port = 7500;


const dbConnect = require("./db/dbConnect");
dbConnect();

// Middleware to parse incoming JSON data
app.use(express.json());

app.listen(port, () => {
  console.log(`Server is listening on port: ${port}`);
});