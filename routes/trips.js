require("dotenv").config();

const express = require("express");
const router = express.Router();
const Trip = require("../models/Trip");
const Car = require("../models/Car");

// Creates a new trip and updates car "isFree" to false
router.post("/start/:car_id", (req, res, next) => {
  Car.findByIdAndUpdate(req.params.car_id, { isFree: false }, { new: true })
    .then(car => {
      const newTrip = new Trip({
        user: req.user,
        car: car._id,
        isFinished: false
      });
      newTrip
        .save()
        .then(data => {
          res.json(data);
        })
        .catch(err => {
          res.status(500).send({
            message: err.message
          });
        });
    })
    .catch(err => console.log(err));
});

router.post("/location/:car_id", (req, res, next) => {
  console.log("hola")
  let position = {
    type: "Point",
    coordinates: [req.body.location.lng, req.body.location.lat]
  };
  Car.findByIdAndUpdate(req.params.car_id, { location: position }).then(
    data => {
      res.json(data);
    }
  )
  .catch(err => console.log(err));
});

// Updates the trip to "isFinished" and car "isFree" to true
router.post("/finish/:trip_id", (req, res, next) => {
  console.log(req.body);
  Trip.findByIdAndUpdate(
    req.params.trip_id,
    { isFinished: true },
    { new: true }
  )
    .then(trip => {
      Car.findByIdAndUpdate(trip.car, { isFree: true }, { new: true })
        .then(data => {
          res.json(data);
        })
        .catch(err => {
          res.status(500).send({
            message: err.message
          });
        });
    })
    .catch(err => console.log(err));
});

module.exports = router;
