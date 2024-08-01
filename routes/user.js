const express = require('express');
const router = express.Router();
// const User = require('../mongodb');
const blogpost = require('../models/blog.models');
const userCollections = require('../mongodb');

//routing to get the user profiles
router.get('/:id/profile',async (req,res)=>{
    try{
        const user = await userCollections.findById(req.params.id);
        if (!user){
            return res.status(404).send('User not found..');
        }
        // console.log("User found:",user);
        const blogposts = await blogpost.find({author : user._id})
            .populate('author','name')
            // .populate('comments.commenter','name')
        // console.log("blog posts found:", blogposts);
        // res.render( 'profile',{ user, blogposts });
        res.status(200).json({user, blogposts});
       
    }
    catch(error){
        // console.error("error fetching profile:",error);
        res.status(500).send(error.message);
    }
});


module.exports = router;