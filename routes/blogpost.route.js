const express = require("express");

const blogpost = require('../models/blog.models');



const router = express.Router();

const {getBlogs,getBlog, createBlogs, updateBlog, deleteBlog, addComment, getComments, getBlogsByCategory} = require('../controller/blog.controller');




router.get('/', getBlogs);

router.get('/:id', getBlog);

router.post('/', createBlogs);

router.put('/:id', updateBlog);

router.delete('/:id', deleteBlog);/// this are all for posting a blogs....


router.post('/:id/comments',addComment);

router.get('/:id/comments', getComments); ///these are the routing for comments...


router.get('/category/:category',getBlogsByCategory); //routing for filtering the blog category...





module.exports = router;