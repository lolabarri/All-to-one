const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.use((req, res, next) => {
  if (req.user) {
    next();
    return;
  }
  res.redirect("/auth/login");
});

router.get("/:user_id", (req, res, next) => {
  User.findById(req.params.user_id, (error, user) => {
    if (error) {
      next(error);
    } else {
      res.render("users/dashboard", { user: user });
    }
  });
});

router.get("/", (req, res, next) => {
  User.find()
    .then(usersFromDB => {
      res.render("users/index", { users: usersFromDB });
    })
    .catch(error => {
      next(error);
    });
});

router.get("/:user_id/delete", (req, res, next) => {
  User.remove({ _id: req.params.user_id }, function(error, car) {
    if (error) {
      next(error);
    } else {
      res.redirect("/users");
    }
  });
});

module.exports = router;
