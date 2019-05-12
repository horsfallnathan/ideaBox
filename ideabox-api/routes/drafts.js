const express = require("express");
const router = express.Router();
const Draft = require("../models/Drafts");

router.post("/create-draft", (req, res) => {
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
  Draft.create({
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
      res.status(200).json(response);
    })
    .catch(error => {
      res.json(error);
    });
});

router.get("/draft/:draftId", (req, res, next) => {
  Draft.findById(req.query.draftId)
    .then(draft => {
      return res.status(200).json(draft);
    })
    .catch(error => {
      res.json(error);
    });
});
router.post("/update-draft/:draftId", (req, res, next) => {
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
  Draft.findOneAndUpdate(
    { _id: req.query.draftId },
    {
      $set: {
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
      }
    }
  )
    .then(draft => {
      return res.status(200).json(draft);
    })
    .catch(error => {
      res.json(error);
    });
});

router.get("/drafts", (req, res) => {
  Draft.find()
    .then(drafts => {
      return res.status(200).json(drafts);
    })
    .catch(error => {
      return res.json(error);
    });
});

module.exports = router;
