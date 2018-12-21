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

  router.get("/", (req, res, next) => {
    User.find()
      .then(usersFromDB => {
        res.render("users/index", { users: usersFromDB });
      })
      .catch(error => {
        next(error);
      });
  });

// router.get("/:user_id", (req, res, next) => {
//   let userId = req.params.user_id;
//   User.findById(userId)
//     .then(user => {
//       if (!user) {
//         return res.status(404).render("not-found");
//       }
//       res.render("users/dashboard", { user: user });
//     })
//     .catch(next);
// });

module.exports = router;