require("dotenv").config();

const express = require("express");
const router = express.Router();
const Car = require("../models/Car");
const User = require("../models/User");

router.use((req, res, next) => {
  if (req.user) {
    next();
    return;
  }
  res.redirect("/auth/login");
});

// GET => render the form to create a new car
router.get("/new", (req, res, next) => {
  res.render("cars/new");
});

// POST => to create new car and save it to the DB
router.post("/new", (req, res, next) => {
  const newCar = new Car({
    carMake: req.body.carMake,
    model: req.body.model,
    licensePlate: req.body.licensePlate,
    fuel: req.body.fuel,
    purchaseYear: req.body.purchaseYear,
    owner: req.user,
    insurance: req.body.insurance,
    other: req.body.other,
    location: { type: "Point", coordinates: [-3.7119868, 40.4925889] },
    isFree: true
  });

  newCar.save(error => {
    if (error) {
      next(error);
    } else {
      res.redirect("/cars");
    }
  });
});

router.get("/", (req, res, next) => {
  Car.find()
    .then(carsFromDB => {
      res.render("cars/index", { cars: carsFromDB });
    })
    .catch(error => {
      next(error);
    });
});

// GET => get the form pre-filled with the details of one car
router.get("/:car_id/edit", (req, res, next) => {
  Car.findById(req.params.car_id, (error, car) => {
    if (error) {
      next(error);
    } else {
      res.render("cars/update", { car });
    }
  });
});

// POST => save updates in the database
router.post("/:car_id", (req, res, next) => {
  Car.findById(req.params.car_id, (error, car) => {
    if (error) {
      next(error);
    } else {
      car.carMake = req.body.carMake;
      car.model = req.body.model;
      car.licensePlate = req.body.licensePlate;
      car.fuel = req.body.fuel;
      car.purchaseYear = req.body.purchaseYear;
      car.insurance = req.body.insurance;
      car.other = req.body.other;
      car.save(error => {
        if (error) {
          next(error);
        } else {
          res.redirect(`/cars/${req.params.car_id}`);
        }
      });
    }
  });
});

// DELETE => remove the car from the DB
router.get("/:car_id/delete", (req, res, next) => {
  Car.remove({ _id: req.params.car_id }, function(error, car) {
    if (error) {
      next(error);
    } else {
      res.redirect("/cars");
    }
  });
});

// to see raw data in your browser, just go on: http://localhost:3000/api
router.get("/api", (req, res, next) => {
  Car.find({}, (error, allCarsFromDB) => {
    if (error) {
      next(error);
    } else {
      res.status(200).json({ cars: allCarsFromDB });
    }
  });
});

// to see raw data in your browser, just go on: http://localhost:3000/api/someIdHere
router.get("/api/:id", (req, res, next) => {
  let carId = req.params.id;
  Car.findOne({ _id: carId }, (error, oneCarFromDB) => {
    if (error) {
      next(error);
    } else {
      res.status(200).json({ car: oneCarFromDB });
    }
  });
});

// GET => get the details of one car
router.get("/:car_id", (req, res, next) => {
  let carId = req.params.car_id;
  Car.findById(carId)
    .populate({ path: "owner", select: "name" })
    .then(car => {
      if (!car) {
        return res.status(404).render("not-found");
      }
      res.render("cars/show", { car: car });
    })
    .catch(next);
});

router.get("/users/:user_id", (req, res, next) => {
  User.findById(req.params.user_id, (error, user) => {
    if (error) {
      next(error);
    } else {
      res.render("../users/dashboard", { user: user });
    }
  });
});

module.exports = router;