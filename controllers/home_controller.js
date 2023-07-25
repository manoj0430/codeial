const Post = require('../modals/post')

module.exports.home = function(req,res){
    // console.log(req.cookies);
    // res.cookie('user_id',25);

    Post.find({}).
    then(posts => {
        return res.render('home',{
            title: "Codeial || Home",
            posts: posts

    });
    })
    .catch(err => {
        console.log("Not able to post");
        return;
    })

    
}

module.exports.room = function(req,res){
    return res.end('<h2> Room is up and Running!! Hurray!!</h2>');
}