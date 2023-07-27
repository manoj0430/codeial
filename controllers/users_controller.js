const User = require('../modals/user');

module.exports.profile = async function(req, res) {
  const user = await User.findById(req.params.id);
  return res.render('user_profile', {
    title: 'User Profile',
    profile_user: user
  });
}

module.exports.update = async function(req, res){
  if(req.user.id == req.params.id){
      await User.findByIdAndUpdate(req.params.id, req.body);
      return res.redirect('back');
  }else{
      return res.status(401).send('Unauthorized');
  }
}

module.exports.name = function(req,res){
    return res.end('<h2> Name is rendered</h2>');
}

//render sign-up 

module.exports.signUp = function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }

    return res.render('user_sign_up', {
        title: "Sign Up"
    });
};

// Render Sign-in

module.exports.signIn = function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
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


// sign in and create a session for the user
module.exports.createSession = function(req, res){
    req.flash('success','Logged in Sucessfully');
    return res.redirect('/');
}

module.exports.destroySession = function(req,res){
    req.logout(function(err) {
        if (err) { return next(err); }
        req.flash('success','Logged out Sucessfully');
        res.redirect('/');
      });

    // return res.redirect('/');
}