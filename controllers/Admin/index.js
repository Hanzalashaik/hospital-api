import express from "express";
import adminModel from "../../models/admin/Admin.js";
import bcrpyt from "bcrypt"
import randomString from "../../utils/randomId.js"
import jwt from "jsonwebtoken"
import config from "config"
import sendSMS from "../../utils/sms.js";

const router = express.Router();

//Register Admin
router.post("/register", async (req, res) => {
  try {
    let adminData = new adminModel(req.body);
    console.log(adminData);
    //checking for already exist
    let emailCheck = await adminModel.findOne({ email: adminData.email });
    let phoneCheck = await adminModel.findOne({ mobile: adminData.phone });

    if (emailCheck || phoneCheck) {
      return res.status(409).json({ msg: "Email and Phone already Exist" });
    }
    //hashing password
    let hashedPassword=await bcrpyt.hash(adminData.password ,10);
    adminData.password=hashedPassword

    //admin verificaton
    adminData.adminverifytoken.email=randomString(10);
    adminData.adminverifytoken.phone=randomString(10);

    //admin authorization
    let emailToken=jwt.sign({email:adminData.adminverifytoken.email},config.get("JWTKEY"),{expiresIn:"60000"});
    let phoneToken=jwt.sign({phone:adminData.adminverifytoken.phone},config.get("JWTKEY"),{expiresIn:"60000"});

    //Send Email for verification 
    console.log(`${config.get("URL")}/admin/email/verify/${emailToken}`);
    
    // console.log(adminData.phone);
    
    // Send SMS
    sendSMS({
        body: `Hi ${
          adminData.name
        }, Please click the given link to verify your phone ${config.get(
          "URL"
        )}/admin/phone/verify/${phoneToken}`,
        phonenumber: adminData.phone,
    })
    // console.log(`${config.get("URL")}/admin/phone/verify/${phoneToken}`);

    await adminData.save();
    res.status(200).json({ msg: "Admin Added Sucessfully"});
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Internel Server Error" });
  }
});

//verify Email
router.get("/email/verify/:token",async(req,res)=>{
  try {
    let token =req.params.token;
    let verify=jwt.verify(token,config.get("JWTKEY"));
    // console.log(verify);
    
    if(!verify){
      res
        .status(401)
        .json({ sucess: false, msg: "Token Expire , Register Again" });
    }
    let adminData=await adminModel.findOne({"adminverifytoken.email":verify.email});

    if(!adminData){
      return res.status(200).json({ success: "The Email has been Verified Already." });
    }
    res.status(200).json({ success: "The Email has been Verified." })
    adminData.adminverified.email=true;
    
    await adminData.save()
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Internel Server Error" });
  }
})

//verify Phone Number
router.get("/phone/verify/:token",async(req,res)=>{
  try {
    let token =req.params.token;
    let verify=jwt.verify(token,config.get("JWTKEY"));
    // console.log(verify);
    
    if(!verify){
      res
        .status(401)
        .json({ sucess: false, msg: "Token Expire , Register Again" });
    }
    let adminData=await adminModel.findOne({"adminverifytoken.phone":verify.phone});

    if(!adminData){
      return res.status(200).json({ success: "The Phone has been Verified Already." });
    }
    res.status(200).json({ success: "The Phone has been Verified." })
    adminData.adminverified.phone=true;
    
    await adminData.save()
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Internel Server Error" });
  }
})

router.post("/login",(req,res)=>{
  try {
    
  } catch (error) {
    
  }
})

// //Delete All Admins
// router.delete("/delete-all", async (req, res) => {
//   try {
//     await adminModel.deleteMany({});
//     res.status(200).json({ msg: "All Admins Deleted Sucessfully" });
//   } catch (error) {
//     res.status(500).json({ msg: "Internel Server Error" });
//   }
// });

// //Delete Admin By ID
// router.delete("/delete/:id", async (req, res) => {
//   try {
//     let { id } = req.params;
//     let deletedadmin = await adminModel.findByIdAndDelete(id);
//     if (!deletedadmin) {
//       return res.status(404).json({ error: "Admin Not found" });
//     }
//     res.status(200).json({ msg: "Admin Deleted Sucessfully" });
//   } catch (error) {
//     res.status(500).json({ msg: "Internel Server Error" });
//   }
// });

// //Update Admin by ID
// router.put("/update/:id", async (req, res) => {
//   try {
//     let { id } = req.params;
//     let updateData = req.body;
//     // let getadminData = await adminModel.findOneAndUpdate(id,{$set:updateData},{new:true})
//     let getadminData = await adminModel.findByIdAndUpdate(id, updateData);

//     if (!getadminData) {
//       return res.status(404).json({ error: "Admin Not found" });
//     }
//     res.status(200).json({ msg: "Admin Updated Sucessfully" });
//   } catch (error) {
//     res.status(500).json({ msg: "Internel Server Error" });
//   }
// });

// //Get All Admin
router.get("/all", async (req, res) => {
  try {
    let adminData = await adminModel.find({});
    res.status(500).json(adminData);
  } catch (error) {
    res.status(500).json({ msg: "Internel Server Error" });
  }
});

// //Get Admin By ID
// router.get("/:id", async (req, res) => {
//   try {
//     let { id } = req.params;
//     let getadminData = await adminModel.findById(id);
//     if (!getadminData) {
//       return res.status(404).json({ error: "Admin Not found" });
//     }
//     res.status(200).json(getadminData);
//   } catch (error) {
//     res.status(500).json({ msg: "Internel Server Error" });
//   }
// });

export default router;
