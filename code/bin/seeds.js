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

Car.collection.drop();
User.collection.drop();

let users = [
  {
    name: "Javi",
    email: "javi@olabarri.com",
    password: bcrypt.hashSync("javi", bcrypt.genSaltSync(bcryptSalt)),
    dateBirth: new Date("1986-08-01"),
    yearsExperience: 14,
    role: "User"
  },
  {
    name: "Dani",
    email: "dani@olabarri.com",
    password: bcrypt.hashSync("dani", bcrypt.genSaltSync(bcryptSalt)),
    dateBirth: new Date("1988-01-13"),
    yearsExperience: 12,
    role: "User"
  },
  {
    name: "Leti",
    email: "leti@olabarri.com",
    password: bcrypt.hashSync("leti", bcrypt.genSaltSync(bcryptSalt)),
    dateBirth: new Date("1989-02-24"),
    yearsExperience: 4,
    role: "Administrator"
  },
  {
    name: "Andrés",
    email: "andres@olabarri.com",
    password: bcrypt.hashSync("andres", bcrypt.genSaltSync(bcryptSalt)),
    dateBirth: new Date("1990-09-21"),
    yearsExperience: 9,
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
    location: [-3.719083, 40.434546]
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
    location: [-3.676668, 40.438084]
  }
];

// let cars = [
//   {
//     carMake: "DeLorean",
//     model: "DMC-12",
//     licensePlate: "1234BTF",
//     fuel: "Regular",
//     purchaseYear: 1982,
//     owner: {
//       name: "Doc",
//       email: "doc@olabarri.com",
//       password: bcrypt.hashSync("doc", bcrypt.genSaltSync(bcryptSalt)),
//       dateBirth: new Date("1914-07-14"),
//       yearsExperience: 9,
//       role: "User"
//     },
//     insurance: "Everybody can use it",
//     other: "Be careful, it travels through time",
//     location: [-3.719083, 40.434546]
//   },
//   {
//     carMake: "Aston Martin",
//     model: "DB-5",
//     licensePlate: "1234BJB",
//     fuel: "Diesel",
//     purchaseYear: 1942,
//     owner: {
//       name: "James Bond",
//       email: "jamesbond@olabarri.com",
//       password: bcrypt.hashSync("jamesbond", bcrypt.genSaltSync(bcryptSalt)),
//       dateBirth: new Date("1920-11-15"),
//       yearsExperience: 2,
//       role: "User"
//     },
//     insurance: "You can crash it if you want",
//     other: "My name is Bond, James Bond",
//     location: [-3.676668, 40.438084]
//   }
// ];

// const createUsers = cars.map(car => {
//   const newUser = new User(car.owner);
//   return newUser
//     .save()
//     .then(user => {
//       return user.name;
//     })
//     .catch(error => {
//       throw new Error(`Impossible to add the owner. ${error}`);
//     });
// });

// let findUsers = Promise.all(createUsers)
//   .then(users => {
//     return cars.map(car => {
//       return User.findOne({
//         name: car.owner.name,
//         email: car.owner.email,
//         password: car.owner.password,
//         dateBirth: car.owner.dateBirth,
//         yearsExperience: car.owner.yearsExperience,
//         role: car.owner.role
//       }).then(user => {
//         if (!user) {
//           throw new Error(
//             `unknown owner ${car.owner.name}`
//           );
//         }
//         return Object.assign({}, car, { user: user._id });
//       });
//     });
//   })
//   .catch(error => {
//     throw new Error(error);
//   });

//   const saveCars = findUsers.then(findUsers => {
//     return Promise.all(findUsers)
//     .then(cars => {
//       return cars.map(car => {
//           const newCar = new Car(car);
//           return newCar.save();
//       })
//     })
//   }).then(savedCars => {
//     Promise.all(savedCars)
//     .then(cars => cars.forEach(car => console.log(`created ${car.carMake}`)))
//     .then(mongoose.connection.close())
//     .catch(err => console.log("papu",err))
//   });

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

Car.deleteMany()
  .then(() => {
    return Car.create(cars);
  })
  .then(carsCreated => {
    console.log(`${carsCreated.length} cars created with the following id:`);
    console.log(carsCreated.map(u => u._id));
  })
  .then(() => {
    // Close properly the connection to Mongoose
    mongoose.disconnect();
  })
  .catch(err => {
    mongoose.disconnect();
    throw err;
  });
