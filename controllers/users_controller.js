module.exports.profile= function(req,res){
    return res.render("profile.ejs");
}

module.exports.signIn= function(req,res){
    return res.render('user_sign_in');
}

module.exports.signUp= function(req,res){
    // console.log(req.cookies);
    return res.render('user_sign_up');
}