const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  DOB: String,
});

const UserModel = mongoose.model("user", UserSchema);

module.exports = UserModel;
