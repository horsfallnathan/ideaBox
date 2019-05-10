// Seeds file that remove all users and create 2 new users

// To execute this seed, run from the root of the project
// $ node bin/seeds.js

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const Idea = require("../models/Idea")
const Challenge = require("../models/Challenge")

const bcryptSalt = 10;

mongoose
  .connect('mongodb://localhost/ideabox-api', { useNewUrlParser: true })
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });

let users = [
  {
    username: "alice",
    password: bcrypt.hashSync("1234578", bcrypt.genSaltSync(bcryptSalt)),
    ideas: ["5cd193aa9da2f33aa4476c81", "5cd193aa9da2f33aa4476c82"]
  },
  {
    username: "bob",
    password: bcrypt.hashSync("12345678", bcrypt.genSaltSync(bcryptSalt)),
  }
]

let ideas = [
  {
    title: "Super amazing idea",
    description: "You only live once"
  },
  {
    title: "Best idea ever",
    description: "Hakuna Matata"
  }
]

let challenges = [
  {
    title: "da real sh*t",
    description: "I like the way you work it",
    ideas: ["5cd193aa9da2f33aa4476c81"],
    createdBy: "5cd196c2ca40cb3ab0609932",
    challengeNumber: 23
  },
  {
    title: "challenge",
    description: "how to make all employees go to Jamaica without using too much budget",
    createdBy: "5cd196c2ca40cb3ab0609932",
    challengeNumber: 2
  },
  {
    title: "yeeaaff",
    description: "I like the way you work it",
    ideas: ["5cd193aa9da2f33aa4476c81"],
    createdBy: "5cd196c2ca40cb3ab0609932",
    challengeNumber: 23
  },
]

// Challenge.create(challenges).then(challengesCreated => {
//   console.log(`${challengesCreated.length} challenges created (: `)
//   console.log(challengesCreated)
// })
//   .then(() => {
//     // Close properly the connection to Mongoose
//     mongoose.disconnect()
//   })
//   .catch(err => {
//     console.error(err)
//     mongoose.disconnect()
//     throw err
//   })

// User.create(users)
//   .then(usersCreated => {
//     console.log(`${usersCreated.length} users created (: `)
//     console.log(usersCreated)
//   }).catch(err => {
//     console.error(err)
//   })
//   .then(() => {
//     // Close properly the connection to Mongoose
//     mongoose.disconnect()
//   })
//   .catch(err => {
//     mongoose.disconnect()
//     throw err
//   })

Idea.create(ideas)
  .then(ideasCreated => {
    console.log(`${ideasCreated.length} ideas created, a factory of ideas! YAY! (: `)
    console.log(ideasCreated)
  }).catch(err => {
    console.error(err)
  })
  .then(() => {
    // Close properly the connection to Mongoose
    mongoose.disconnect()
  })
  .catch(err => {
    mongoose.disconnect()
    throw err
  })

// User.deleteMany()
//   .then(() => {
//     return User.create(users)
//   })
//   .then(usersCreated => {
//     console.log(`${usersCreated.length} users created with the following id:`);
//     console.log(usersCreated.map(u => u._id));
//   })
//   .then(() => {
//     // Close properly the connection to Mongoose
//     mongoose.disconnect()
//   })
//   .catch(err => {
//     mongoose.disconnect()
//     throw err
//   })