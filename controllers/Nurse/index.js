import express from "express"
import nurseModel from "../../models/nurse/Nurse.js"

let router = express.Router();

//Register Nurse
router.post("/register", async (req, res) => {
  try {

    let nurseData = req.body;
    await nurseModel.create(nurseData);
    res.status(200).json({ success: true, msg: "Nurse Added Sucessfully" });
  } catch (error) {
    res.status(500).json({ success: false, error: "Internel Server Error" });
  }
});

//Get All Nurse
router.get("/all", async (req, res) => {
  try {
    let nurseData = await nurseModel.find({});
    res.status(500).json(nurseData);
  } catch (error) {
    res.status(500).json({ msg: "Internel Server Error" });
  }
});

//Get Nurse By ID
router.get("/:id", async (req, res) => {
  try {
    let { id } = req.params;
    // console.log(id);

    let getnurseData = await nurseModel.findById(id)
    if (!getnurseData) {
      return res.status(404).json({ error: "Nurse Not found" });
    }
    res.status(200).json(getnurseData);
  } catch (error) {
    res.status(500).json({ msg: "Internel Server Error" });
  }
});

//Update Nurse by ID
router.put("/update/:id", async (req, res) => {
  try {
    let { id } = req.params;    
    let updateData = req.body;
    let getnurseData = await nurseModel.findByIdAndUpdate(id, updateData);

    if (!getnurseData) {
      return res.status(404).json({ error: "Nurse Not found" });
    }
    res.status(200).json({ msg: "Nurse Updated Sucessfully" });
  } catch (error) {
    res.status(500).json({ msg: "Internel Server Error" });
  }
});

//Delete Nurse By ID
router.delete("/delete/:id", async (req, res) => {
  try {
    let { id } = req.params;
    let deletedadmin = await nurseModel.findByIdAndDelete(id);
    if (!deletedadmin) {
      return res.status(404).json({ error: "Nurse Not found" });
    }
    res.status(200).json({ msg: "Nurse Deleted Sucessfully" });
  } catch (error) {
    res.status(500).json({ msg: "Internel Server Error" });
  }
});

//Delete All Nurse
router.delete("/delete-all", async (req, res) => {
  try {
    await nurseModel.deleteMany({});
    res.status(200).json({ msg: "All Nurses Deleted Sucessfully" });
  } catch (error) {
    res.status(500).json({ msg: "Internel Server Error" });
  }
});

export default router;