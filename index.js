const express = require('express');
const app = express();
// const fs = require('fs');
const hbs = require ('hbs');
const path = require('path');
const userCollections = require('./mongodb');
const bcrypt = require('bcrypt');

const userRoutes = require('./routes/user');

const blogpost = require('./models/blog.models');
const blogPost = require('./routes/blogpost.route');

app.use(express.static(path.join(__dirname, 'public')));

//middlewares....
app.use(express.json());
app.use(express.urlencoded({extended:false}));  // this is used as a middlesware just to make sure that data can be just not be filled from json format instaead it can be filled by form url encoded format as well....

//routes
app.use("/api/blogpost", blogPost);
app.use("/api/user", userRoutes);  //routing for user profiles


const viewPath = path.join(__dirname,'./views')

app.set('view engine', 'hbs');
app.set('views', viewPath )


app.get('/',(req,res)=>{
    res.render('home');

})

app.get('/home',(req,res)=>{
    res.render('home');

})

app.get('/login',(req,res)=>{
    res.render('login')
})

app.get('/signup',(req,res)=>{
    res.render('signup')
})


//Register User for SIGNUP PAGE
app.post('/signup', async (req,res) =>{
    try {
        const data ={
            name: req.body.name,
            password: req.body.password
        };

        //check if the user already exists in the database or not.
        const existingUser = await userCollections.findOne({name:data.name});
        if (existingUser){
            res.send("User already exists. Please choose a different name.");
        }
        else{
            //for hashing the passwords using bcrypt.
            const saltRounds = 10; //Number of salt round fro bcrypt
            const hashedPassword = await bcrypt.hash(data.password,saltRounds);
            data.password = hashedPassword; //Replaced the hash password..

            const userdata = await userCollections.insertMany(data);
        console.log(userdata);
        };

        res.redirect('home');
    }
    catch(err){
        console.error("Error inserting the data:",err);
        res.status(500).send("Internal server error");
    }
    
});


//Login user authentication
app.post('/login', async(req,res)=>{
    try{
        const check = await userCollections.findOne({name: req.body.name });
        if(!check){
            res.send("User's name cannot be found");
        };
        //compare the hash password from the datase with the plaintext
        const isPasswordMatch = await bcrypt.compare(req.body.password, check.password);
        if(isPasswordMatch){
            res.redirect('home');
        }
        else{
            res.send("Wrong Password");
        };
    }
    catch(err){
        console.error("Error during login:",err);
        res.send("Wrong Details");

    }
});

















 





app.listen(3000,()=>{
    console.log('Server Connected Successfully')
})
















































// //Blog POST MANAGEMENT
// app.get('/api/blogpost', async(req,res)=>{  /// just for get the data 
//     try{
//         const blogposts = await blogpost.find({});
//         res.status(200).json(blogposts);
//     }
//     catch(error){
//         res.status(500).json({message:error.message});
//     }
// });


// app.post('/api/blogpost', async (req,res)=>{
//     // console.log(); /// for posting data into database....
//     // res.send(req.body); //used just for checking whether it is working or not in insomnia.
//     try{
//         const blogposts = await blogpost.create(req.body);
//         res.status(200).json(blogposts);
//     }
//     catch (error){
//         res.status(500).json({message:error.message});
//     }

// });


// /// this down get method is to search via id...
// app.get('/api/blogpost/:id', async(req,res)=>{
//     try{
//         const {id} = req.params;
//         const blogpostid = await blogpost.findById(id);
//         res.status(200).json(blogpostid);
//     }
//     catch (error){
//         res.status(500).json({message:error.message});
//     }
// });



// //Update a posts

// app.put('/api/blogpost/:id', async(req,res)=>{
//     try{
//         const {id} = req.params;

//         const blogpostid = await blogpost.findByIdAndUpdate(id,req.body);

//         if (!blogpostid){
//             return res.status(404).json({message: "Blog not found"});
//         }

//         const updatedBlogpost = await blogpost.findById(id);

//         res.status(200).json(updatedBlogpost);
//     }
//     catch (error){
//         res.status(500).json({message:error.message});
//     }
// });




// ///DELETE A BLOG


// app.delete('/api/blogpost/:id',async (req,res)=>{
//     try{
//         const {id} = req.params;
//         const blogpostid = await blogpost.findByIdAndDelete(id);

//         if (!blogpostid){
//             return res.status(404).json({message: "Blog not found"});
//         }
//         res.status(200).json({message: "Blog has been deleted successfully"});
//     }
//     catch (error){
//         res.status(500).json({message:error.message});
//     }
// });




