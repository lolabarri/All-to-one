const express = require("express");
const router = express.Router();
const User = require("../models/User");


router.use((req, res, next) => {
  if(req.user) {
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

module.exports = router;