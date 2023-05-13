const Comment= require('../models/comment');
const Post= require('../models/post');
const commentsMailer = require('../mailers/comments_mailer');
const commentEmailWorker = require('../workers/comment_email_worker');
const queue = require('../config/kue');
const Like = require('../models/like');


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
    //------------------------------------------------------------------------------------------------------
    // we will try converting the above code into async await
    
    try{
        let post = await Post.findById(req.body.post);
        let newComment= new Comment({
            content:req.body.content,
            post:post._id,
            user:req.user._id
        });
        await newComment.save();

        post.comments.push(newComment);
        
        await post.save();

        newComment= await newComment.populate('user','name email');// need to know how populaet method works and takes arguments.

        //commentsMailer.newComment(newComment);
        let job = queue.create('emails', newComment).save(function(error){
            if(error){
                console.log("error inside queue.create-->>",error);
                return;
            }
            console.log("entered queue.creata and the job id is-->>",job.id);

        });
        if (req.xhr){
                
    
            return res.status(200).json({
                data: {
                    comment: newComment
                },
                message: "New comment has been added..!!!!"
            });
        }

        console.log("Comment added to the post");

        return res.redirect('back');

    }catch(err){
        console.log("Some Error Occured while adding the comment to the Post",err);
        return;
    }
    //using async await made are codes much cleaner and subtle to look at.
    


}

module.exports.destroy= function(req,res){
    try{
        Comment.findById(req.params.id).then(
            async function (comment){
                if (comment.user==req.user.id){
                    let postId= comment.post;
                    console.log(comment);

                    comment.deleteOne();

                    Post.findByIdAndUpdate(postId,{$pull:{comment:req.params.id}});

                    // To delete the likes when the comment gets deleted.
                    await Like.deleteMany({likeable: comment._id, onModel:'Comment'});

                    if (req.xhr){
                        return res.status(200).json({
                            data: {
                                comment_id: req.params.id
                            },
                            message: "Comment Deleted..!!"
                        });
                    }
                    return res.redirect('back');
                }
                else{
                    console.log('Some Error Occured while deleting the comment');
                    return res.redirect('back');
                }
            }
        )

    }
    catch(error){
        console.log('Error faced in deleting the comment inside the controller of comments');
        return;
    }
    
}