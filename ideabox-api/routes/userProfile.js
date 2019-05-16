const express = require('express');
const router = express.Router();
const User = require('../models/User')

router.get("/user-profile", (req, res) => {
    const { _id } = req.user;
    User.findOne({ _id })
        .then(info => {
            res.json(info)
        }).catch(error => {
            res.json(error)
        })
})

router.put("/user-profile", (req, res) => {
    const {
        firstName,
        lastName,
        username,
        email,
        profileImage
    } = req.body;
    User.findByIdAndUpdate(
        req.user._id, {
            firstName,
            lastName,
            username,
            email,
            profileImage
        })
        .then(response => {
            return res.json(response)
        })
        .catch(error => {
            res.json(error)
        });
});

module.exports = router