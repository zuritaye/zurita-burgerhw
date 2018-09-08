// Connection for mysql / load variables 
require('dotenv').config();

var mysql = require("mysql");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "apple2010",
  database: "burgers_db"
});

// Connection 
connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
});

// Export this connection for ORM use 
module.exports = connection;
