var express = require("express");
var mongoose = require("./db/connection");
var app = express();

var Todo = mongoose.model("Todo");

app.use("/", express.static("public"));

app.get("/api/todos", function(req, res){
  Todo.find().then(function(todos){
    res.json(todos);
  });
});

app.get("/*", function(req, res){
  res.sendFile(__dirname + "/public/index.html");
});

app.listen(3001, function(){
  console.log("Game on!");
});
