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

router.get("/dashboard", (req, res, next) => {
  res.render("sharing/dashboard");
});

module.exports = router;