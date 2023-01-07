const express = require("express");
const { route } = require("../app");
const router = express.Router();
const userController = require("../controllers/userControllers");
const postController = require("../controllers/postControllers");
const Post = require("../models/Post");
const User = require("../models/User");

/* GET home page. */
router.get("/", function (req, res, next) {
  Post.find({})
    .populate("creator", "firstName")
    .sort([["postedDate", "descending"]])
    .exec((err, posts) => {
      if (err) return next(err);

      res.render("index", { posts });
    });
});

// Registration routes //
router.get("/register", userController.registerGet);

router.post("/register", userController.registerPost);

// login routes
router.get("/login", userController.loginGet);

router.post("/login", userController.loginPost);

router.get("/logout", userController.logOut);

// Membership request routes.
// decided to leave this here to keep things simple.
router.get("/request-membership", (req, res) => {
  res.render("memberShipForm", { title: "Request Membership" });
});

router.post("/request-membership", (req, res, next) => {
  if (req.body.passcode === process.env.SECRET_MEMBERSHIP) {
    const newVal = { $set: { isMember: true } };
    User.findByIdAndUpdate(req.body.id, newVal, (err, usrob) => {
      if (err) return next(err);
      res.redirect("/");
    });
  } else {
    console.log("error!!!!");
    res.redirect("/");
  }
});

router.get("/admin-request", (req, res) => {
  res.render("memberShipForm", { title: "Become Admin" });
});

router.post("/admin-request", (req, res, next) => {
  if (req.body.passcode === process.env.SECRET_MEMBERSHIP) {
    const newVal = { $set: { isAdmin: true } };
    User.findByIdAndUpdate(req.body.id, newVal, (err, usrob) => {
      if (err) return next(err);
      console.log("success");
      res.redirect("/");
    });
  } else {
    console.log("error!!!!");
    res.redirect("/");
  }
});
// Posts routers
router.get("/post", postController.postGetForm);

router.post("/post", postController.postFormPost);

module.exports = router;
