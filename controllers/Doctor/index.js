import express from "express";
import doctorModel from "../../models/doctor/Doctor.js";
// import randomId from "../../utils/randomId.js";



let router = express.Router();

//Register Doctor
router.post("/register", async (req, res) => {
  try {
    let doctorData = req.body;
    // console.log(doctorData);
    
    await doctorModel.create(doctorData);
    res.status(200).json({ success: true, msg: "Doctor Added Sucessfully" });
  } catch (error) {
    console.log(error);
    
    res.status(500).json({ success: false, error: "Internel Server Error" });
  }
});

// //Get All Doctor
// router.get("/all", async (req, res) => {
//   try {
//     let doctorData = await doctorModel.find({});
//     res.status(500).json(doctorData);
//   } catch (error) {
//     res.status(500).json({ msg: "Internel Server Error" });
//   }
// });

// //Get Doctor By ID
// router.get("/:id", async (req, res) => {
//   try {
//     let { id } = req.params;
//     console.log(id);

//     let getdoctorData = await doctorModel.findById(id);
//     if (!getdoctorData) {
//       return res.status(404).json({ error: "Doctor Not found" });
//     }
//     res.status(200).json(getdoctorData);
//   } catch (error) {
//     res.status(500).json({ msg: "Internel Server Error" });
//   }
// });

// //Update Doctor by ID
// router.put("/update/:id", async (req, res) => {
//   try {
//     let { id } = req.params;
//     // console.log(id);

//     let updateData = req.body;
//     let getdoctorData = await adminModel.findByIdAndUpdate(id, updateData);
//     if (!getdoctorData) {
//       return res.status(404).json({ error: "Doctor Not found" });
//     }
//     res.status(200).json({ msg: "Doctor Updated Sucessfully" });
//   } catch (error) {
//     res.status(500).json({ msg: "Internel Server Error" });
//   }
// });

// //Delete Doctor By ID
// router.delete("/delete/:id", async (req, res) => {
//   try {
//     let { id } = req.params;
//     let deletedadmin = await doctorModel.findByIdAndDelete(id);
//     if (!deletedadmin) {
//       return res.status(404).json({ error: "Admin Not found" });
//     }
//     res.status(200).json({ msg: "Doctor Deleted Sucessfully" });
//   } catch (error) {
//     res.status(500).json({ msg: "Internel Server Error" });
//   }
// });

// //Delete All Doctor
// router.delete("/delete-all", async (req, res) => {
//   try {
//     await doctorModel.deleteMany({});
//     res.status(200).json({ msg: "All Doctors Deleted Sucessfully" });
//   } catch (error) {
//     res.status(500).json({ msg: "Internel Server Error" });
//   }
// });

export default router;
