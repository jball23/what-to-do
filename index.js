var express = require("express");
var hbs = require("express-handlebars");
var parser = require("body-parser");
var mongoose = require("./db/connection");

var app = express();

app.set("view engine", "hbs");
app.engine(".hbs", hbs({
  extname:        ".hbs",
  partialsDir:    "views/",
  layoutsDir:     "views/",
  defaultLayout:  "layout-main"
}));

app.use("/assets", express.static("public"));

app.get("/", function(req, res){
  res.render("layout-main", {layout: false});
});

app.listen("9000", function(){
  console.log("Game On!");
});
