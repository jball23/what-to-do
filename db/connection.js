var mongoose = require("mongoose");

var CommentSchema = {
  author: String,
  body: String
};

var TodoSchema = {
  title: String,
  author: String,
  body: String,
  cost: String,
  free: Boolean,
  location: {
    address: String,
    city: String,
    state: String,
    zipcode: String
  },
  outdoor: Boolean,
  familyFriendly: Boolean,
  rating: Number,
  comments: [CommentSchema]
};

mongoose.model("Todo", TodoSchema);
mongoose.model("Comment", CommentSchema);

mongoose.connect("mongodb://localhost/whattodo");

module.exports = mongoose;
