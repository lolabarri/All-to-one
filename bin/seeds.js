require("dotenv").config();

// Seeds file that remove all users and create 4 new users and two cars

// To execute this seed, run from the root of the project
// $ node bin/seeds.js

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const Car = require("../models/Car");

const bcryptSalt = 10;

mongoose
  .connect(
    process.ENV.DBURL,
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

Car.collection.drop();
User.collection.drop();

let users = [
  {
    name: "Javi",
    email: "javi@olabarri.com",
    password: bcrypt.hashSync("javi", bcrypt.genSaltSync(bcryptSalt)),
    dateBirth: new Date("1986-08-01"),
    yearsExperience: new Date("2005-08-01"),
    role: "User"
  },
  {
    name: "Dani",
    email: "dani@olabarri.com",
    password: bcrypt.hashSync("dani", bcrypt.genSaltSync(bcryptSalt)),
    dateBirth: new Date("1988-01-13"),
    yearsExperience: new Date("2009-08-01"),
    role: "User"
  },
  {
    name: "Leti",
    email: "leti@olabarri.com",
    password: bcrypt.hashSync("leti", bcrypt.genSaltSync(bcryptSalt)),
    dateBirth: new Date("1989-02-24"),
    yearsExperience: new Date("2014-08-01"),
    role: "Administrator"
  },
  {
    name: "Andrés",
    email: "andres@olabarri.com",
    password: bcrypt.hashSync("andres", bcrypt.genSaltSync(bcryptSalt)),
    dateBirth: new Date("1990-09-21"),
    yearsExperience: new Date("2010-08-01"),
    role: "User"
  }
];

let cars = [
  {
    carMake: "DeLorean",
    model: "DMC-12",
    licensePlate: "1234BTF",
    fuel: "Regular",
    purchaseYear: 1982,
    owner: "5c124fc6aa6eaa963c8c2305",
    insurance: "Everybody can use it",
    other: "Be careful, it travels through time",
    location: {type: "Point", coordinates: [-3.719083, 40.434546]}
  },
  {
    carMake: "Aston Martin",
    model: "DB-5",
    licensePlate: "1234BJB",
    fuel: "Diesel",
    purchaseYear: 1942,
    owner: "5c124fc6aa6eaa963c8c2305",
    insurance: "You can crash it if you want",
    other: "My name is Bond, James Bond",
    location: {type: "Point", coordinates: [-3.676668, 40.438084]}
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


 Car.create(cars)
  .then(carsCreated => {
    console.log(`${carsCreated.length} cars created with the following id:`);
    console.log(carsCreated.map(u => u._id));
  })
  .then(() => {
    // Close properly the connection to Mongoose
    mongoose.disconnect();
  })
  .catch(err => {
    console.log(err)
    mongoose.disconnect();
    // throw err;
  });
