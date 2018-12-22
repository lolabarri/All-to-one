const express = require("express");
const router = express.Router();
const User = require("../models/User");

/* GET home page */
router.get("/", (req, res, next) => {
  const user = req.session.currentUser;
  res.render("index", {user});
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