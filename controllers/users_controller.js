const User= require('../models/user');

module.exports.profile= function(req,res){
    // console.log(User);
    // console.log(req);
    User.findById(req.params.id).then(function(user){
        return res.render("profile.ejs",{
            title:'Profile',
            profile_user:user,
    })
    })
    .catch( function( error){
        console.log("Looks there was some Error while trying to fetch the profile");
        return;
    });
}
module.exports.update= async function(req,res){
    // if (req.params.id == req.user.id){
    //     User.findByIdAndUpdate(req.params.id, {name:req.body.name, email: req.body.email})
    //     .then(function(error){
    //         return res.redirect('back');
    //     })
    //     .catch(function(error){
    //         console.log("error occured while trying to update user details");
    //         return;
    //     })
    // }
    // else{
    //     return res.status(401).send("Unauthorised");
    // }

    //****changing the above because of using multer as part of file uploading:
    try{
        if (req.params.id == req.user.id){
            const user = await User.findById(req.params.id);
            console.log(user);
            User.uploadedAvatar(req,res, function(error){
                console.log("inside the uploaded avatar block");
                if (error){console.log("<<<MULTER ERROR>>>:",error); return;};
                //console.log("the request is",req);
                console.log(req.file);
                user.name = req.body.name;
                user.email = req.body.email;
    
                if (req.file){
                    //this is saving the path of the uploaded file to the avatar field in the user database
                    user.avatar = User.avatarPath +"/"+req.file.filename ;
                }
                user.save().then(function(){
                    return res.redirect('back');
                })
                
    
    
            })
    
        }
        else{
            return res.status(401).send("Unauthorised");
        }
    }catch(error){
        console.log("error caught in update catch block", error);
        return res.redirect('back');
    }
    
}
module.exports.signIn= function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_in',{
        title:'Sign In'
    });
}

module.exports.signUp= function(req,res){
    // console.log(req.cookies);
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_up',{
        title:'Sign Up'
    });
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
    req.flash('success', "You are now Logged In!");
    return res.redirect('/');
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