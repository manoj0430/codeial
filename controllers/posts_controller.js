const Post = require('../modals/post');

module.exports.create = function(req,res){
    Post.create({
        content: req.body.content,
        user: req.user._id
    }).then(post => {
        return res.redirect('back');
    })
    .catch(err => {
        console.log('Error in creating Post');
            return;
    })
}

module.exports.destroy = async function(req, res){
    const post = await Post.findById(req.params.id);
    if (post.user == req.user.id){
        await post.remove();
        await Comment.deleteMany({post: req.params.id});
        return res.redirect('back');
    }else{
        return res.redirect('back');
    }
}