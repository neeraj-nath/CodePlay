const mongoose= require('mongoose');



const postSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
    },
    user:{
        type: mongoose.Schema.Types.ObjectId, // tell that the type refers to some object id in the database
        ref: 'User'
    },
    //incl array of comment ids for easy fetching
    comments:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Comment'
        }
    ],
    likes : [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Like'
        }
    ]

},{
    timestamps:true
});

//to make POST a model in mongo db
const Post= mongoose.model('Post',postSchema);

module.exports=Post;

