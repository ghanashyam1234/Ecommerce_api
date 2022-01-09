const jwt=require('jsonwebtoken')
const CryptoJS = require('crypto-js');




const mongoose=require('mongoose');

const UserSchema=new mongoose.Schema({
    name:{type:String, required:true},
    email:{type:String,unique:true,required:true},
    password:{type:String,required:true},
    isAdmin:{type:Boolean,default:false}
},{timestamps:true})


UserSchema.pre('save',async function(next){

     this.password=CryptoJS.AES.encrypt(this.password, process.env.PASS_ENCRYPT).toString()

        next();
})


UserSchema.methods.comparePassword= async function(loginPassword){


            
    const isMatch=await CryptoJS.AES.decrypt(this.password, process.env.PASS_ENCRYPT).toString(CryptoJS.enc.Utf8);

    return isMatch
}

module.exports=mongoose.model("User",UserSchema)