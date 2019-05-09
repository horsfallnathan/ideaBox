const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.get("/get-users", (req, res) => {
  User.find()
    .then(users => {
      res.json(users);
    })
    .catch(err => {
      res.json(err);
    });
});

module.exports = router;
