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
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));

//
app.use(router);
//connect mongo DB
/* const dbURL="mongodb+srv://fatma:root@nodetuts.3qrlv.mongodb.net/userPosts?retryWrites=true&w=majority";
mongoose.connect(dbURL, { useNewUrlParser: true , useUnifiedTopology: true}).then((result)=>{
    console.log('connected to DB');
}).catch(err=>{
    console.log(err);
})  */
mongoose.set('useNewUrlParser', true);
  mongoose.set('useFindAndModify', false);
  mongoose.set('useCreateIndex', true);
  //mongoose.set('useUnifiedTopology', true);
mongoose.connect('mongodb://localhost/user', { useNewUrlParser: true,useUnifiedTopology: true  }).then((result)=>{
    console.log('connected to DB');
}).catch(err=>{
    console.log(err);
}) ;
mongoose.Promise=global.Promise;
// Setup Server
const port = 3000;
const server=app.listen(process.env.port||port,()=>{
    console.log(`running on localhost: ${port}`);
});
process.setMaxListeners(0);