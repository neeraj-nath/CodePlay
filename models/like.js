const mongoose = require('mongoose');
const Post = require('./post');
const Comment = require('./comment');

const likeSchema = new mongoose.Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    },
    // this defines the object Id of like object
    likeable:{
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        refPath : 'onModel'
    },
    //this field is used for defining the type of like object since dynamic
    onModel : {
        type : String,
        required : true,
        enum: ['Post','Comment']
    }

},{
    timestamps:true
})

const Like = mongoose.model('Like',likeSchema);
module.exports = Like ;