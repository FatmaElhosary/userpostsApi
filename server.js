const express=require('express');
const bodyParser=require('body-parser');
const mongoose=require('mongoose');
//const userModel = require("./models/user.model");
const router=require('./routes/user.routes');
// Start up an instance of app
const app=express();

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
//app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));

//
app.use(router);
//connect DB
mongoose.connect("mongodb+srv://fatma:root@nodetuts.3qrlv.mongodb.net/userPosts?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true });

// Setup Server
const port = 3000;
const server=app.listen(port,()=>{
    console.log(`running on localhost: ${port}`);
});