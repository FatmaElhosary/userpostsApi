const userModel = require("../models/user.model");
const nodemailer = require("nodemailer");


module.exports.sendEmail=async (req,res)=>{
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
<h1 style="margine:50px; color:white">${req.body.email}</h1>
</div>
`
};
await transporter.sendMail(options,(err)=>{
    if(err){
        console.log(err);
    }else{
        console.log('email has been sent');
    }
})


    if(req.body.email)
    res.json(req.body.email);
    else{
        res.send('error')
    }
}


/*  const send_Email= async (email,verifyLink)=>{
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
    subject:'Hello Ahmed',
    html:`
    <div style="background-color:#000">
    <h1 style="margine:50px; color:white">${verifyLink} </h1>
    </div>
    `
    };
    await transporter.sendMail(options,(err)=>{
        if(err){
            console.log(err);
        }else{
            console.log('email has been sent');
        }
    })
    
} */
