import express from "express";
import adminModel from "../../models/admin/Admin.js";
// import randomId from "../../utils/randomId.js";
let router = express.Router();

//Register Admin
router.post("/register", async (req, res) => {
  try {
    let adminData = req.body;
    // let { email, password, mobile, fullName } = req.body;
    // let uId = randomId();
    // let adminData = { uId, email, password, mobile, fullName };
    await adminModel.create(adminData);
    res.status(200).json({ msg: "Admin Added Sucessfully" });
  } catch (error) {
    res.status(500).json({ msg: "Internel Server Error" });
  }
});

//Delete All Admins
router.delete("/delete-all", async (req, res) => {
  try {
    await adminModel.deleteMany({});
    res.status(200).json({ msg: "All Admins Deleted Sucessfully" });
  } catch (error) {
    res.status(500).json({ msg: "Internel Server Error" });
  }
});

//Delete Admin By ID
router.delete("/delete/:id", async (req, res) => {
  try {
    let { id } = req.params;
    let deletedadmin = await adminModel.findByIdAndDelete(id);
    if (!deletedadmin) {
      return res.status(404).json({ error: "Admin Not found" });
    }
    res.status(200).json({ msg: "Admin Deleted Sucessfully" });
  } catch (error) {
    res.status(500).json({ msg: "Internel Server Error" });
  }
});

//Update Admin by ID
router.put("/update/:id", async (req, res) => {
  try {
    let { id } = req.params;
    let updateData = req.body;
    // let getadminData = await adminModel.findOneAndUpdate(id,{$set:updateData},{new:true})
    let getadminData = await adminModel.findByIdAndUpdate(id, updateData);

    if (!getadminData) {
      return res.status(404).json({ error: "Admin Not found" });
    }
    res.status(200).json({ msg: "Admin Updated Sucessfully" });
  } catch (error) {
    res.status(500).json({ msg: "Internel Server Error" });
  }
});

//Get All Admin
router.get("/all", async (req, res) => {
  try {
    let adminData = await adminModel.find({});
    res.status(500).json(adminData);
  } catch (error) {
    res.status(500).json({ msg: "Internel Server Error" });
  }
});

//Get Admin By ID
router.get("/:id", async (req, res) => {
  try {
    let { id } = req.params;
    let getadminData = await adminModel.findById(id);
    if (!getadminData) {
      return res.status(404).json({ error: "Admin Not found" });
    }
    res.status(200).json(getadminData);
  } catch (error) {
    res.status(500).json({ msg: "Internel Server Error" });
  }
});

export default router;
