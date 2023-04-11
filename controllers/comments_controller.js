const Comment= require('../models/comment');
const Post= require('../models/post');

module.exports.create= function(req,res){
    Post.findById(req.body.post).then(
        function(post){
            const newComment= new Comment({
                content:req.body.content,
                post:post._id,
                user:req.user.id
            });
            newComment.save().then(function(comment){
                console.log("Comment added to the post")
                return res.redirect('back');
            })
            .catch((error)=>console.log("some error occured.."));
            post.comments.push(newComment);// important syntax to fill the comments array in post DB
            post.save();
        }
    ).catch(
        function(error){
            console.log("Some Error Occured while adding the comment to the Post");
            return;
        }
    )

}