const express = require('express');
const router = express.Router();
const Comment = require('../models/Comment')
const Idea = require('../models/Idea')

router.post('/add-comment', (req, res) => {
    const userId = req.user._id
    const { content, ideaId } = req.body
    Comment.create({ content, createdBy: userId }).then(createdComment => {
        Idea.findByIdAndUpdate(ideaId, { $push: { comments: createdComment._id } }).then(idea => {
            res.json(idea).catch(err => {
                res.json(err)
            })
        })
        res.json(createdComment)
    }).catch(err => {
        res.json(err)
    })
})

module.exports = router