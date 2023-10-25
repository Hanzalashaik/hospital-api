import mongoose from "mongoose"

let adminSchema=new mongoose.Schema({
    // uId:{
    //     type:String,
    //     required:true
    // },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    mobile:{
        type:Number,
        required:true
    },
    fullName:{
        type:String,
        required:true
    },
})

export default mongoose.model("admin",adminSchema,"admin")