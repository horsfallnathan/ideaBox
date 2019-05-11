const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const passport = require('passport');

const User = require("../models/User");

router.post("/signup", (req, res, next) => {
  const { username, password, firstName, lastName, email, role } = req.body

  if (!username || !password) {
    return res
      .status(422)
      .json({ message: 'Prove username and password' });
  }

  if (password.length < 7) {
    return res
      .status(422)
      .json({ message: 'Please make your password at least 8 characters long for security purposes.' });
  }

  User.findOne({ username })
    .then(user => {
      if (user)
        return res.status(409)
          .json({ message: 'Username already taken' })

      const salt = bcrypt.genSaltSync();
      const hashPass = bcrypt.hashSync(password, salt);

      return User.create({
        firstName: firstName,
        lastName: lastName,
        username: username,
        password: hashPass,
        email: email,
        role: role
      });
    })
    .then(newUser => {
      req.login(newUser, () => {
        return res.status(200).json(newUser)
      })
    })
    .catch(error => {
      console.log(error)
      res.status(500).json(error)
    })

})

router.post('/login', passport.authenticate('local'), (req, res) => {
  req.login(req.user, err => {
    if (err)
      return res.status(500).json({
        message: 'Something went wrong in the authentication process'
      })
    return res.json(req.user)
  }),
    (error, req, res) => {
      return res.status(401).json(error)
    }
})

router.post("/logout", (req, res) => {
  req.logout();
  res.status(200).json({ message: "User successfully logged out" });
});


router.get("/loggedin", (req, res) => {
  if (req.isAuthenticated()) return res.json(req.user);
  return res.json(null);
});





// router.get('/userFind', (req, res, next) => {
//   User.find({})
//   .then(users => {
//     res.json(users)
//   })
//   .catch(err => {
//     res.json(err)
//   })
// })



// router.get("/logout", (req, res) => {
//   req.logout();
//   res.redirect("/");
// });

// router.get("/login", (req, res, next) => {
//   res.render("auth/login", { "message": req.flash("error") });
// });

// router.post("/login", passport.authenticate("local", {
//   successRedirect: "/",
//   failureRedirect: "/auth/login",
//   failureFlash: true,
//   passReqToCallback: true
// }));

// router.get("/signup", (req, res, next) => {
//     res.render("auth/signup");
//   });

module.exports = router;