const express = require("express");
const router = express.Router();
const Idea = require("../models/Idea");
// const User = require("../models/User");
// const Challenge = require("../models/Challenge");

router.post("/submit-idea", (req, res) => {
  console.log(req.body);
  const {
    title,
    description,
    files,
    need,
    benefit,
    estimatedResources,
    competition,
    message,
    teamMembers,
    privacy
  } = req.body;
  Idea.create({
    title,
    description,
    files,
    need,
    benefit,
    estimatedResources,
    competition,
    message,
    teamMembers,
    privacy
  })
    .then(response => {
      res.status(200).json(response);
    })
    .catch(error => {
      res.json(error);
    });
});

module.exports = router;
