const User= require('../models/user');

module.exports.profile= function(req,res){
    // console.log(User);
    // console.log(req);
    return res.render("profile.ejs");
}

module.exports.signIn= function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_in');
}

module.exports.signUp= function(req,res){
    // console.log(req.cookies);
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
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
//to create signin session and redirect page:
module.exports.createSession=function(req,res){
    return res.redirect('/users/profile');
}

module.exports.sessionOut=function(req,res){
    req.logout(function(error){
        if(error){
            console.log(error);
            return;
        }
    }); //the logout method is provided via the passport
    res.redirect('/');
}