const express = require('express');
const router = express.Router();
const User = require('../models/User')

router.get("/user-profile", (req, res) => {
    const { _id } = req.user;
    User.findOne({_id})
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
    console.log(req.user)
    User.findOneAndUpdate(
        {_id: req.user._id},
        {
            $set: {
                firstName: firstName,
                lastName: lastName,
                username: username,
                email: email, 
                profileImage: profileImage
            }
        }
    )
    .then(response => {
        console.log(response);
        return res.status(200).json(response)
    })
    .catch(error => {
        res.json(error)
    });
});

module.exports = router