// Seeds file that remove all users and create 4 new users

// To execute this seed, run from the root of the project
// $ node bin/seeds.js

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

const bcryptSalt = 10;

mongoose
  .connect(
    `mongodb://localhost/all-to-one`,
    { useNewUrlParser: true }
  )
  .then(x => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
  })
  .catch(err => {
    console.error("Error connecting to mongo", err);
  });

let users = [
  {
    name: "Javi",
    email: "javi@olabarri.com",
    password: bcrypt.hashSync("javi", bcrypt.genSaltSync(bcryptSalt)),
    dateBirth: new Date("1986-08-01"),
    yearsExperience: 14,
    isOwner: true,
    role: "User"
  },
  {
    name: "Dani",
    email: "dani@olabarri.com",
    password: bcrypt.hashSync("dani", bcrypt.genSaltSync(bcryptSalt)),
    dateBirth: new Date("1988-01-13"),
    yearsExperience: 12,
    isOwner: true,
    role: "User"
  },
  {
    name: "Leti",
    email: "leti@olabarri.com",
    password: bcrypt.hashSync("leti", bcrypt.genSaltSync(bcryptSalt)),
    dateBirth: new Date("1989-02-24"),
    yearsExperience: 4,
    isOwner: false,
    role: "Administrator"
  },
  {
    name: "Andrés",
    email: "andres@olabarri.com",
    password: bcrypt.hashSync("andres", bcrypt.genSaltSync(bcryptSalt)),
    dateBirth: new Date("1990-09-21"),
    yearsExperience: 9,
    isOwner: false,
    role: "User"
  }
];

User.deleteMany()
  .then(() => {
    return User.create(users);
  })
  .then(usersCreated => {
    console.log(`${usersCreated.length} users created with the following id:`);
    console.log(usersCreated.map(u => u._id));
  })
  .then(() => {
    // Close properly the connection to Mongoose
    mongoose.disconnect();
  })
  .catch(err => {
    mongoose.disconnect();
    throw err;
  });
