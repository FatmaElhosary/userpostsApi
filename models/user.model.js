const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const userSchema=new Schema({
// _id:mongoose.Schema.Types.ObjectId,
firstName:{type:String,required:[true,'firstName is required']},
lastName:{type:String,required:[true,'lasttName is required']},
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