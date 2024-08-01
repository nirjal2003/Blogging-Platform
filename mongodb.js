const mongoose = require('mongoose');

//connecting the database i.e by using ATLAS....
mongoose.connect('mongodb+srv://njalmhrzn:cX5VxGzKclZ2W5V4@bloggingplatform.1d7iguv.mongodb.net/?retryWrites=true&w=majority&appName=bloggingplatform')
.then(()=>{
    console.log("Database connected successfully");
})
.catch(()=>{
    console.log("Database not connected!!");
});


// create a Schema design  for both login and signup page
const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    }
})


//Collection  for user
const userCollections = mongoose.model('userCollections',userSchema)
//exporting the collection
module.exports = userCollections;

