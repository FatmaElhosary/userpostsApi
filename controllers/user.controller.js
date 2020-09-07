const { check, validationResult } = require("express-validator");
const userModel = require("../models/user.model");

const bcrypt = require("bcrypt");

const signup=async(req,res)=>{
    console.log(req.body);
const { firstName, lastName ,email, password, confirmPassword } = req.body;

bcrypt.hash(password, 8, function (err, hashPassword) {
  
        userModel.insertMany({ firstName,lastName, email, password: hashPassword }).then((data)=>{
            //console.log(data);
            res.json({message:"success"});
            
        }).catch(err=>{
            res.json({message:"error"});
        })
});
}


module.exports={
    signup
} 
