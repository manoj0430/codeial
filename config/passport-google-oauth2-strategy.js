const passport= require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');

const User=require('../modals/user');

 passport.use(new googleStrategy({
        clientID: "517704261631-ke06jcm6hqhgo2ad8u86ga86r6ko2sqm.apps.googleusercontent.com",
        clientSecret: "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",
        callbackURL: "http://localhost:8000/users/auth/google/callback"
    },

    async function(accessToken, refreshToken, profile, done) {
        try {
          const user = await User.findOne({ email: profile.emails[0].value }).exec();
          console.log(accessToken, refreshToken);
          console.log(profile);
          if (user) {
            return done(null, user);
          } else {
            const newUser = await User.create({
              name: profile.displayName,
              email: profile.emails[0].value,
              password: crypto.randomBytes(20).toString('hex')
            });
            return done(null, newUser);
          }
        } catch (err) {
          console.log('error in google strategy passport', err);
          return;
        }
      }
 ))

 module.exports=passport;