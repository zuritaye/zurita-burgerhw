// Connection for mysql / load variables 
require('dotenv').config();

var mysql = require("mysql");

var connection = mysql.createConnection({
  host: "localhost",
  port: 8081,
  user: "root",
  password: "process.env.PSWD",
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
