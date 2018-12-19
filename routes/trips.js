require("dotenv").config();

const express = require("express");
const router = express.Router();
const Trip = require("../models/Trip");
const Car = require("../models/Car");

router.post("/start/:car_id", (req, res, next) => {
  Car.findByIdAndUpdate(req.params.car_id, {isFree:false}, {new: true}).then(car => {
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
  .catch(err => console.log(err))
});

router.post("/finish/:trip_id", (req, res, next) => {
  console.log(req.body);
  Trip.findByIdAndUpdate(req.params.trip_id, {isFinished:true}, {new: true}).then(trip => {
    Car.findByIdAndUpdate(trip.car, {isFree:true}, {new:true})
      .then(data => {
        res.json(data);
      })
      .catch(err => {
        res.status(500).send({
          message: err.message
        });
      });
  })
  .catch(err => console.log(err))
});

module.exports = router;