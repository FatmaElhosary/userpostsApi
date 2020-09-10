const jwt=require("jsonwebtoken");

module.exports=(req,res,next)=>{
const token=req.header('token');
if(token&&token!=null&&token!=undefined){
jwt.verify(token,'secret',async(err,beloadOfToken)=>{
    console.log(beloadOfToken);
    if(err){
      res.send({MessageError:"authentication failed or error in token"});
    }else{
     next();
    }
});

}else{
    res.send({MessageError:"error on token or token not provided"});
}
}