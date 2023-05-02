const Post = require('../../../models/post');
const Comment = require('../../../models/comment');

module.exports.index = async function(req,res){
    let posts = await Post.find({})
                    .sort('-createdAt') 
                    .populate('user')
                    .populate({
                        path:'comments',
                        populate:{
                            path:'user' 
                        }
                    })
    return res.json(200, {
        message:"List Of Posts",
        posts: posts
    })
}


module.exports.destroy= async function(req,res){
    try{
        let post = await Post.findById(req.params.id);

        if (post.user == req.user.id){
            post.deleteOne();
            // console.log(typeof(req.params.id));

            await Comment.deleteMany({post:req.params.id})
                    .catch((error)=> console.log(error));

            return res.json(200,{
                message:"Post and its comments got deleted!",
                post:post
                });
            }
        else{
            return res.json(401,{
                message: "Not Authorised to delete this post..!"
                });
            }
        }
        catch(error){
        console.log(error);
        return res.status(500).json({
            message:'Internal Server Error..',
            
        })

    }
   
}