import mongoose from "mongoose";

let patientSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  mobile: {
    type: Number,
    required: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  dateofBirth: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
});

export default mongoose.model("patient", patientSchema, "patient");
