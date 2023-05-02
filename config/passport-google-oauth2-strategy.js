const passport = require("passport");
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');
const { error } = require("console");

// to tell passport top use a new google log in strategy
passport.use(new googleStrategy({
    clientID:"73401975254-vahg37ebnlcjl2f11c99scofcrogql0v.apps.googleusercontent.com",
    clientSecret:"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",
    callbackURL: "http://localhost:8000/users/auth/google/callback",
    },
    async function(accessToken, refreshToken, profile, done){
        try{
            let user = await User.findOne({email:profile.emails[0].value});
            if(user){
                return done(null,user);
            }
            else{
                let newUser = await User.create({
                    name: profile.displayName,
                    email:profile.emails[0].value,
                    password: crypto.randomBytes(20).toString('hex')
                });
                return done(null,newUser);
            }
        }catch(error){
            console.log(`Error occured in passport-google-strategy:${error}`);
            return;
        }
        
            
   
}));

    

module.exports = passport;
