const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.get("/all-users", (req, res) => {
    User.find({}).then(allUsers => {
        res.json(allUsers)
    }).catch(err => {
        res.json(err)
    })
})

router.put('/update-role-to-manager/:userId', (req, res) => {
    User.findByIdAndUpdate(req.params.userId, { role: "manager" }).then(updatedUser => {
        res.json(updatedUser)
    }).catch(err => {
        res.json(err)
    })
})

router.put('/update-role-to-employee/:userId', (req, res) => {
    User.findByIdAndUpdate(req.params.userId, { role: "employee" }).then(updatedUser => {
        res.json(updatedUser)
    }).catch(err => {
        res.json(err)
    })
})

module.exports = router
