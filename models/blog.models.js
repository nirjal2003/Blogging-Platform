
const mongoose = require('mongoose');
const userCollections = require('../mongodb');

// //SChema design for comments posting...
const commentSchema = mongoose.Schema({
    commenter:{
        type: String,
        // ref:'userCollections',
        required: true
    },
    text:{
        type: String,
        required: true
    }
},{
    timestamps: true
});


//SChema design for blog  posting
const blogpostSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'userCollections',
        required:true
    },
    category:{
        type: String,
        required: true /// category of blogs..
    },
    comments: [commentSchema] // Embedding comments as a sub-document array..
},{
    timestamps: true
});







const blogpost = mongoose.model('blogpost',blogpostSchema);
module.exports = blogpost;




