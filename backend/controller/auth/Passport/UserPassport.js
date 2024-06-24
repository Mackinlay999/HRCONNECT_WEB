const passport = require('passport');
const  GoogleStrategy = require('passport-google-oauth20').Strategy;
const dotenv = require('dotenv');
dotenv.config()
const User = require('../../../model/users/UserModel')

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback"
  },
  async (accessToken, refreshToken, profile, cb) => {
    try {
      console.log("profile", profile);
      let user = await User.findOne({ googleId: profile.id });
      if (user) {
        return cb(null, user);
      } else {
        user = new User({
          googleId: profile.id,
          name: profile.displayName,
          email: profile.emails[0].value,
          image: profile.photos[0].value,
          userType: profile.userType
        });
        await user.save();
        return cb(null, user);
      }
    } catch (err) {
      return cb(err, null);
    }
  }
  ));

  passport.serializeUser((user,done)=>{
    done(null,user)
  })

  passport.deserializeUser(async (id,done)=>{
    try {
      const user = await User.findById(id)
      done(null, user)
    } catch (error) {
      done(error, null)
    }
  })