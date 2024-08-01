
const blogpost = require('../models/blog.models');


//BLOG POST MANAGEMENT  PROCESS STARTS.....rs
//Get method for overall blogs
const getBlogs = async (req,res)=>{
    try{
        const blogposts = await blogpost.find({});
        res.status(200).json(blogposts);
    }
    catch(error){
        res.status(500).json({message:error.message});
    }
}

//Get method for single id...
const getBlog =  async(req,res)=>{
    try{
        const {id} = req.params;
        const blogpostid = await blogpost.findById(id);
        res.status(200).json(blogpostid);
    }
    catch (error){
        res.status(500).json({message:error.message});
    }
}


//Post method for blog post
const createBlogs = async (req,res)=>{
    // console.log(); /// for posting data into database....
    // res.send(req.body); //used just for checking whether it is working or not in insomnia.
    try{
        const {title, content, author, category } = req.body;
        const blogposts = await blogpost.create({title, content, author, category });
        res.status(200).json(blogposts);
    }
    catch (error){
        res.status(500).json({message:error.message});
    }

}



//Update method for blogpost

const updateBlog = async(req,res)=>{
    try{
        const {id} = req.params;

        const blogpostid = await blogpost.findByIdAndUpdate(id,req.body, { new:true });

        if (!blogpostid){
            return res.status(404).json({message: "Blog not found"});
        }

        const updatedBlogpost = await blogpost.findById(id);

        res.status(200).json(updatedBlogpost);
    }
    catch (error){
        res.status(500).json({message:error.message});
    }
}



//DELETE method for blog post...
const deleteBlog = async (req,res)=>{
    try{
        const {id} = req.params;
        const blogpostid = await blogpost.findByIdAndDelete(id);

        if (!blogpostid){
            return res.status(404).json({message: "Blog not found"});
        }
        res.status(200).json({message: "Blog has been deleted successfully"});
    }
    catch (error){
        res.status(500).json({message:error.message});
    }
}

//catgory filteraation of blogss....
const getBlogsByCategory = async (req,res) =>{
    try{
        const {category} = req.params;
        const blogposts = await blogpost.find({category});

        if (blogposts.length === 0){
            return res.status(404).json({message: "No posts found in this category..."});
        }
        res.status(200).json(blogposts);
    }
    catch(error){
        res.status(500).json({message: error.message});
    }
};

///Comments Section

//adding a comment
const addComment = async(req,res) =>{
    try{
        const {id} = req.params; //blogposts id...
        const {commenter, text} = req.body;
        
        const blogposts = await blogpost.findById(id);
        if(!blogposts){
            return res.status(404).json({message: "Blog post not found"});
        }
        
        const newComment = {commenter, text};
        blogposts.comments.push(newComment);
        await blogposts.save();

        res.status(200).json(blogposts);
    }
    
    catch(error){
        res.status(500).json({message: error.message});
    }
};

//to get comments for a blogpost
const getComments = async (req,res)=>{
    try{
        const {id} = req.params; //blogpost id
        const blogposts = await blogpost.findById(id);
        if(!blogposts){
            return res.status(404).json({message: "Blog post not found"});
        }
        res.status(200).json(blogposts.comments); 
    }
    catch(error){
        res.status(500).json({message: error.message});
    }
};







module.exports = {
    getBlogs,
    getBlog, 
    createBlogs, 
    updateBlog, 
    deleteBlog,
    addComment,
    getComments, 
    getBlogsByCategory
};