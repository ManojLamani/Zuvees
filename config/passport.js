const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require("mongoose");
const User = require("../models/User");
const ApprovedEmail = require("../models/ApprovedEmail");

passport.serializeUser((user, done) => {
  done(null, user.id); // store user ID in session
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => done(null, user));
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:5000/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Check if the email is pre-approved
        const email = profile.emails[0].value;
        const approved = await ApprovedEmail.findOne({ email });

        if (!approved) {
          return done(null, false, {
            message: "Email not approved for login.",
          });
        }

        // Check if user already exists
        let user = await User.findOne({ googleId: profile.id });

        if (!user) {
          // If not, create new user
          user = await new User({
            googleId: profile.id,
            name: profile.displayName,
            email: email,
            role: approved.role || "user", // role from approved list or default 'user'
          }).save();
        }

        return done(null, user);
      } catch (err) {
        console.error("Error in GoogleStrategy:", err);
        done(err, null);
      }
    }
  )
);
