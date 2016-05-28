var express = require("express");
var app = express();

app.use("/", express.static("public"));

app.get("/api/todos", function(req, res){
  res.json([
    {title: "Todo1"},
    {title: "Todo2"},
    {title: "Todo3"},
    {title: "Todo4"}
  ]);
})

app.get("/*", function(req, res){
  res.sendFile(__dirname + "/public/index.html");
});

app.listen(3001, function(){
  console.log("Game on!");
});
