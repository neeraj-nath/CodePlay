const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');
const port = 8000;
const app = express();
require('./config/view_helper')(app);
const expressLayouts = require('express-ejs-layouts');
const env = require('./config/environment');
const logger = require('morgan');
const db = require('./config/mongoose');
const session = require('express-session'); //this is responsible for AUTOMATICALLY encrypting the key.
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const passportJWT = require('./config/passport-jwt-strategy');
const passportGoogle = require('./config/passport-google-oauth2-strategy');
const MongoStore = require('connect-mongo'); 
//above code to store session cookie in mongo db
const sassMiddleware = require('node-sass-middleware');
const flash = require('connect-flash');
const customMiddleWare = require('./config/middleware');


// setup the chat server to be used with socket.io -->
// faced issues in setting up a chatting engine using Socket.io thus I am commenting the codes

// const chatServer = require('http').Server(app);
// const chatSockets = require('./config/chat_sockets').chatSockets(chatServer);
// chatServer.listen(1000);
// console.log('Chat Server is listening on port --> 1000');

if (env.name == 'development'){
    // when the environment is not development we do not need to run the sass middleware everytime:
    app.use(sassMiddleware({
        src: path.join(__dirname, env.asset_path,'scss'),
        dest: path.join(__dirname, env.asset_path,'css'),
        debug: true,
        outputStyle: 'extended',
        prefix:'/css'
    }))
}

app.use(express.urlencoded());
app.use(cookieParser()); 

app.use(express.static(env.asset_path));
//making upload path available to browsers OR creating a path for uploads
app.use("/uploads",express.static(__dirname+'/uploads'));
app.use(expressLayouts);
//
app.use(logger(env.morgan.mode, env.morgan.options));

//To extract the style and script from the body of pages and place it in the head of the layout page.
app.set("layout extractScripts", true);
app.set("layout extractStyles", true);





// To set the view engine:
app.set('view engine', 'ejs');
app.set('views','./views');

app.use(session({
    name:'codeial',
    //todo change secret before deploymenrt in prd  mode
    secret: env.session_cookie_key,
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000*60*100)
    },
    store: MongoStore.create({
        mongoUrl: 'mongodb://127.0.0.1:27017/codeial_development' ,
        autoRemove:'disabled'
    },function(error){
        console.log(err || "connect-mongo setup done");
    }
    )
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(customMiddleWare.setFlash);

//to make the current user available:
app.use(passport.setAuthenticatedUser);//using this will also make user.name entry valid in views page-->profile.

//to use express router:
app.use('/', require('./routes'));

app.listen(port, function(error){
    if (error){
        console.log(`OOPSSSIIIEEEE!! There was an error while trying to run the server:${error}`);
        return ;
    }
    console.log(`Yayy!!! The server is UP and Running on port: ${port}`);
})
