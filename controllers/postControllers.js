const Post = require("../models/Post");

const { body, validationResult } = require("express-validator");

exports.postGetForm = (req, res, next) => {
  res.render("postForm");
};

exports.postFormPost = [
  // validate form
  body(
    "title",
    "title is required for your form must be more then 2 characters"
  )
    .isLength({ min: 2 })
    .escape(),
  body("body", " body is required").isLength({ min: 10 }).escape(),
  (req, res, next) => {
    const errors = validationResult(req);

    const post = {
      title: req.body.title,
      body: req.body.body,
      creator: res.locals.currentUser,
    };

    if (!errors.isEmpty()) {
      res.render("postForm", {
        post,
        errors: errors.array(),
      });
      return;
    }

    const newPost = new Post(post);

    newPost.save((err) => {
      if (err) return next(err);

      res.redirect("/");
    });
  },
];
