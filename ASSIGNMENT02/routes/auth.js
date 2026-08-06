const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../models/User");

// GET register form
router.get("/register", (req, res) => {
  res.render("register", { title: "Register" });
});

// POST register - creates a new local account
router.post("/register", async (req, res) => {
  const { username, email, password, password2 } = req.body;
  const errors = [];

  if (!username || !email || !password || !password2) {
    errors.push({ msg: "Please fill in all fields" });
  }
  if (password !== password2) {
    errors.push({ msg: "Passwords do not match" });
  }
  if (password && password.length < 6) {
    errors.push({ msg: "Password should be at least 6 characters" });
  }

  if (errors.length > 0) {
    return res.render("register", { errors, username, email, title: "Register" });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      errors.push({ msg: "That email is already registered" });
      return res.render("register", { errors, username, email, title: "Register" });
    }

    await User.create({ username, email, password }); // password gets hashed in the model's pre-save hook
    req.flash("success_msg", "You are now registered and can log in");
    res.redirect("/auth/login");
  } catch (err) {
    console.error(err);
    errors.push({ msg: "Something went wrong, please try again" });
    res.render("register", { errors, username, email, title: "Register" });
  }
});

// GET login form
router.get("/login", (req, res) => {
  res.render("login", { title: "Log In" });
});

// POST login - local strategy
router.post("/login", (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/orders",
    failureRedirect: "/auth/login",
    failureFlash: true,
  })(req, res, next);
});

// GitHub OAuth login
router.get("/github", passport.authenticate("github", { scope: ["user:email"] }));

router.get(
  "/github/callback",
  passport.authenticate("github", { failureRedirect: "/auth/login" }),
  (req, res) => {
    res.redirect("/orders");
  }
);

// Logout
router.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    req.flash("success_msg", "You are logged out");
    res.redirect("/");
  });
});

module.exports = router;