const fs = require('fs'); //since we will write into the file system.
const rfs = require('rotating-file-stream');
const path = require('path');

const logDirectory = path.join(__dirname,'../production_logs');
//if production logs already write into it else create new:
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

// to create a log directory using rfs
const accessLogStream = rfs.createStream('access.log',{
    interval: '1d',
    path: logDirectory
});

const development = {
    name : 'development',
    asset_path : 'assets',
    session_cookie_key : 'blahsomething',
    db : 'codeial_development',
    smtp:{
        service: 'gmail',
        host : 'smtp.gmail.com',
        port: 587,
        secure : false,
        auth:{
            user : '',
            pass : '',
        }
    },
    google_client_Id : "",
    google_client_secret : "",
    google_callback_URL : "",
    jwt_secret: 'codeial',
    morgan: {
        mode: 'dev',
        options: {stream: accessLogStream}
    }

}

const production = {
    name : 'production',
    asset_path : process.env.CODEIAL_ASSET_PATH,
    session_cookie_key : process.env.CODEIAL_SESSION_KEY,
    db : process.env.CODEIAL_DB,
    smtp:{
        service: 'gmail',
        host : 'smtp.gmail.com',
        port: 587,
        secure : false,
        auth:{
            user : process.env.CODEIAL_GMAIL_USERNAME,
            pass : process.env.CODEIAL_GMAIL_PASSWORD,
        }
    },
    google_client_Id : process.env.CODEIAL_GOOGLE_CLIENT_ID,
    google_client_secret : process.env.CODEIAL_GOOGEL_CLIENT_SECRET,
    google_callback_URL : process.env.CODEIAL_GOOGLE_CALLBACK_URL,
    jwt_secret: process.env.CODEIAL_JWT_SECRET,
    morgan: {
        mode: 'combined',
        options: {stream: accessLogStream}
    }
}

//eval(process.env.CODEIAL_ENVIRONMENT) == undefined ? development : eval(process.env.CODEIAL_ENVIRONMENT)
module.exports = development;
