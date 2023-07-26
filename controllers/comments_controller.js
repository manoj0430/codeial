const Comment = require('../modals/comment');
const Post = require('../modals/post');


module.exports.create = async function(req, res){
    try {
        const post = await Post.findById(req.body.post);
        if (post){
            const comment = await Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            });
            post.comments.push(comment);
            await post.save();
            res.redirect('/');
        }
    } catch (err) {
        // handle error
        console.log("Unable to comment");
        return;
    }
}

module.exports.destroy = async function(req, res){
    const comment = await Comment.findById(req.params.id);
    if (comment.user == req.user.id){
        let postId = comment.post;
        await comment.deleteOne();
        await Post.findByIdAndUpdate(postId, { $pull: {comments: req.params.id}});
        return res.redirect('back');
    }else{
        return res.redirect('back');
    }
}