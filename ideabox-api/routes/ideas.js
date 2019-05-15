const express = require("express");
const router = express.Router();
const Idea = require("../models/Idea");
const User = require("../models/User");
const Challenge = require("../models/Challenge");
const Comment = require("../models/Comment");

router.get("/my-ideas", (req, res) => {
  const { _id } = req.user;
  User.findOne({ _id })
    .populate("ideas")
    .then(userInfo => {
      res.json(userInfo);
    })
    .catch(err => {
      res.json(err);
    });
});
router.get("/edit-idea/:ideaId", (req, res) => {
  Idea.findById(req.params.ideaId)
    .then(response => {
      res.status(200).json(response);
    })
    .catch(error => {
      res.json(error);
    });
});

router.get("/all-ideas", (req, res) => {
  Idea.find({}).then(allIdeas => {
    res.json(allIdeas)
  }).catch(err => {
    res.json(err)
  })
})

// router.get("/idea/:ideaId", (req, res) => {
//   Idea.findById(req.params.ideaId)
//     .populate("comments")
//     .then(idea => {
//       if (idea.challenge) {
//         Challenge.findOne({ ideas: { $in: [req.params.ideaId] } })
//           .then(challenge => {
// })

router.get("/idea/:ideaId", (req, res) => {
  Idea.findById(req.params.ideaId)
    .populate({
      path: "comments",
      model: "Comment",
      populate: { path: "createdBy", model: "User" }
    }).populate('teamMembers')
    .then(idea => {
      if (idea.challenge) {
        Challenge.findOne({ ideas: { $in: [req.params.ideaId] } })
          .then(challenge => {
            const result = {
              challenge,
              idea
            };
            return res.json(result);
          })
          .catch(err => {
            res.json(err);
          });
      } else {
        const result = {
          challenge: {},
          idea
        };
        return res.json(result);
      }
    })
    .catch(err => {
      res.json(err);
    });
});

router.delete("/my-ideas/:ideaId", (req, res) => {
  Idea.findByIdAndDelete(req.params.ideaId)
    .then(() => {
      res.json({ message: "idea successfully deleted" });
    })
    .catch(err => {
      res.json(err);
    });
});

module.exports = router;
