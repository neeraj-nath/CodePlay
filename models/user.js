const mongoose= require('mongoose');



// this page has been created to create a SCHEMA for the database
const userSchema= new mongoose.Schema({
    email:{
        type: String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    name:{
        type:String,
        required:true
    }
},{
    timestamps:true
})

const User= mongoose.model('User',userSchema);
module.exports=User;