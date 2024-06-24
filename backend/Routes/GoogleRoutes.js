const googleRoutes = require("express").Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");

googleRoutes.get("/auth/google", (req, res, next) => {
  const userType = req.query.userType;
  req.session.userType = userType;
  passport.authenticate("google", { scope: ["profile", "email"] })(
    req,
    res,
    next
  );
});

googleRoutes.get(
  "/auth/google/callback",
  passport.authenticate("google"),
  (req, res) => {
    const user = req.user;
    console.log(user);
    user.userType = req.session.userType;

    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        name: user.name,
        userType: "user",
      },
      process.env.SECRET_KEY,
      { expiresIn: "1h" }
    );

    res.redirect(
      `http://localhost:3000/auth/google/callback?token=${token}&email=${
        user.email
      }&name=${user.name}&userType=${"user"}`
    );
  }
);

googleRoutes.get("/auth/status", (req, res) => {
  if (req.isAuthenticated()) {
    res.status(200).json({ user: req.user });
  } else {
    res.status(401).json({ user: null });
  }
});

googleRoutes.get("/google-user", (req, res) => {
  res.send(req.user);
});

googleRoutes.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.send({ message: "Logged out successfully" });
  });
});

module.exports = googleRoutes;
