import express from "express";
import patientModel from "../../models/patient/Patient.js";

let router = express.Router();

//Register Patient
router.post("/register", async (req, res) => {
  try {
    let patientData = req.body;
    await patientModel.create(patientData);
    res.status(200).json({ success: true, msg: "Patient Added Sucessfully" });
  } catch (error) {
    res.status(500).json({ success: false, error: "Internel Server Error" });
  }
});

//Get All Patient
router.get("/all", async (req, res) => {
  try {
    let patientData = await patientModel.find({});
    res.status(500).json(patientData);
  } catch (error) {
    res.status(500).json({ msg: "Internel Server Error" });
  }
});

//Get Patient By ID
router.get("/:id", async (req, res) => {
  try {
    let { id } = req.params;
    // console.log(id);

    let getpatientData = await patientModel.findById(id);
    if (!getpatientData) {
      return res.status(404).json({ error: "Patient Not found" });
    }
    res.status(200).json(getpatientData);
  } catch (error) {
    res.status(500).json({ msg: "Internel Server Error" });
  }
});

//Update Patient by ID
router.put("/update/:id", async (req, res) => {
  try {
    let { id } = req.params;
    let updateData = req.body;
    let getpatientData = await patientModel.findByIdAndUpdate(id, updateData);

    if (!getpatientData) {
      return res.status(404).json({ error: "Patient Not found" });
    }
    res.status(200).json({ msg: "Patient Updated Sucessfully" });
  } catch (error) {
    res.status(500).json({ msg: "Internel Server Error" });
  }
});

//Delete Patient By ID
router.delete("/delete/:id", async (req, res) => {
  try {
    let { id } = req.params;
    let deletedadmin = await patientModel.findByIdAndDelete(id);
    if (!deletedadmin) {
      return res.status(404).json({ error: "Patient Not found" });
    }
    res.status(200).json({ msg: "Patient Deleted Sucessfully" });
  } catch (error) {
    res.status(500).json({ msg: "Internel Server Error" });
  }
});

//Delete All Patient
router.delete("/delete-all", async (req, res) => {
  try {
    await patientModel.deleteMany({});
    res.status(200).json({ msg: "All Patients Deleted Sucessfully" });
  } catch (error) {
    res.status(500).json({ msg: "Internel Server Error" });
  }
});

export default router;
