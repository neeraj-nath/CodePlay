const Post= require('../models/post');

module.exports.home=function(req,res){
    // return res.end('<h1>Express running for codeial</h1>');
    Post.find({}).populate('user').populate({
        path:'comments',
        populate:{
            path:'user'
        }
    }).then(
        function(posts){
            // console.log("You are inside HOME now..")
            return res.render('home',{
                title:"Home",
                posts:posts
            });

            }
        )   
}