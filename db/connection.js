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

if(process.env.NODE_ENV == "production"){
  mongoose.connect(process.env.MONGOLAB_URI);
}else{
  mongoose.connect("mongodb://localhost/whattodo");
}

module.exports = mongoose;
