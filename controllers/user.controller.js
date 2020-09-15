const { check, validationResult } = require("express-validator");
const userModel = require("../models/user.model");
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");
const mongoose=require('mongoose');
//const emailSend=require('../controllers/emailSending');
const nodemailer = require("nodemailer");

const signup = async (req, res) => {
  //console.log(req.body);
  const { firstName, lastName, email, password, confirmPassword } = req.body;
  const errors = validationResult(req);
  console.log(errors);
  if (errors.isEmpty()) {
    const user = await userModel.findOne({ email });
    if(!user){
  bcrypt.hash(password, 8, async function (err, hashPassword) {
     await userModel
      .insertMany({ firstName, lastName, email, password: hashPassword })
      .then(async(data) => {
       // console.log(data);
      //  console.log(data[0].email);
   /////send email for confirmaton of new account ////////////
   await jwt.sign({email:data[0].email},'email',async(err,token)=>{
     ////
     const transporter=nodemailer.createTransport({
      service:'gmail',
      auth:{
          user:"routemdb@gmail.com" ,
          pass:'Route@123'
      }
  });
  
  const options={
  from:'"Route Team" <routemdb@gmail.com>',
  to:req.body.email,
  subject:'Hello Ahmed',
  html:`
  <div style="background-color:#000">
  <h1 style="margine:50px; color:white"><a href="http://localhost:3000/activateLink/${token}">click to activate your email</a></h1>
  </div>
  `
  };
  await transporter.sendMail(options,(err)=>{
      if(err){
        res.send('error')
      }else{
          console.log('email has been sent');
          res.json(req.body.email);
      }
  });
  
  
     /*  if(req.body.email)
      res.json(req.body.email);
      else{
          res.send('error')
      } */

//////
    console.log(token);
  });



        res.json({ message: "success" });
      })
      .catch((err) => {
       res.status(422).send({MessageError:err.message});
      }); 
    
  });
}else{
    res.json({MessageError:"email already exist"})
}
}else{
    res.status(422).json({MessageError: errors});
    
}
};
//user login 
const login= async(req,res)=>{
const {email,password}=req.body;
const user=await userModel.findOne({email}).then((user)=>{

if(user.confirmed===false){
  res.json({message:'that account not confirmed '});
}
  bcrypt.compare(password,user.password).then(result=>{
    if(result){     
      jwt.sign({_id:user._id,name:user.firstName},'secret',(err,token)=>{
        res.header('token',token).json({token});
      });
    } else{
      res.json({MessageError:"Incorrect Password"});
    }
  });
/*   if(user.password===password){
      jwt.sign({_id:user._id,name:user.firstName},'secret',(err,token)=>{
        res.json({token});
      });
      
  }else{
    res.json("Incorrect Password")
  } */
}).catch(err=>console.log(err||"user not found"))
};
//get all users
const getAllUsers=(req,res)=>{
  const user=userModel.find().then(users=>{
    res.json(users);
  }).catch(err=>res.status(422).send({MessageError:err.message}))
}

//delete user
const deleteUser=async (req,res)=>{
  const user = await userModel.findById(req.params.id);
    if(user){
      userModel.findByIdAndRemove({_id:req.params.id}).then(user=>{
        res.send(user);
      })
    }else{
      res.send({MessageError: "user not found to delete it"})
    }
}

//update user
//change firstName,lastName,email of user
const updateUser= async (req,res)=>{
  const errors = validationResult(req);
  console.log(errors);
  if (errors.isEmpty()) {
  const user = await userModel.findById(req.params.id);
  if(user){
    userModel.findByIdAndUpdate({_id:req.params.id},req.body).then(user=>{
      userModel.findOne({_id:req.params.id}).then((newUser)=>{
        res.send(newUser);
      })
     
    })
  }else{
    res.send({MessageError: "user not found to delete it"})
  }
}else{
  res.status(422).json({MessageError: errors});
}
}
//////////////////posts/////////////////

//add post 
const addPost=async(req,res)=>{

//add post
      const userId=req.params.userId;
      const {title,desc}=req.body;
      const errors = validationResult(req);
      console.log(errors);
      if (errors.isEmpty()) {
     await userModel.findOne({_id:userId}).then((user)=>{
        user.posts.push({_id:mongoose.Types.ObjectId(),title,desc});
        user.save().then((data)=>{
          res.status(200).send(data);
        }).catch(err=>{
          res.send({MessageError:'error'})
        })
      });
    }else{
      res.status(422).json({MessageError: errors});
    }

    }
//update postget userId in url paramerters and get post id in body
const updatePost=(req,res)=>{
  const userId=req.params.userId;
  const postId=req.body._id;
  const errors = validationResult(req);
  console.log(errors);
  if (errors.isEmpty()) {
  userModel.findOne({_id:userId,"posts._id":req.body._id}).then(user=>{
    if(user){
  userModel.updateOne({_id:userId,"posts._id":postId},{

    $set:{"posts.$.title":req.body.title,"posts.$.desc":req.body.desc}
   }).then(data=>{
     res.send({message:'success'});
   }).catch(err=>{
    res.send({message:err.message});
   })
  }else{
    res.send({MessageError:'post not found'})
  }
    });
  }else{
    res.status(422).json({MessageError: errors});
  }
}
//delete post
/*
get userId in url paramerters and get post id in body

*/
const deletePost=async(req,res)=>{
  const userId=req.params.userId;
  userModel.findOne({_id:userId,"posts._id":req.body._id}).then(user=>{
if(user){
  userModel.updateOne({_id:userId},{
    $pull:{
       "posts":{"_id":req.body._id}
     }
     }).then(data=>{
      // console.log(data);
       res.send({message:"success"});
       
     }).catch(err=>console.log(err))
}else{
  res.send({MessageError:'post not found'})
}
  });
 
}
//get all posts
const getAllPosts=(req,res)=>{
  //not get _id and password
  userModel.find({},{"_id":0,"password": 0 }).then(data=>{
    res.send(data);
  }).catch(err=>{
    res.send({MessageError:err.message});
  })
}

//get user posts
const getUserPosts=async(req,res)=>{
 const userId=req.params.userId;
await userModel.findOne({_id:userId}).then(user=>{
  console.log(user);
  res.send(user.posts);
}).catch(err=>{
  res.send({MessageError:'user not found'});
})  
}

///////////////// active account/////////////////
const activateNewUser=async(req,res)=>{
  jwt.verify(req.params.token,'email',async(err,decodedToken)=>{



    /////
    await userModel.findOneAndUpdate({email:decodedToken.email},{confirmed:true});
      res.send("success");
  });

  res.json(req.params.token);

}
//request to change password or reset password by using email and send reset link to that email /////////////
const requestToChangePass = async (req, res) => {
  //console.log(req.body);
    const { email } = req.body;
    const user = await userModel.findOne({ email }).then(async(user)=>{
      await jwt.sign({email:user.email,_id:user._id},'email',async(err,token)=>{
        ////
        if(err)
        res.send("error");
        const transporter=nodemailer.createTransport({
         service:'gmail',
         auth:{
             user:"routemdb@gmail.com" ,
             pass:'Route@123'
         }
     });
     
     const options={
     from:'"Route Team" <routemdb@gmail.com>',
     to:email,
     subject:`Hello ${user.firstName}`,
     html:`
     <div style="background-color:#000">
     <h1 style="margine:50px; color:white"><a href="http://localhost:3000/reset-password/${token}">click to reset your password</a></h1>
     </div>
     `
     };
     await transporter.sendMail(options,(err)=>{
         if(err){
           res.send('error')
         }else{
             console.log('email has been sent');
             res.json("reset password link has sent to your email");
         }
     });
       console.log(token);
     });
    }).catch(err=>{
      res.json({MessageError:"user Not Registered"})
    })
  
}

/////////////////reset password////////////////////
//send link to user to activate his password  by sending new password
const resetPassword=async (req,res)=>{
//
  res.json(req.params.token);
}
//get user_id and  new password 
const handleResetPass=async(req,res)=>{
  const {password,confirmPassword} =req.body;
  console.log(req.body);
  const errors = validationResult(req);
  console.log(errors);
  if (errors.isEmpty()) {
 bcrypt.hash(password, 8, async function (err, hashPassword) {
  jwt.verify(req.params.token,'email',async(err,decodedToken)=>{
    await userModel.findOneAndUpdate({email:decodedToken.email},{password:hashPassword});
          res.send("password reset succssfully");
      });

 });
   
}else{
  res.status(422).json({MessageError: errors});
}



  
}

///////////////////////////////////////
module.exports = {
  signup,
  login,
  getAllUsers,
  deleteUser,
  updateUser,
  addPost,
  updatePost,
  deletePost,
  getAllPosts,
  getUserPosts,
activateNewUser,
resetPassword,
requestToChangePass,
handleResetPass,
};
