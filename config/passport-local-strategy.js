const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;

const User=require('../modals/user');

// authentication using passport
passport.use(new LocalStrategy({
        usernameField: 'email'
        },
      //call back function
        // function(email, password, done){
        // // find user and establish identity
        // User.findOne({email: email}, function(err,user){
        //     if(err){
        //         console.log('Error in finding user --> Passport');
        //         return done(err);
        //     }

        //     if(!user || user.password!= password){
        //         console.log('Invalid Username/password');
        //         return done(null,false);
        //     }

        //     return done(null, user);
        // })
        // }

        async function(email, password, done){
            // find user and establish identity
            try {
                const user = await User.findOne({email: email});
                
                if(!user || user.password!= password){
                    console.log('Invalid Username/password');
                    return done(null,false);
                }
    
                return done(null, user);
            } catch (err) {
                console.log('Error in finding user --> Passport');
                return done(err);
            }
    }

))

//serializing the user

passport.serializeUser(function(user, done){

    done(null, user.id);
})

//deserializing the user from the key in cookies
passport.deserializeUser(async function(id, done) {
    try {
      const user = await User.findById(id);
      return done(null, user);
    } catch (err) {
      console.log('Error in finding user --> Passport');
      return done(err);
    }
  });

  //check if user is authenticated
  passport.checkAuthentication = function(req,res,next){
    //if the user is signed in, then pass on the request to next authentication
    if(req.isAuthenticated()){
        return next();
    }

    // if user is not signed in
    return res.redirect('/users/sign-in');
  }

  passport.setAuthenticatedUser = function(req,res,next){
    if(req.isAuthenticated()){
        //req.user contains 
        res.locals.user = req.user;
    }
    next();
  }
module.exports = passport;