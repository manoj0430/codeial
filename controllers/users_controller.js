module.exports.profile = function(req,res){
    return res.end('<h1>User Profile</h1>');
}

module.exports.name = function(req,res){
    return res.end('<h2> Name is rendered</h2>');
}