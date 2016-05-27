var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    email: String,
    zipcode: Number
  }
);

mongoose.model("User", UserSchema);

module.exports = mongoose;
