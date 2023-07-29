const Post = require('../modals/post');
const User=require('../modals/user');

module.exports.home = async function(req, res){
    
    const posts = await Post.find({})
    .sort('-createdAt')
    .populate('user')
    .populate({
        path: 'comments',
        populate: {
            path: 'user'
        }
    })
    .exec();

    const users = await User.find({});
    
    return res.render('home', {
        title: "Codeial | Home",
        posts:  posts,
        all_users: users
    });
}

module.exports.room = function(req,res){
    return res.end('<h2> Room is up and Running!! Hurray!!</h2>');
}