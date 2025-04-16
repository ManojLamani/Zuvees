const express = require("express");
const passport = require("passport");
const router = express.Router();

// Google Auth Start
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],  // 👈 Add scope here
  })
);

// Google Auth Callback
router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: "/auth/login/success",
    failureRedirect: "/auth/login/failed",
  })
);

// Optional: Add login success route
router.get("/login/success", (req, res) => {
  if (req.user) {
    res.status(200).json({
      message: "Login successful",
      user: req.user,
    });
  } else {
    res.status(401).json({ message: "Not authorized" });
  }
});

// Optional: Add login failed route
router.get("/login/failed", (req, res) => {
  res.status(401).json({
    message: "Login failed",
  });
});

module.exports = router;
