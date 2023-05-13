const Post= require('../models/post');
const User= require('../models/user');
// const Comments = require('../models/comment');

module.exports.home = async function(req,res){
    // return res.end('<h1>Express running for codeial</h1>');
    // Post.find({}).sort('-createdAt').populate('user').populate({
    //     path:'comments',
    //     populate:{
    //         path:'user'
    //     },
    //     populate:{
    //         path: 'likes'
    //     }}).populate('likes')
    //     .then(
    //     function(posts){
    //         // console.log("You are inside HOME now..")
    //         User.find({}).then(function(users){
    //             return res.render('home',{
    //                 title:"Home",
    //                 posts:posts,
    //                 all_users: users
    //             });

    //         })
            

    //         }
    //     )  
    /*************** */
    try{
        let posts = await Post.find({}).sort('-createdAt')
        .populate('user')
        .populate({
            path: 'comments',
            populate:{
                path: 'user',
            },
            populate:{
                path:'likes'
            }
        }).populate('comments')
        .populate('likes');
    
        let users = await User.find({});
    
        return res.render('home',{
            title: "Home",
            posts:posts,
            all_users:users
        });

    }catch(error){
        console.log(error);
        return;
        }
    }