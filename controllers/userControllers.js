const User = require("../models/User");
const bcrypt = require("bcryptjs");
const { body, validationResult } = require("express-validator");
const passport = require("passport");

// register get form;
exports.registerGet = (req, res, next) => {
  res.render("regForm", { title: "Register for the site" });
};

// register post form;
exports.registerPost = [
  // validate fields
  body(
    "firstname",
    "First name is required and must be more then 2 charaters or more"
  )
    .trim()
    .isLength({ min: 2 })
    .escape(),
  body("lastname", "Last name is required and must be 4 or more characters")
    .trim()
    .isLength({ min: 4 })
    .escape(),
  body("email", "email is required and must be in johndoe@google.com format")
    .trim()
    .isEmail()
    .escape(),
  body("password", "password is required and must be min 4 length")
    .trim()
    .isLength({ min: 4 }),
  body(
    "passwordconfirm",
    "password confirm is required and must be min 4 length and match password"
  )
    .trim()
    .isLength({ min: 4 })
    .custom((val, { req }) => {
      if (val !== req.body.password) {
        throw new Error("Passwords confirm does not match");
      } else {
        return true;
      }
    }),
  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.render("regForm", {
        title: "Register for the site",
        errors: errors.array(),
      });

      return;
    }

    bcrypt.hash(req.body.password, 12, (err, hashedpassword) => {
      if (err) return next(err);

      const newUser = new User({
        firstName: req.body.firstname,
        lastName: req.body.lastname,
        email: req.body.email,
        password: hashedpassword,
      });

      newUser.save((err) => {
        if (err) return next(err);

        res.redirect("/");
      });
    });
  },
];

// Login / Logout controllers
exports.loginGet = (req, res, next) => {
  res.render("loginForm");
};

exports.loginPost = passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/",
});

exports.logOut = (req, res, next) => {
  req.logOut((err) => {
    if (err) return next(err);

    res.redirect("/");
  });
};
