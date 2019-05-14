const express = require("express");
const router = express.Router();
const Idea = require("../models/Idea");
const Challenge = require("../models/Challenge");
const uploader = require("../configs/cloudinary");
// const User = require("../models/User");
// const Challenge = require("../models/Challenge");

router.post("/submit-idea", (req, res) => {
  console.log("here");
  const {
    title,
    challenge,
    category,
    description,
    files,
    need,
    benefit,
    estimatedResources,
    competition,
    teamMembers,
    message,
    privacy
  } = req.body;
  Idea.create({
    title,
    challenge,
    category,
    description,
    files,
    need,
    benefit,
    estimatedResources,
    competition,
    teamMembers,
    message,
    privacy
  })
    .then(response => {
      return res.status(200).json(response)
    .catch(error => {
      res.json(error);
    });
});
router.post("/add-idea-tochallenge", (req, res) => {
  console.log("got here backend");
  const { challengeId, ideaId } = req.body;
  Challenge.findOneAndUpdate(
    { _id: challengeId },
    {
      $set: { ideas: [...ideas, ideaId] }
    }
  );
});

router.post("/edit-idea/:ideaId", (req, res) => {
  const {
    title,
    challenge,
    category,
    description,
    files,
    need,
    benefit,
    estimatedResources,
    competition,
    teamMembers,
    message,
    privacy
  } = req.body;
  console.log(req.body);
  Idea.findOneAndUpdate(
    { _id: req.params.ideaId },
    {
      $set: {
        title: title,
        challenge: challenge,
        category: category,
        description: description,
        files: files,
        need: need,
        benefit: benefit,
        estimatedResources: estimatedResources,
        competition: competition,
        teamMembers: teamMembers,
        message: message,
        privacy: privacy
      }
    }
  )
    .then(response => {
      console.log(response);
      return res.status(200).json(response);
    })
    .catch(error => {
      res.json(error);
    });
});

router.post("/file-upload", uploader.single("files"), (req, res, next) => {
  if (!req.file) {
    next(new Error("No file uploaded!"));
    return;
  }
  res.json({ secure_url: req.file.secure_url });
});

module.exports = router;
