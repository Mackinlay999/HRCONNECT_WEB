const linkedinRoutes = require("express").Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");

linkedinRoutes.get(
  "/auth/linkedin",
  passport.authenticate("linkedin", { scope: ["profile", "email", "openid"] })
);

linkedinRoutes.get(
  "/auth/linkedin/callback",
  passport.authenticate("linkedin", { failureRedirect: "/" }),
  (req, res) => {
    const user = req.user;
    // console.log(user);
    user.userType = req.session.userType;
    const token = jwt.sign(
      { id: user._id, email: user.email, name: user.name, userType: "user" },
      process.env.SECRET_KEY,
      {
        expiresIn: "1h",
      }
    );
    res.redirect(
      `${process.env.CLIENT_URL}/auth/linkedin/callback?token=${token}&email=${
        user.email
      }&name=${user.name}&userType=${"user"}`
    );
  }
);

linkedinRoutes.get("/auth/status", (req, res) => {
  if (req.isAuthenticated()) {
    res.status(200).json({ user: req.user });
  } else {
    res.status(401).json({ user: null });
  }
});

linkedinRoutes.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.send({ message: "Logged out successfully" });
  });
});

module.exports = linkedinRoutes;
