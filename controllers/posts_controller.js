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
    let post = await newPost.save();
    if (req.xhr){
        //json data must be sent with a status code:
        return res.status(200).json({
            data: {
                post:post,
                post_id:post.id
            },
            message: "Post Published"
        })
    }

    req.flash('success',"Your Post has been Published!!");
    return res.redirect('back')
};

module.exports.destroy= async function(req,res){
    try{
        let post = await Post.findById(req.params.id);

        if (post.user==req.user.id){
            post.deleteOne();
            // console.log(typeof(req.params.id));

            Comment.deleteMany({post:req.params.id}).catch((error)=> console.log(error));
            

            if(req.xhr){
                return res.status(200).json({
                    data:{
                        post_id: req.params.id
                    },
                    message:"Post got deleted"
                })
            }

            return res.redirect('back');

        }
        else{
            console.log("could not delete post");
            return res.redirect('back');
        }
    }catch(error){
        console.log(error);
        return res.redirect('back');

    }
   
}