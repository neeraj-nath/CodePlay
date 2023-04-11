const Post=require('../models/post')

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
}