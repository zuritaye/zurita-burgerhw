var express = require("express");
// Router for application export on bottom
var router = express.Router();
// Import the burger.js file
var burger = require("../models/burger.js");

router.get("/", function(req, res) {
  // GET all burger
  burger.all(function(data) {
    var hasObject = { burgers: data };
    res.render("index", hasObject);
  })
});

router.get("/api/burgers", function(req, res) {
  // GET api
  burger.all(function(data) {
    var hasObject = { burgers: data };
    return res.json(hasObject);
  })
});

router.post("/api/burgers", function(req, res) {
  console.log(req.body);
  // burger.create
  burger.create(
    ["burger_name", "devoured"],
    [req.body.burger_name, 0],
    function(result) {
      // Send back the ID of the new burger
      res.json({ id: result.insertId });
    });
});

router.put("/api/burgers/:id", function(req, res) {
  var condition = "id = " + req.params.id;
  console.log("condition:", condition);
  // burger.update
  burger.update({ devoured: req.body.devoured }, condition, function(result) {
    if (result.changedRows === 0) {
      // If row not changed ID does not exist provide error
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
    }
  );
});

router.delete("/api/burgers/:id", function(req, res) {
  var condition = "id = " + req.params.id;
  // burger.update
  burger.delete(condition, function() {
    res.status(200).end();
  }
  )
})

module.exports = router;
