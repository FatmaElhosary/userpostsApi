const mongoose=require('mongoose');


let userSchema=mongoose.Schema({
// _id:mongoose.Schema.Types.ObjectId,
firstName:{type:String,required:true},
lastName:{type:String,required:true},
email:{type:String,required:true},
password:{type:String,required:true},
posts:[{
    _id:mongoose.Schema.Types.ObjectId,
    title:String,
    desc:String
}]
});


const userModel=mongoose.model('user',userSchema);
module.exports=userModel;