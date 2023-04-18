const Comment= require('../models/comment');
const Post= require('../models/post');

module.exports.create= async function(req,res){
    // Post.findById(req.body.post).then(
    //     function(post){
    //         const newComment= new Comment({
    //             content:req.body.content,
    //             post:post._id,
    //             user:req.user.id
    //         });
    //         newComment.save().then(function(comment){
    //             console.log("Comment added to the post")
    //             return res.redirect('back');
    //         })
    //         .catch((error)=>console.log("some error occured.."));
    //         post.comments.push(newComment);// important syntax to fill the comments array in post DB
    //         post.save();
    //     }
    // ).catch(
    //     function(error){
    //         console.log("Some Error Occured while adding the comment to the Post");
    //         return;
    //     }
    // )
    //--------------------------------------------
    // we will try converting the above code into async await
    try{
        let post = await Post.findById(req.body.post);
        const newComment= new Comment({
            content:req.body.content,
            post:post._id,
            user:req.user.id
        });
        await newComment.save();

        post.comments.push(newComment);

        await post.save();

        console.log("Comment added to the post");

        return res.redirect('back');

    }catch(err){
        console.log("Some Error Occured while adding the comment to the Post",err);
        return;
    }
    //using async await made are codes much cleaner and subtle to look at.
    


}

module.exports.destroy= function(req,res){
    Comment.findById(req.params.id).then(
        function (comment){
            if (comment.user==req.user.id){
                let postId= comment.post;
                comment.deleteOne();
                Post.findByIdAndUpdate(postId,{$pull:{comment:req.params.id}});
                return res.redirect('back');
            }
            else{
                console.log('Some Error Occured while deleting the comment');
                return res.redirect('back');
            }
        }
    )
}