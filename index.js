var express = require("express");
var mongoose = require("./db/connection");
var parser = require("body-parser");
var app = express();

var Todo = mongoose.model("Todo");

app.use(parser.json({urlencoded: true}));
app.use("/", express.static("public"));

app.get("/api/todos", function(req, res){
  Todo.find().then(function(todos){
    res.json(todos);
  });
});

app.get("/api/todos/:title", function(req, res){
  Todo.findOne(req.params).then(function(todo){
    res.json(todo);
  });
});

app.post("/api/todos", function(req, res){
  Todo.create(req.body).then(function(todo){
    res.json(todo);
  })
})

app.get("/*", function(req, res){
  res.sendFile(__dirname + "/public/index.html");
});

app.listen(3001, function(){
  console.log("Game on!");
});
