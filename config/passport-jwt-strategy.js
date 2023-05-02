// to set up the passport jwt strategy:
const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

const User = require('../models/user');

let opts = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey : 'codeial'
}

passport.use( new JWTStrategy(opts, function(jwtPayLoad,done){
    User.findById(jwtPayLoad._id)
    .then(function(user){
        return done(null, user);
    })
    .catch(function(){
        return done(null,false);
    })
}))

module.exports = passport;
