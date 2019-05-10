const express = require('express');
const router = express.Router();
const Challenge = require('../models/Challenge')
const Idea = require('../models/Idea')

router.get("/challenges/:challengeId", (req, res) => {
    Challenge.findById(req.params.challengeId).populate('ideas')
.then(info => {
    res.json(info)
}).catch(error => {
    res.json(error)
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