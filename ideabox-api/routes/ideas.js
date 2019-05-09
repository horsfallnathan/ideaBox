const express = require('express');
const router = express.Router();
const Idea = require('../models/Idea')
const User = require('../models/User')
const Challenge = require('../models/Challenge')

router.get("/my-ideas", (req, res) => {
    const { _id } = req.user
    User.findOne({ _id }).populate('ideas').then(userInfo => {
        res.json(userInfo)
    }).catch(err => {
        res.json(err)
    })
})

router.get("/idea/:ideaId", (req, res) => {
    Idea.findById(req.params.ideaId).then(idea => {
        if (idea.challenge) {
            Challenge.findOne({ ideas: { $in: [req.params.ideaId] } }).then(challenge => {
                const result = {
                    challenge,
                    idea
                }
                return res.json(result)
            }).catch(err => {
                res.json(err)
            })
        } else {
            const result = {
                challenge: {},
                idea
            }
            return res.json(result)
        }
    }).catch(err => {
        res.json(err)
    })
})

router.delete("/my-ideas/:ideaId", (req, res) => {
    Idea.findByIdAndDelete(req.params.ideaId).then(() => {
        res.json({ message: "idea successfully deleted" })
    }).catch(err => {
        res.json(err)
    })
})

module.exports = router