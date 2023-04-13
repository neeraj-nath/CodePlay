const Post=require('../models/post')
const Comment = require('../models/comment');

module.exports.create=function(req,res){
    const newPost= new Post({
        content: req.body.content,
        user: req.user.id
    });
    newPost.save().then(function(post){
        return res.redirect('back');
    })
    .catch(function(error){
        console.log('There occured some error while trying to add the post to the database:', error);
        return;
    })
};

module.exports.destroy= function(req,res){
    Post.findById(req.params.id).then(
        function(post){
            if (post.user==req.user.id){
                console.log("post.user==req.user.id");
                post.deleteOne();

                Comment.deleteMany({post:req.params.id}).catch((error)=> console.log(error));
                return res.redirect('back');
            }
            else{
                return res.redirect('back');
            }
        }
    ).catch(
        function(error){
            console.log("Some error occured while trying to delete the Post", error);
            return res.redirect('back');
        }
    )
}