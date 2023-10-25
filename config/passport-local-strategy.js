const passport= require('passport');
const LocalStrategy= require('passport-local').Strategy;
const User=require('../models/user');

//need to tell passport to use local strategy in order for being able to use authentication.
passport.use(new LocalStrategy({
    usernameField:'email',
    passReqToCallback:true,
    },
    function(req,email,password,done){
        User.findOne({email:email}).then(
            function(user){
                if(user==null){
                    return done(null,null);
                }
                if(user.password==password){
                    return done(null,user);
                }
                else{
                    req.flash('error',"Invalid Username/Password");
                    return done(null,false);
                }
            }
        ).catch(function(error){
            req.flash('error',error);
            // console.log('Error in finding User-->',error);
            return done(error);
        })


    }
));

// serializing the user to decide wich key to be used as cookie:
passport.serializeUser(function(user,done){
    done(null,user.id);
})


//deserializing the user from the key in the cookies.. ie obtain our required key for authentication from cookies
passport.deserializeUser(function(id,done){
    User.findById(id).then(function(user){
        return done(null,user);
    }).catch(function(error){
        console.log('Error in finding User-->',error);
        return done(error);
    })
}) 


passport.checkAuthenticaton=function(req,res,next){
    if(req.isAuthenticated()){
        return next();

    }
    return res.redirect('/users/sign-in');
}

passport.setAuthenticatedUser=function(req,res,next){
    if(req.isAuthenticated()){
        res.locals.user=req.user;// sending the user data from request to response for sending it to views
    }
    return next();
}


module.exports=passport;