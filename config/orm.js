// Import connection
var connection = require("./connection.js");

function printQuestionMarks(num) {
  var arr = [];
  for (var i = 0; i < num; i++) {
    arr.push("?");
  }
  return arr.toString();
}
function objToSql(ob) {
  var arr = [];
  for (var key in ob) {
    var value = ob[key];
    // for hidden properties
    if (Object.hasOwnProperty.call(ob, key)) {
      if (typeof value === "string" && value.indexOf(" ") >= 0) {
        value = "'" + value + "'";
      }
      arr.push(key + "=" + value);
    }
  }
  return arr.toString();
}
// SELECT, INSERT, UPDATE to execute mysql
var orm = {
  // SELECT * FROM ?;
  all: function(table, callback) {
    var queryString = "SELECT * FROM ??;";
    connection.query(queryString, table, function(err, result) {
      if (err) throw err;
      callback(result);
    });
  },

  // INSERT INTO burgers (burger_name, devoured) VALUES ('A ', 0);
  create: function(table, cols, vals, callback) {
    var queryString = "INSERT INTO " + table;
    queryString += " (" + cols.toString() + ") ";
    queryString += "VALUES";
    queryString += " (" + printQuestionMarks(vals.length) + ") ";
    console.log(queryString);

    connection.query(queryString, vals, function(err, result) {
      if (err) throw err;
      callback(result);
    });
  },

  // UPDATE burgers SET burger_name = ?, devoured = ? WHERE id = ?;
  update: function(table, obj, condition, callback) {
    var queryString = "UPDATE " + table;
    queryString += " SET " + objToSql(obj);
    queryString += " WHERE " + condition;
    console.log(queryString);

    connection.query(queryString, function(err, result) {
      if (err) throw err;
      callback(result);
    });
  },

  // DELETE FROM burgers WHERE id = ?;
  delete: function(table, condition, callback) {
    var queryString = "DELETE FROM " + table;
    queryString += " WHERE " + condition;
    console.log(queryString);

    connection.query(queryString, function(err, result) {
      if (err) throw err;
      callback(result);
    });
  }
};

// Export ORM
module.exports = orm;
