const passport = require("passport");
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');
const env = require('./environment');
const { error } = require("console");

// to tell passport top use a new google log in strategy
passport.use(new googleStrategy({
    clientID: env.google_client_Id,
    clientSecret: env.google_client_secret,
    callbackURL: env.google_callback_URL,
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
