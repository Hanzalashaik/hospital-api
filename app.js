import config from "config";
import express from "express";

import "./utils/dbConnnect.js";
import adminRouter from "./controllers/Admin/index.js";
import doctorRouter from "./controllers/Doctor/index.js";
import nurseRouter from "./Nurse/index.js";
import patientRouter from "./controllers/Patient/index.js";
// import authMiddleware from "./middleware/authMiddleware.js";

const PORT = config.get("PORT");
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send("Hello Server is Running 🚀");
});

// app.use(authMiddleware)

app.use("/admin", adminRouter);
app.use("/doctor", doctorRouter);
app.use("/nurse", nurseRouter);
app.use("/patient", patientRouter);

//error handler
app.use((req, res, next) => {
  res.status(404).send("Not Found -Invalid Route");
  next();
});

app.listen(PORT, (req, res) => {
  console.log(`Server is running at port ${PORT} 🚀`);
});
