const User = require('../modals/user');

module.exports.profile = function(req,res){
    //  if(req.cookies.user_id){
    //     User.findById(req.cookies.user_id, function(err, user){
    //         if(user){
    //             return res.render('user-profile',{
    //                 title: "User Profile",
    //                 user: user
    //             });
    //         }

    //         return res.redirect('/users/sign-in');
    //     });
    //  }
    //  else{
    //     return res.redirect('/users/sign-in');
    //  }
    if (req.cookies.user_id) {
        // If it exists, find the user by the provided 'user_id'
        User.findById(req.cookies.user_id)
          .then(function(user) {
            if (user) {
              return res.render('user_profile', {
                title: "User Profile",
                user: user
              });
            } else {
              return res.redirect('/users/sign-in');
            }
          })
          .catch(function(err) {
            console.log('Error in finding user by user_id:', err);
            return res.redirect('/users/sign-in');
          });
      } else {
        // If the 'user_id' cookie does not exist, redirect to the sign-in page
        return res.redirect('/users/sign-in');
      }
}

module.exports.name = function(req,res){
    return res.end('<h2> Name is rendered</h2>');
}

//render sign-up 

module.exports.signUp = function(req,res){
    return res.render('user_sign_up', {
        title: "Sign Up"
    });
};

// Render Sign-in

module.exports.signIn = function(req,res){
    return res.render('user_sign_in', {
        title: "Sign In"
    });
};

// render Sign up form

module.exports.create = function(req,res){
    //if password and confirm password doesnot match
    if(req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }
    
    // User.findOne({email: req.body.email}, function(err, user){
    //     if(err){
    //         console.log('Error in finding user in signing up');
    //         return;
    //     }
        
    //     if(!user){
    //         User.create(req.body, function(err,user){
    //             if(err){
    //                 console.log('Error in creating user');
    //                 return;
    //             }
    //             return res.redirect('/users/sign-in');
    //         })
    //     }else{
    //         return res.redirect('back');
    //     }
    // })

    User.findOne({ email: req.body.email })
  .then((user) => {
    if (!user) {
      return User.create(req.body);
    } else {
      throw new Error('User already exists');
    }
  })
  .then((user) => {
    return res.redirect('/users/sign-in');
  })
  .catch((err) => {
    console.log('Error:', err.message);
    return res.redirect('back');
  }); 

    
}

//sign in and create a session for user
module.exports.createSession=function(req,res){
  // steps to authenticate
  // find the user
  User.findOne({ email: req.body.email })
    .then(function(user) {
      // handle user found
      if (user) {
        // handle password which doesn't match
        if (user.password !== req.body.password) {
          return res.redirect('back');
        }

        // handle session creation
        res.cookie('user_id', user.id);
        return res.redirect('/users/profile');
      } else {
        // handle user not found
        return res.redirect('back');
      }
    })
    .catch(function(err) {
      console.log('error in finding user in signing in', err);
      return;
    });
}