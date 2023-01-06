const express = require("express");
const { route } = require("../app");
const router = express.Router();
const userController = require("../controllers/userControllers");
const postController = require("../controllers/postControllers");
const Post = require("../models/Post");

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

// Membership request routes
router.get("/request-membership", (req, res) => {
  res.send("membership get to be implemented");
});

router.post("request-membership", (req, res) => {
  res.send("membership post to be implemented");
});

// Posts routers
router.get("/post", postController.postGetForm);

router.post("/post", postController.postFormPost);

module.exports = router;
