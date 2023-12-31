import mongoose from "mongoose"

let doctorSchema=new mongoose.Schema({
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
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    specialization:{
        type:String ,
        required:true
    }
})

export default mongoose.model("doctor",doctorSchema,"doctor")