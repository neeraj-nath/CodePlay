const mongoose= require('mongoose');
const env = require('./environment');
mongoose.connect(`mongodb://127.0.0.1:27017/${env.db}`);
const db= mongoose.connection;

db.on('error',console.error.bind(console,"Error Connecting to Database"));

db.once('open',function(){
    console.log("We have managed to successfully connect to the MongoDb Database-->",env.db);
});

module.exports=db;