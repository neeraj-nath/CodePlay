const mongoose= require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/codeial_development');
const db= mongoose.connection;

db.on('error',console.error.bind(console,"Error Connecting to Database"));

db.once('open',function(){
    console.log("We have managed to successfully connect to the MongoDb Database!");
});

module.exports=db;