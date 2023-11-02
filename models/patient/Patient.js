import mongoose from "mongoose";

let patientSchema = new mongoose.Schema({
  email: {
    type: String,
    
  },
  password: {
    type: String,
    
  },
  mobile: {
    type: Number,
    
  },
  fullName: {
    type: String,
    
  },
  dateofBirth: {
    type: String,
    
  },
  address: {
    type: String,
    
  },
});

export default mongoose.model("patient", patientSchema, "patient");
