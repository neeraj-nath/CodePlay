const Post=require('../models/post')
const Comment = require('../models/comment');
const Like = require('../models/like');

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
    try{
        let newPost= await Post.create({
            content: req.body.content,
            user: req.user._id
        });
        // let post = await newPost.save();
        if (req.xhr){
            //to populate te name of the user:
            newPost = await newPost.populate('user','name');
            //json data must be sent with a status code:
            return res.status(200).json({
                data: {
                    post:newPost,
                    post_id:newPost.id
                },
                message: "Post Published!!"
            })
        }
    
        req.flash('success',"Your Post has been Published!!");
        return res.redirect('back')

    }catch(error){
        req.flash('error', err);
        // added this to view the error on console as well
        console.log(err);
        return res.redirect('back');
    }
    
};

module.exports.destroy= async function(req,res){
    try{
        let post = await Post.findById(req.params.id);

        if (post.user==req.user.id){
            post.deleteOne();
            // console.log(typeof(req.params.id));

            // To delete the comments associated with the Post:
            await Comment.deleteMany({post:req.params.id}).catch((error)=> console.log(error));
            // To delete the Likes associated with the Post:
            await Like.deleteMany({likeable:post, onModel:'Post'});
            //To delete the Likes associated with the Comments under this Post:
            await Like.deleteMany({likeable:post.comments, onModel:'Comment'});
            

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