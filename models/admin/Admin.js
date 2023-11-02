import mongoose from "mongoose"

let adminSchema=new mongoose.Schema({
    email:{
        type:String,
    },
    password:{
        type:String,
    },
    phone:{
        type:String,
    },
    name:{
        type:String,
        
    },
    adminverified:{
        email:{
            type:Boolean,
            default:false
        },
        phone:{
            type:Boolean,
            default:false
        }
    },
    adminverifytoken:{
        email:{
            type:String
        },
        phone:{
            type:String
        }
    }
},
{
    timestamps:true
})

export default mongoose.model("admins",adminSchema,"admin")