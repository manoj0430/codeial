module.exports.home = function(req,res){
    console.log(req.cookies);
    res.cookie('user_id',25);

    return res.render('home',{
            title: "Home"
    });
}

module.exports.room = function(req,res){
    return res.end('<h2> Room is up and Running!! Hurray!!</h2>');
}