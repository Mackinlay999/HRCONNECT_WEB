const passport = require("passport");
const LinkedInStrategy = require("passport-linkedin-oauth2").Strategy;
const User = require("../../../model/users/UserModel");
const dotenv = require("dotenv");
dotenv.config();

passport.use(
  new LinkedInStrategy(
    {
      clientID: process.env.LINKEDIN_CLIENT_ID,
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
      callbackURL: process.env.LINKEDIN_CALLBACK_URL || "http://localhost:8585/auth/linkedin/callback",
      state: true,
      passReqToCallback: true,
    },
    async (req, accessToken, refreshToken, profile, done) => {
      try {
        // Try to find the user by LinkedIn ID
        let user = await User.findOne({ linkedinId: profile.id });

        // If user not found by LinkedIn ID, try to find by email
        if (!user) {
          user = await User.findOne({ email: profile._json.email });
        }

        if (user) {
          // User exists, update LinkedIn ID if not set
          if (!user.linkedinId) {
            user.linkedinId = profile.id;
            await user.save();
          }
        } else {
          // User does not exist, create a new one
          const newUser = {
            linkedinId: profile.id,
            name: profile.displayName,
            email: profile._json.email,
            image: profile._json.picture,
            userType: req.session.userType,
          };
          // Only add phone_number if it is provided and not null
          if (profile._json.phone_number) {
            newUser.phone_number = profile._json.phone_number;
          }
          user = await User.create(newUser);
        }

        return done(null, user);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

module.exports = passport;
