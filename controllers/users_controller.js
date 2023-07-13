module.exports.profile = function(req,res){
    return res.render('user_profile', {
        title: 'User Profile'
    });
}

module.exports.name = function(req,res){
    return res.end('<h2> Name is rendered</h2>');
}