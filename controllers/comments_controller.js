const Comment = require('../modals/comment');
const Post = require('../modals/post');

// module.exports.create = function(req,res){
//     Post.findById(req.body.post)
//     .then(post => {
//         Comment.create({
//             content: req.body.content,
//             post: req.body.post,
//             user: req.user._id
//         })
//         .then(comment => {
//             post.comments.push(comment);
//             post.save();

//             res.redirect('/');
//         }).catch(err => {
//             console.log("Unable to post Comment");
//             return;
//         })
//     })

// }

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