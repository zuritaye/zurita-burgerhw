var express = require('express');
// port for web server 
var PORT = process.env.PORT || 8081;

var app = express();

// Serve static content for the application from the "public" directory in the application folder
app.use(express.static("public"));

// Body parser to extract incoming request req.body (converts object to string)
var bodyParser = require("body-parser");
// For parsing application     /deep parsing 4 objects 
app.use(bodyParser.urlencoded({ extended: true }));
// For parsing application & to use JSON 
app.use(bodyParser.json());

// Handlebars
var express_handlebars = require("express-handlebars");
app.engine("handlebars", express_handlebars({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// To import the routes & give the server access to the routes
var routes = require("./controllers/burgers_controller.js");
app.use(routes);

// Start server so that it can begin listening to requests 
app.listen(PORT, function() {
  // Log for when the server starts 
  console.log("Server listening on: http://localhost:" + PORT);
});