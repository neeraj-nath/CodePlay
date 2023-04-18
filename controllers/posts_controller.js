const Post=require('../models/post')
const Comment = require('../models/comment');

module.exports.create= async function(req,res){
    // const newPost= new Post({
    //     content: req.body.content,
    //     user: req.user.id
    // });
    // newPost.save().then(function(post){
    //     return res.redirect('back');
    // })
    // .catch(function(error){
    //     console.log('There occured some error while trying to add the post to the database:', error);
    //     return;
    // })
    const newPost= new Post({
        content: req.body.content,
        user: req.user.id
    });
    await newPost.save();

    req.flash('success',"Your Post has been Published!!");
    return res.redirect('back')
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
            req.flash('error', 'Failed to delete the Post')
            return res.redirect('back');
        }
    )
}