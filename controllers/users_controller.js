const User= require('../models/user');

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

//To get the sign up data:
module.exports.create= function(req,res){
    if (req.body.password!=req.body.confirm_password){
        return res.redirect('back');
    }
    User.findOne({email:req.body.email}).then(function(response){
        console.log("This already exists in the database. Try with another email id");
        return;
    });
    const newUser= new User({
        name:req.body.name,
        email:req.body.email,
        password:req.body.password
    });
    newUser.save().then(function(){return res.redirect('/users/sign-in')});

}