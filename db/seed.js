var mongoose = require("./connection");
var seedData = require("./seeds");

var Todo = mongoose.model("Todo");


Todo.remove().then(function(){
  Todo.create(seedData).then(function(){
    process.exit();
  });
})
