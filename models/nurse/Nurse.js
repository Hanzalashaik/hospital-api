import mongoose from "mongoose"

let nurseSchema=new mongoose.Schema({
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
    shift:{
        type:String,
        required:true
    }
})

export default mongoose.model("nurse",nurseSchema,"nurse")