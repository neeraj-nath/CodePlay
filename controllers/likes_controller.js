const Like = require('../models/like');
const Post = require('../models/post')
const Comment = require('../models/comment');

module.exports.toggleLike =async function(req,res){
    try{
        //****** likes/toggle/?id=''''''&type=Psost/Comment
        //likeable signifies the model OR database
        let likeable;
        let deleted = false;

        if (req.query.type == 'Post'){
            likeable = await Post.findById(req.query.id).populate('likes');
        }
        else{
            likeable = await Comment.findById(req.query.id).populate('likes');
        }

        //******Check if a Like already exists:******/
        // existingLike refers to the like model
        let existingLike = await Like.findOne({
            likeable : req.query.id,
            onModel : req.query.type,
            user : req.user._id
        })

        /*** If like already exists then delete it ***/
        if (existingLike){
            likeable.likes.pull(existingLike._id);
            likeable.save();
            existingLike.deleteOne();
            deleted = true ;

        }else{
            /*** Since, the like does not exist, we will create it ***/
            let newLike = await Like.create({
                likeable : req.query.id,
                onModel : req.query.type,
                user : req.user._id
            });
            likeable.likes.push(newLike._id);
            likeable.save();
        }
        return res.status(200).json({
            message : "Like saved successfully",
            data: {
                deleted : deleted ,
            }
        })

        

    }catch(error){
        console.log(error);
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
}
