
const passport = require("passport");
const User = require("../models/User");

exports.login = (req, res) => {
  res.send("Google login");
};

exports.googleCallback = (req, res) => {
  res.redirect("http://localhost:3000"); 

exports.isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ message: "Unauthorized" });
};

exports.logout = (req, res) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/auth/login");
  });
};
