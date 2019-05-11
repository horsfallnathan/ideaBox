const express = require('express');
const router = express.Router();
const Challenge = require('../models/Challenge')
const Idea = require('../models/Idea')


router.post('/managerDashboard/challengeForm', (req, res, next) =>  {
    const { title, description, startDate, deadline} = req.body

    return Challenge.create({
        title: title,
        description: description,
        startDate: startDate,
        deadline: deadline
    })
    .then(response => {
        res.status(200).json(response);
      })
      .catch(error => {
        res.json(error);
      });
})


router.get("/challenges/:challengeId", (req, res) => {
    Challenge.findById(req.params.challengeId).populate('ideas')
.then(info => {
    res.json(info)
}).catch(error => {
    res.json(error)
})
})

router.get("/currentChallenge", (req,res) => {
    Challenge.findOne({$and: [{startDate:{$lte: Date.now()}},{deadline: {$gte: Date.now()}}]}).then(currentChallenge => {
        res.json(currentChallenge)
    }).catch(err => {
        res.json(err)
    })
})



router.get("/managerDashboard/:challengeId", (req, res) => {
    Challenge.findById(req.params.challengeId).populate('ideas')
.then(info => {
    res.json(info)
}).catch(error => {
    res.json(error)
})
})



module.exports = router