require("dotenv").config();

const express = require("express");
const router = express.Router();
const Trip = require("../models/Trip");

router.post("/new", (req, res, next) => {
  const newTrip = new Trip({
    user: req.user,
    car: req.car,
    isFree: false
  });

  newTrip
    .save()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message
      });
    });
});

module.exports = router;