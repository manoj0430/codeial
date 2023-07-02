module.exports.home = function(req,res){
    return res.end('<h1> Express is up in Codeial</h1>');
}

module.exports.room = function(req,res){
    return res.end('<h2> Room is up and Running!! Hurray!!</h2>');
}