const express = require("express");
const router = express.Router();
const Draft = require("../models/Drafts");
// const User = require("../models/User");
// const Challenge = require("../models/Challenge");

router.post("/save-draft", (req, res) => {
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
